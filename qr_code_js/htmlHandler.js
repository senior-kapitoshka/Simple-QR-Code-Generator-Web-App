
var flag=true;

let qrView;

function generateQR(){
    if(flag){
        qrView = document.createElement('p');
        qrView.id="qr";

        let qrInput = inputRef.value;
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

function copyTxt() {
    let copyText = qrASCII;
    navigator.clipboard.writeText(copyText);
}

function tryAgain(){
    qrView.remove();
    flag = true;
    qrASCII = "";
    inputRef.value="";
    document.getElementById('result').style.visibility = 'hidden';
    pRef.style.visibility  = 'hidden';
}   

function downloadSVG() {
    let fakeLink = document.createElement("a");

    fakeLink.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(qrSVG));
    let svgFilename = document.getElementById('input').value + '.svg';  
    fakeLink.setAttribute('download', svgFilename);
    document.getElementById('forSVG').appendChild(fakeLink);
    fakeLink.click();
  
  }
