.model small             
.stack 100h            

.data                   
array dw 16 dup(0)     

.code                 
main proc                
    mov word ptr[array], 0          ; Перше число Фібоначчі (0)
    mov word ptr[array + 2], 1      ; Друге число Фібоначчі (1)

    mov bx, 2                    
    mov ax, 1                      
    mov dx, 1                     

fibonachi:                       
    add ax, dx                    
    mov [array + bx+2], ax        
    mov dx, ax                     
    inc bx                        
    cmp bx, 16
    jl fibonachi

    mov ax, 4Ch                    
    int 21h                       

main endp                      
end main                       
