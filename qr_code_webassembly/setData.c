#include <stdlib.h>
#include <stdio.h>

//--------------
#define MAX_QR_BITS 128 
//----------------

char padding[]={'1','1','1','0','1','1','0','0','0','0','0','1','0','0','0','1'};


void setData(char* qr_code,const char* input,size_t n){
    char* data="0100";

    //-------------------
    size_t pos = 0;
     for (int i = 0; data[i] != '\0'; ++i) {
        if (pos >= MAX_QR_BITS - 1) return;
        qr_code[pos++] = data[i];
    }
    //--------------------

    //strcat(qr_code,data);
    size_t_to_bin(n,qr_code);

    for(size_t i=0; i<n;++i){
        char_to_bin(input[i], qr_code, &pos);
        //char_to_bin(input[i],qr_code);
    }
    #if 0
    //qr_code может быть переполнен, 
    // множественные strcat, не проверяя границы буфера.
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
    #endif 
    while (pos % 4 != 0 && pos < MAX_QR_BITS) {
        qr_code[pos++] = '0';
    }
    for(size_t i=0,sz=strlen(qr_code);sz<72;++i,++sz){
        strncat(qr_code,&padding[i % 16],1);
    }
}