import {createQrCode,qrASCII,qrSVG,setQrASCII} from "./qrBuilder.js";

export var flag=true;

let qrView;

export const generateQR=(qrInput,pRef,bGen)=>{
    if(flag){
        console.log("generate")
        qrView = document.createElement('p');
        qrView.id="qr";

        let code = createQrCode(qrInput);
       
        const lines = code.match(/.{1,21}/g);
        lines.forEach((line) => {
            let lineArray = line.split("");
            lineArray.forEach((char)=>{
                
                let node = document.createElement("span");
                node.className="data-char";
                
                let charNode = document.createTextNode(char);

                node.appendChild(charNode);
                
                qrView.appendChild(node); 
            }); 
           
        });
        document.getElementById('qrDiv').appendChild(qrView);
        document.getElementById('result').style.visibility = 'visible';
        pRef.style.visibility = 'hidden';
        bGen.disabled=true;
        flag = false;
    }
}

export const copyTxt=()=>{
    let copyText = qrASCII;
    navigator.clipboard.writeText(copyText);
}

export const tryAgain=(pRef)=>{
    qrView.remove();
    flag = true;
    //qrASCII = setQrASCII("");
    document.getElementById('result').style.visibility = 'hidden';
    pRef.style.visibility  = 'hidden';
}   

export const downloadSVG=()=> {
    let fakeLink = document.createElement("a");

    fakeLink.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(qrSVG));
    let svgFilename = document.getElementById('input').value + '.svg';  
    fakeLink.setAttribute('download', svgFilename);
    document.getElementById('forSVG').appendChild(fakeLink);
    fakeLink.click();
  
  }
