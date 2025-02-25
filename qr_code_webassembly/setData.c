#include <stdlib.h>
#include <stdio.h>
char padding[]={'1','1','1','0','1','1','0','0','0','0','0','1','0','0','0','1'};


void setData(char* qr_code,const char* input,size_t n){
    char* data="0100";
    strcat(qr_code,data);
    size_t_to_bin(n,qr_code);
    for(size_t i=0; i<n;++i){
        char_to_bin(input[i],qr_code);
    }
    size_t sz=strlen(qr_code);
    if(sz<69){
        strcat(qr_code,"0000");
    }else if(sz<70){
        strcat(qr_code,"000");
    }else if(sz<71){
        strcat(qr_code,"00");
    }else if(sz<72){
        strcat(qr_code,"0");
    }
    for(size_t i=0,sz=strlen(qr_code);sz<72;++i,++sz){
        strncat(qr_code,&padding[i % 16],1);
    }
}