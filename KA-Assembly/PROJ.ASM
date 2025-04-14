.model small 
.stack 100h
.data
number dw 0

buffer db 255, 0, 255 DUP(0) ; 255 - максимальна кількість символів, '0' кількість символів, 255 DUP(0) - ініціалізуємо все нулями
   

array dw 10000 DUP(?) ; Масив чисел
countNumber dw 0      ; Змінна для кількості зчитаних чисел

average dw 0
median dw 0


numSt db 12 DUP('$')
newline db 0Dh, 0Ah, '$'
numChar dw ?

.code
main proc 

mov ax, @data
mov ds, ax 

read: ;Цикл зчитування 
mov byte ptr [buffer + 1], 0
lea dx, buffer
mov ah, 0Ah
int 21h
mov cl, [buffer + 1] ;Кількість зчитаних чисел
cmp cl, 0
je finishRead
lea si, buffer + 2 ;Адреса куди ми будемо записувати наші числа
call pars
jmp read

finishRead: 
cmp countNumber, 0
je exit

call bubbleSort
call AverageFind
call MedianFind



mov ax, median
call printNum
lea dx, newline
mov ah, 09h
int 21h

mov ax, average
call printNum
lea dx, newline
mov ah, 09h
int 21h

exit: 
mov ah, 4Ch 
int 21h
main endp 







pars proc ;Підпрограма для виведення рядків
mov ax, countNumber
shl ax, 1
add ax, offset array
mov di, ax

CheckLoop:
cmp cl, 0
je doneParse
mov al, [si]
cmp al, ' '
je next
cmp al, 0Dh
je next
cmp al, 0Ah
je next
jmp start 

next: 
inc si
dec cl  
jmp CheckLoop

start:
mov word ptr numChar, 1
mov al, [si]
cmp al, '-'
jne conv
mov word ptr numChar, -1
inc si
dec cl


conv: ;Початок циклу накопичення цифр
xor ax, ax

Parse: 
cmp cl, 0
je storeNum
mov al, [si]
cmp al, '0'
jb storeNum
cmp al, '9'
ja storeNum
mov bl, al  ;
sub bl, '0' ;
mov bh, 0   ; Ці рядки коду відповідають за накопичення чисел. Якщо в AX вже є 7 і ще треба добавити 8, то записуємо
mov cx, 10  ; в bl 8, множимо ax на 10, і в результаті в нас вийде накопичене число 78
mul cx      ;
cmp dx, 0   ; Перевіряємо верхні 16 біт DX:AX. Якщо число менше 65536 значить його можна помістити тільки у нижні AX 16 біт, і DX буде рівни1 0 
jne overflow; Якщо DX не рівний 0, значить в нас переповнення 
add ax, bx

cmp numChar, 1;
je positive   ; Перевіряємо нашу межу, чи число знаходться в допустимому діапазоні. Якщо число дадатнє встановлюємо максимально можливе додатнє значення,
cmp ax, 32768 ; якщо від'ємне максимальне від'ємне. Це у випадку виходу числа за межі
ja overflow   ;
jmp value     ; Якщо все добре і число не перевищує межі, переходимо далі

positive:
cmp ax, 32767
ja overflow

value:
inc si
dec cl
jmp Parse

doneParse:
jmp parseEnd

overflow:
cmp numChar, 1
je setPositave
mov ax, 32768
jmp storeNum

setPositave:
mov ax, 32767
jmp storeNum

storeNum:
cmp numChar, 1
je store 
neg ax

store: 
mov [di], ax
add di, 2
mov ax, countNumber
inc ax
mov countNumber, ax
jmp CheckLoop

parseEnd:
ret
pars endp

bubbleSort proc
mov ax, countNumber
cmp ax, 1
jbe done
mov cx, ax

loop1: 
lea si, array
mov dx, cx
dec dx
loop2:
mov ax, [si]     ;Завантажуємо перший елемент
mov bx, [si + 2] ;Завантажуємо наступний елемент
cmp ax, bx 
jle noSwap
mov [si], bx     ;Виконуємо перестановку 
mov [si + 2], ax

noSwap:
add si, 2
dec dx
jnz loop2
dec cx 
jnz loop1
done:
ret
bubbleSort endp


MedianFind proc
mov ax, countNumber
cmp ax, 0
je doneMedian
dec ax
mov cx, 2
xor dx, dx
div cx
mov bx, ax
shl bx, 1
mov ax, [array + bx]
mov median, ax

doneMedian: 
ret
MedianFind endp 

AverageFind proc
lea si, array 
xor ax, ax
xor dx, dx
mov cx, countNumber
cmp cx, 0
je doneAverage
avgloop:
add ax, [si]
adc dx, 0
add si, 2
loop avgloop
mov bx, countNumber
div bx
mov average, ax

doneAverage: 
ret
AverageFind endp 

printNum proc
push ax
push bx
push cx
push dx
mov bx, 10
lea si, numSt + 11
mov byte ptr [si], '$'
dec si



cmp ax, 0
jge convloop
neg ax
mov byte ptr [si], '-'
dec si

convloop: 
xor cx, cx

mainloop: 
xor dx, dx
div bx
add dl, '0'
mov [si], dl
dec si
cmp ax, 0
jne mainloop


doneloop:
inc si
mov dx, si
mov ah, 09h
int 21h
pop dx
pop cx
pop bx
pop ax
ret

printNum endp
end main
