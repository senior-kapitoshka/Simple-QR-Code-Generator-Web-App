#if 0
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
#endif

#include <stdlib.h>
#include <stddef.h>

// 8-битный char в бинарный вид
void char_to_bin(char c, char* str, size_t* pos) {
    for (int i = 7; i >= 0; --i) {
        str[(*pos)++] = (c & (1 << i)) ? '1' : '0';
    }
}

// size_t (8 бит) в бинарный вид
void size_t_to_bin(size_t n, char* str, size_t* pos) {
    for (int i = 7; i >= 0; --i) {
        str[(*pos)++] = (n & (1 << i)) ? '1' : '0';
    }
}

// int (8 бит) в бинарный вид
void int_to_bin(int n, char* str, size_t* pos) {
    for (int i = 7; i >= 0; --i) {
        str[(*pos)++] = (n & (1 << i)) ? '1' : '0';
    }
}