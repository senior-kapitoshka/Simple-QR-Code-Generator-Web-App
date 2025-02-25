#include <stdlib.h>
#include "list.c"
#include <stdio.h>
#include "utils.c"
#define SEVENTEEN 17
#define TWO_FIVE_FIVE 255

int alphaTable[]={-1,0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,4,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,5,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,29,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,6,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,54,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,30,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,202,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,7,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,227,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,55,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,242,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,31,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,108,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,203,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,79,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175,};


void setErrorCorrection(char* qr_code, size_t n){
    int polynom[]={0,43,139,206,78,43,239,123,206,214,147,24,99,150,39,243,163,136}; 

    struct Node* corrNums=NULL;
    int temp [SEVENTEEN], temp2[SEVENTEEN];
    for(size_t i=0,j=0;i<n;i+=8,++j){
        int correct=0;
        for(size_t k=i,z=7;k<i+8;++k,--z){
            correct+=(qr_code[k]-'0')*pow(2,z);
        }
        add(&corrNums,correct);
    }
    for(size_t i = 0; i<n/8; ++i){
        int alphaExponent = alphaTable[corrNums->val];
        for(size_t j=0;j<18;++j){
            int z = polynom[j] + alphaExponent;
            int y = z <TWO_FIVE_FIVE ? z : z%TWO_FIVE_FIVE;
            int id=1;
            for(int l=0;l<sizeof(alphaTable)/sizeof(alphaTable[0]);++l){
                if(alphaTable[l]==y){
                    id=l;
                    break;
                }
            }
            temp[j]=id;
        }
        
        size_t j=0;
        for(struct Node* curr=corrNums;curr;curr=curr->next,++j){
            curr->val^=temp[j];
        }
        
        shift(&corrNums);
        
        if(size(corrNums)<SEVENTEEN){
            size_t n=size(corrNums)+1;
            for(size_t j=n;j<sizeof(temp)/sizeof(temp[0])+1;++j){
                add(&corrNums,temp[j]);
            }
        }
         if(i!=8){
            while(corrNums->val==0){
                shift(&corrNums);
                ++i;
            }
         }
         for(size_t j=0;j<SEVENTEEN;++j){
            temp2[j]=temp[j];
         }
    }
    if(size(corrNums)<SEVENTEEN){
        size_t n=size(corrNums)+1;
        for(size_t j=n;j<sizeof(temp2)/sizeof(temp2[0])+1;++j){
            add(&corrNums,temp[j]);
        }
    }
    
    for(struct Node* curr=corrNums;curr;curr=curr->next){
        int_to_bin(curr->val,qr_code);
    }
    
}   