var outputSVG;
var outputASCII;
var outputToPrint;

var flag=true;

let qrView;

function generateQR(){
    if(flag){
        qrView = document.createElement('p');
        qrView.id="qr";

        let qrInput = inputRef.value;

        var asciiPtr=exportz.wasmAlloc(1345);
        var printPtr=exportz.wasmAlloc(1345);
        var svgPtr=exportz.wasmAlloc(36000);
        
        var encodedString = new TextEncoder().encode(qrInput);

        var i8 = new Uint8Array(memory.buffer)

        // Copy the UTF-8 encoded string into the WASM memory.
        i8.set(encodedString);    
        
        exportz.qrBuilder(i8,qrInput.length,asciiPtr,printPtr,svgPtr);

        var ascii= new Uint8Array(memory.buffer, asciiPtr);
        var print= new Uint8Array(memory.buffer, printPtr);
        var svg=new Uint8Array(memory.buffer,svgPtr);

        //exportz.wasmFree(asciiPtr);
        //exportz.wasmFree(printPtr);
        //exportz.wasmFree(svgPtr);

        outputSVG=new TextDecoder("utf8").decode(svg.slice(0,36000));
        outputASCII=new TextDecoder("utf8").decode(ascii.slice(0,1344));
        outputToPrint=new TextDecoder("utf8").decode(print.slice(0,1344));
        console.log(outputToPrint)
        let code=outputToPrint;
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
    let copyText = outputASCII;
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

    fakeLink.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(outputSVG.substring(0,outputSVG.lastIndexOf('>')+1)));
    let svgFilename = document.getElementById('input').value + '.svg';  
    fakeLink.setAttribute('download', svgFilename);
    document.getElementById('forSVG').appendChild(fakeLink);
    fakeLink.click();
  
  }
