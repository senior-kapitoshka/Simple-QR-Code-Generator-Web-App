#include <stdlib.h>

void char_to_bin(char c, char* str){
    char buff[8];
    for (int i = 7,j=0; i >= 0; --i,++j){
        buff[j]= (c & (1 << i)) ? '1' : '0' ;
    }
    strcat(str,buff);
}
void size_t_to_bin(size_t n, char* str){
    char buff[8];
    for (int i = 7,j=0; i >= 0; --i,++j){
        buff[j]= (n & (1 << i)) ? '1' : '0' ;
    }
    strcat(str,buff);
}

void int_to_bin(int n, char* str){
    char buff[8];
    for (int i = 7,j=0; i >= 0; --i,++j){
        buff[j]= (n & (1 << i)) ? '1' : '0' ;
    }
    strcat(str,buff);
}