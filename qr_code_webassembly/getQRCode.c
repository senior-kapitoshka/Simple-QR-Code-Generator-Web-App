#include <stdlib.h>
#include <stdio.h>

#define QRCODE_SIZE 1345
#define SVG_BEGIN 107
#define SVG_END 8
#define SVG_WHITE 82
#define SVG_BLACK 67
#define SEVENTEEN 17
#define TWENTY_ONE 21



void getQRCode(int mxTemplate[TWENTY_ONE][TWENTY_ONE],char* ascii, char* print,char* svg){
     char* plateBlackASCII="█";
     char* plateWhiteASCII="░";
    char* plateBlackToPrint="⬛";
    char* plateWhiteToPrint="⬜";
    char* svgBlack = " <rect fill=\"black\"  width=\"10\" height=\"10\" rx=\"3\"  x=\"X\" y=\"Y\" /> ";
    char* svgWhite =" <rect fill=\"white\" stroke=\"black\"  width=\"10\" height=\"10\" rx=\"3\"  x=\"X\" y=\"Y\" /> ";
    char* svgBegin=" <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 210 210\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"> ";
    char* svgEnd=" </svg> ";

    size_t z=0;
    for(int i=0;i<SVG_BEGIN;++i,++z){
        svg[z]=svgBegin[i];
    }

    char* toPrint=malloc(QRCODE_SIZE);
    char* ASCII=malloc(QRCODE_SIZE);
    ASCII[0] = '\0';
    toPrint[0] = '\0';


    for(int i=0;i<TWENTY_ONE;++i){
        for(int j=0;j<TWENTY_ONE;++j){
            if(mxTemplate[i][j]==1){
                strcat(ASCII,plateBlackASCII);
                strcat(toPrint,plateBlackToPrint);
                for(size_t x=0;x<SVG_BLACK;++x,++z){
                    if(svgBlack[x]=='X'){
                        if(j<10)svg[z++]=j+'0';
                        else{
                            svg[z++]=j/10+'0';
                            svg[z++]=j%10+'0';
                        }
                        svg[z]='0';
                    }else if(svgBlack[x]=='Y'){
                        if(i<10)svg[z++]=i+'0';
                        else{
                            svg[z++]=i/10+'0';
                            svg[z++]=i%10+'0';
                        }
                        svg[z]='0';
                    }else{
                        svg[z]=svgBlack[x];
                    }
                }
            }else{
                strcat(ASCII,plateWhiteASCII);
                strcat(toPrint,plateWhiteToPrint);
                for(size_t x=0;x<SVG_WHITE;++x,++z){
                    if(svgWhite[x]=='X'){
                        if(j<10)svg[z++]=j+'0';
                        else{
                            svg[z++]=j/10+'0';
                            svg[z++]=j%10+'0';
                        }
                        svg[z]='0';
                    }else if(svgWhite[x]=='Y'){
                        if(i<10)svg[z++]=i+'0';
                        else{
                            svg[z++]=i/10+'0';
                            svg[z++]=i%10+'0';
                        }
                        svg[z]='0';
                    }else{
                        svg[z]=svgWhite[x];
                    }
                }
            }
        }
        strcat(ASCII,"\n");
        strcat(toPrint,"\n");
    }

    for(int i=0;i<SVG_END;++i,++z){
        svg[z]=svgEnd[i];
    }
    #if 0 
    strcat(ascii,ASCII);
    strcat(print,toPrint);
    #endif 

    *ascii = strdup(ASCII);   // копируем в выходной буфер
    *print = strdup(toPrint);

    free(ASCII);   // освобождаем временные
    free(toPrint);
}

