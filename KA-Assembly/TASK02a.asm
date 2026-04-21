.model small
.stack 100h
.data 


.code

multiply proc 
mul bx
ret
jmp done
multiply endp


main proc 
mov ax, 30
mov bx, 20
call multiply

done:
mov ax, 4Ch
int 21h

main endp 
end main