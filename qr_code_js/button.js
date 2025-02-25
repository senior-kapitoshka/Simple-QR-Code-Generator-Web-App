let inputRef = document.getElementById("input");
let pRef = document.getElementById("pBox");
let bGen = document.getElementById("buttonGen");
bGen.disabled=true;

inputRef.addEventListener("keyup",function(){
    let remLength = parseInt(inputRef.value.length);
    if(inputRef.value==="" || /^[A-Za-z0-9 \\!@#$%^&*\\?/".,`~\\{\\};:|=_\\)\\(><-\\+]+$/i.test(inputRef.value)){
        if(flag){
            if(remLength < 0) {
                inputRef.value = inputRef.value.substring(0, 7);
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
    
},true);