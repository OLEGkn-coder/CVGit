.model small
.stack 100h

.data
buf db 255 dup(0)
arr dw 10000 dup(?)
cnt dw 0
avg dw 0
med dw 0
str db 16 dup(0)
fname db 'output.txt', 0
fh dw ?

.code
_start:
    mov ax, @data
    mov ds, ax

; Створити файл output.txt
    mov ah, 3Ch
    mov cx, 0
    lea dx, fname
    int 21h
    mov fh, ax

; Зчитати stdin блоками
_readinput:
    mov ah, 3Fh
    mov bx, 0
    lea dx, buf
    mov cx, 255
    int 21h
    cmp ax, 0
    je _parsedone
    mov cl, al
    lea si, buf
    call _parsebuf
    jmp _readinput

_parsedone:
    cmp cnt, 0
    je _closef

    call _sort
    call _median
    call _average

    mov ax, med
    call _writenum
    mov ax, avg
    call _writenum

_closef:
    mov ah, 3Eh
    mov bx, fh
    int 21h

    mov ah, 4Ch
    int 21h

; ======= Парсинг буфера
_parsebuf proc
    mov ax, cnt
    shl ax, 1
    add ax, offset arr
    mov di, ax

_pnext:
    cmp cl, 0
    je _pexit
    mov al, [si]
    cmp al, ' '
    je _pskip
    cmp al, 0Dh
    je _pskip
    cmp al, 0Ah
    je _pskip
    jmp _pstart

_pskip:
    inc si
    dec cl
    jmp _pnext

_pstart:
    mov word ptr str, 1
    mov al, [si]
    cmp al, '-'
    jne _pdigit
    mov word ptr str, -1
    inc si
    dec cl

_pdigit:
    xor ax, ax
    xor dx, dx

_ploop:
    cmp cl, 0
    je _pstore
    mov al, [si]
    cmp al, '0'
    jb _pstore
    cmp al, '9'
    ja _pstore
    sub al, '0'
    mov ah, 0
    mov bx, 10
    mul bx
    cmp dx, 0
    jne _pover
    mov bl, [si]
    sub bl, '0'
    mov bh, 0
    add ax, bx
    inc si
    dec cl
    jmp _ploop

_pover:
    cmp str, 1
    je _pmaxp
    mov ax, 32768
    jmp _pstore
_pmaxp:
    mov ax, 32767

_pstore:
    cmp str, 1
    je _psave
    neg ax
_psave:
    mov [di], ax
    add di, 2
    inc cnt
    jmp _pnext

_pexit:
    ret
_parsebuf endp

; ======= Сортування
_sort proc
    mov cx, cnt
    dec cx
_sort_outer:
    mov si, 0
    mov bx, cx
_sort_inner:
    mov ax, arr[si]
    cmp ax, arr[si+2]
    jle _sort_noswap
    xchg ax, arr[si+2]
    mov arr[si], ax
_sort_noswap:
    add si, 2
    dec bx
    jnz _sort_inner
    dec cx
    jnz _sort_outer
    ret
_sort endp

; ======= Медіана
_median proc
    mov ax, cnt
    cmp ax, 0
    je _m0
    mov bx, ax
    test ax, 1
    jz _meven
    dec ax
    shr ax, 1
    shl ax, 1
    mov bx, ax
    mov ax, arr[bx]
    mov med, ax
    ret
_meven:
    dec bx
    shr bx, 1
    shl bx, 1
    mov ax, arr[bx]
    add ax, arr[bx+2]
    shr ax, 1
    mov med, ax
    ret
_m0:
    mov med, 0
    ret
_median endp

; ======= Середнє
_average proc
    lea si, arr
    xor ax, ax
    xor dx, dx
    mov cx, cnt
    cmp cx, 0
    je _adone
_asum:
    mov bx, [si]
    add ax, bx
    adc dx, 0
    add si, 2
    loop _asum
    mov cx, cnt
    div cx
    mov avg, ax
_adone:
    ret
_average endp

; ======= Запис числа AX у файл
_writenum proc
    push ax bx cx dx si
    mov bx, 10
    lea si, str + 15
    mov byte ptr [si], 10
    dec si
    mov byte ptr [si], 13
    dec si
    mov cx, 2
    cmp ax, 0
    jge _wcon
    neg ax
    mov byte ptr [si], '-'
    dec si
    inc cx
_wcon:
    xor dx, dx
_wloop:
    div bx
    add dl, '0'
    mov [si], dl
    dec si
    inc cx
    cmp ax, 0
    jne _wloop
    inc si
    mov dx, si
    call _wout
    pop si dx cx bx ax
    ret
_writenum endp

; ======= Запис DX[CX] у файл
_wout proc
    mov ah, 40h
    mov bx, fh
    int 21h
    ret
_wout endp

end _start
