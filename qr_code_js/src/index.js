import "./style.css"
import {button} from "./button.js"

import {tryAgain,generateQR,downloadSVG,copyTxt} from "./htmlHandler.js"


window.addEventListener('DOMContentLoaded', () => {

let inRef=document.getElementById("input");

let pRef = document.getElementById("pBox");
let bGen = document.getElementById("buttonGen");
bGen.disabled=true;

document.getElementById('buttonGen').addEventListener('click', ()=>generateQR(inRef.value,pRef,bGen));

document.getElementById('tryAgain').addEventListener('click',()=>{inRef.value=""; tryAgain(pRef)});



document.getElementById('downloadSvg').addEventListener('click', (e) => {
    e.preventDefault(); 
    downloadSVG();
  });

  document.getElementById('copyASCII').addEventListener('click', (e) => {
    e.preventDefault(); 
    copyTxt();
  });  


inRef.addEventListener("keyup",()=>button(inRef.value.length,inRef.value,pRef,bGen),true);

})