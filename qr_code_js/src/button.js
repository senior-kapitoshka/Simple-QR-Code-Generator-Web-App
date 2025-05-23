import {flag} from "./htmlHandler"



export const button=(length,value,pRef,bGen)=>{
    let remLength = parseInt(length);
    if(value==="" || /^[A-Za-z0-9 \\!@#$%^&*\\?/".,`~\\{\\};:|=_\\)\\(><-\\+]+$/i.test(value)){
        if(flag){
            if(remLength < 0) {
                value = value.substring(0, 7);
                return false;
            }else if(remLength == 0){
                pRef.style.visibility = 'hidden';
                
            }else if(remLength > 0 && remLength < 6){
                pRef.style.color = "black";
                pRef.style.visibility = 'visible';
                pRef.textContent = "Characters remaining: " + remLength + "/7";
                bGen.disabled=false;
            }else if(remLength === 6 || remLength === 7) {
                pRef.style.color = "red";
                pRef.style.visibility = 'visible';
                pRef.textContent = "Characters remaining: " + remLength + "/7";
                bGen.disabled=false;
            }else if(remLength > 7){
                pRef.style.color = "red";
                pRef.style.visibility = 'visible';
                pRef.textContent ="An "+ remLength + " characters word is too long for our QR generator";
                bGen.disabled=true;
            }
        }else{
            pRef.textContent='Click Try Again to re-generate the QR Code';
            pRef.style.color = "red";
            pRef.style.visibility = 'visible';
            return false;
        }
    }else{
        pRef.style.color = "red";
        pRef.style.visibility = 'visible';
        pRef.textContent ="Error input";
        bGen.disabled=true;
    }
    
};