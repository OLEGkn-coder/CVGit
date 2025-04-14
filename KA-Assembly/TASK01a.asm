.model small
.stack 100h
.data 
arrays dw 20 dup(0) 

.code
main proc 
 mov ax, @data
 mov ds, ax

 mov bx, 0
 mov cx, 20
 mov ax, 20

 array_loop:
 mov [arrays + bx], ax
 add bx, 2
 dec cx
 dec ax
 cmp cx, 0
 jne array_loop

 mov ax, 4Ch
 int 21h

main endp 
end main
