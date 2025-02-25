#include <stdlib.h>

struct Node{
    int val;
    struct Node* next;
};

size_t size(struct  Node* head){
    if(!head) return 0;
    size_t res=0;
    for(struct Node* curr=head;curr;curr=curr->next,++res) ;

    return res;
}

void add(struct Node** head, int v){
    struct Node* new=(struct Node*)malloc(sizeof(struct Node));
    new->val=v;
    new->next=NULL;
   
    if(!(*head)){
        *head=new;
    }else{
        struct Node* curr= *head;
        for(;curr->next;curr=curr->next) ;
        curr->next=new;
    }
}

void shift(struct Node** head){
    if(!(*head)) return;
    struct Node* del=*head;
    *head=(*head)->next;
    free(del);
}