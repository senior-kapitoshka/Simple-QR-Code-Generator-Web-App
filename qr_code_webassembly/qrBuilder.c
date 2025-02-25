#include <emscripten.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>

#include "setErrorCorrection.c"
#include "fillMX.c"
#include "getQRCode.c"
#include "setData.c"

#define BYTE_CODE_SIZE 208


EMSCRIPTEN_KEEPALIVE
void* wasmAlloc(size_t n){
    return malloc(n);
}

EMSCRIPTEN_KEEPALIVE
void wasmFree(void *ptr){
    free(ptr);
}

EMSCRIPTEN_KEEPALIVE
void qrBuilder(const char* input,size_t n,char* ascii, char* print,char* svg){
    
    char* qr_code=malloc(BYTE_CODE_SIZE);

    setData(qr_code,input,n);
    setErrorCorrection(qr_code,strlen(qr_code));
    int** mx= fillMx(qr_code,strlen(qr_code),);

    //free(qr_code);
    
    getQRCode(mx,ascii,print,svg);
}
