.model small
.stack 100h
.data
    array dw 10*20 DUP(0) ;Створюємо масив з 0 елементами 

.code
main PROC
    mov ax, @data ;Ініціалізуємо дата сегмент
    mov ds, ax

    mov ch, 0; встановлюємо лічильник для рядків x 
    mov cl, 0; встановлюємо лічильник для стовпців y

myloop:
    xor ah, ah
    mov al, cl  ; y
    add al, 10  ; ax = y + 10
    mov bl, ch ; bl = x
    add bl, 5; bl = x + 5
    xor bh, bh  ;видалямо сміття з регістру 
    mul bx; ax = ax*bx
    mov bx, ax  ; bx = ax
 
    mov ax, 20
    mul ch
    mov dl, cl
    xor dh, dh
    add ax, dx
    
    ;переміщуємося в масиві
    shl ax, 1
    ;змінюємо значення AX і BX так, щоб BX містив адресу елементу, а AX містив значення
    xchg ax, bx

    ;зберігаємо результат bx в масив 
    mov [array + bx], ax
    inc cl
    cmp cl, 20
    jne myloop
    mov cl, 0
    inc ch
    cmp ch, 10
    jne myloop
    

    mov ax, 4C00h       ;закінчуємо програму
    int 21h
main ENDP
END main
