var polynom=[0,43,139,206,78,43,239,123,206,214,147,24,99,150,39,243,163,136];
var alphaTable=[-1,0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,4,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,5,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,29,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,6,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,54,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,30,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,202,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,7,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,227,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,55,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,242,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,31,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,108,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,203,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,79,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175];

var qrASCII="";
var qrSVG="";

function setData(s,data){
  let padding="1110110000010001";
  data+=String((s.length >>> 0).toString(2)).padStart(8,'0');
  data+=s.split('').map(c=>String(c.charCodeAt(0).toString(2)).padStart(8,'0')).join('');
 if(data.length<69){
    data+="0000";
  }else if(data.length<70){
    data+="000";
  }else if(data.length<71){
    data+="00";
  }else if(data.length<72){
    data+="0";
  }
  for(let i=0;data.length<72;++i){
    data+=padding.charAt(i%padding.length);
  }
  return data;
}

function errorCorrection(data){
  let n=data.length;
  let corrNums=[];
  let newList=[];
  let newList2=[];
  for(let i=0;i<n;i+=8){
    corrNums.push(parseInt(data.substring(i,i+8),2));
  }
  for(let i=0;i<9;++i){
      let alphaExponent = alphaTable[corrNums[0]];
      newList = polynom.map(j=>{ let temp= j+alphaExponent;
                                     j = temp>255? temp%255: temp;
                                     return j;
                                    })
                        .map(j=> Math.abs(alphaTable.findIndex(x=>x===j)))
      var z=0;
      corrNums = corrNums.map(j=>Math.abs(j ^ newList[z++]));
      corrNums.shift();
      if(corrNums.length<17){
          let x=corrNums.length+1;
          corrNums=corrNums.concat(newList.slice(x,newList.length));
      }
      if(i!=8){
          while(corrNums[0]===0){

              corrNums.shift();
              ++i;
          }
      }
    newList2=newList;
    }
  if(corrNums.length<17){
      let x=corrNums.length+1;
      corrNums=corrNums.concat(newList2.slice(x,newList2.length));
  }
  data+=corrNums.map(i=>String((i).toString(2)).padStart(8,'0')).join('');
  return data;
}
function fillMx(mxTemplate,data){
  let x=20;
  let y=20;
  let flag=1;
  let flag2=2;
  let flag3=0;
  for(let i=0,n=data.length;i<n;){
    if(mxTemplate[x][y]===2){
      if((x+y)%2==0){
        mxTemplate[x][y]=data.charAt(i)==='0'?1:0;
      }else{
        mxTemplate[x][y]=data.charAt(i)==='0'?0:1;
      }
      ++i;
    }
    if(x===0 || x === mxTemplate.length-1){
      if(flag2<3){
        if(y!==7){
          --y;
          ++flag2;
        }else{
          y-=2;
          ++flag2;
          flag3=1;
        }
      }else{
        flag=flag===1?0:1;
        if(flag===1){
            ++y;
            ++x;
        }else if(flag===0){
            ++y;
            --x;
        }
        flag2=0;
      }
    }else{
      if(flag===0){
        if(flag3===0){
          if(y%2==0){
            --y;
          }else{
            ++y;
            --x;
          }
        }else{
           if(y%2!==0){
            --y;
          }else{
            ++y;
            --x;
          }
        }
      }else if(flag===1){

        if(flag3===0){
          if(y%2===0){
            --y;
          }else{
            ++x;
            ++y;
          }
        }else{
          if(y%2!==0){
            --y;
          }else{
            ++x;
            ++y;
          }
        }
      }
    }
  }
  for(let x=0;x<21;++x){
    for(let y=0;y<21;++y){
      if(mxTemplate[x][y]===2){
        mxTemplate[x][y]=0;
      }
    }
  }
  return mxTemplate;
}
function getQRCode(mxTemplate){
    let x=0;
    let y=0;
    var qrFront="";
    var qrASCII="";
    var qrSVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210"
              xmlns:xlink="http://www.w3.org/1999/xlink">`;
     for(let i=0;i<21;++i){
         for(let j=0;j<21;++j){
          x = i * 10;
          y = j * 10;
          var D=i+j-21;
          var z = D>0?-21:-21;
          var s = Math.floor((42 + D + z)/3); 
            if( mxTemplate[i][j]===1){
              qrFront+= "⬛";
              qrASCII+= "█";
              qrSVG+=`<rect fill="black"  width="10" height="10" rx="3" 
                                            x="${y}" y="${x}" />`;
            }else{
              qrFront+= "⬜";
              qrASCII+= "░";
              qrSVG+=`<rect fill="white" stroke="black"
                                          width="10" height="10" rx="3"
                                            x="${y}" y="${x}" />`;
            }
         }
         qrFront+="\n";
         qrASCII+= "\n";
     }
     qrSVG+=`</svg>`;
 return [qrFront,qrASCII,qrSVG];
}



function createQrCode(s){
  let mxTemplate=[[1,1,1,1,1,1,1,0,1,2,2,2,2,0,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,1,0,0,2,2,2,2,0,1,0,0,0,0,0,1],
                [1,0,1,1,1,0,1,0,0,2,2,2,2,0,1,0,1,1,1,0,1],
                [1,0,1,1,1,0,1,0,1,2,2,2,2,0,1,0,1,1,1,0,1],
                [1,0,1,1,1,0,1,0,0,2,2,2,2,0,1,0,1,1,1,0,1],
                [1,0,0,0,0,0,1,0,0,2,2,2,2,0,1,0,0,0,0,0,1],
                [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
                [0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
                [0,0,1,0,1,1,1,0,1,2,2,2,2,1,0,0,0,1,0,0,1],
                [2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2],
                [1,1,1,1,1,1,1,0,0,2,2,2,2,2,2,2,2,2,2,2,2],
                [1,0,0,0,0,0,1,0,1,2,2,2,2,2,2,2,2,2,2,2,2],
                [1,0,1,1,1,0,1,0,1,2,2,2,2,2,2,2,2,2,2,2,2],
                [1,0,1,1,1,0,1,0,0,2,2,2,2,2,2,2,2,2,2,2,2],
                [1,0,1,1,1,0,1,0,1,2,2,2,2,2,2,2,2,2,2,2,2],
                [1,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,2,2],
                [1,1,1,1,1,1,1,0,0,2,2,2,2,2,2,2,2,2,2,2,2]];
  let data = "0100";
  data = setData(s,data);
  data = errorCorrection(data);
  mxTemplate = fillMx(mxTemplate,data);
  let qrArray = getQRCode(mxTemplate);
  qrASCII = qrArray[1];
  qrSVG = qrArray[2];
  return qrArray[0];
}

/*
<filter id="blurMe1">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.1" />
              </filter>
              <filter id="blurMe2">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.2" />
              </filter>
              <filter id="blurMe3">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
              </filter>
              <filter id="blurMe4">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
              </filter>
              <filter id="blurMe5">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
              </filter>
              <filter id="blurMe6">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
              </filter>
              <filter id="blurMe7">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" />
              </filter>
              <filter id="blurMe8">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
              </filter>
              <filter id="blurMe9">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" />
              </filter>
              <filter id="blurMe10">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>
              <filter id="blurMe11">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.1" />
              </filter>
              <filter id="blurMe12">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
              </filter>
              <filter id="blurMe13">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.7" />
              </filter>

              <filter id="displacementFilter1">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.1"
                numOctaves="10"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="3"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>

              <filter id="displacementFilter2">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.2"
                numOctaves="10"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="4"
                xChannelSelector="R"
                yChannelSelector="G" />
                 <feGaussianBlur in="SourceGraphic" stdDeviation="0.2" />
              </filter>

              <filter id="displacementFilter3">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.3"
                numOctaves="10"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="5"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>

              <filter id="displacementFilter4">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.4"
                numOctaves="10"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="5"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>

              <filter id="displacementFilter5">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.5"
                numOctaves="10"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="6"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>

              <filter id="displacementFilter6">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.6"
                numOctaves="10"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="7"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>

              <filter id="displacementFilter7">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.7"
                numOctaves="10"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="8"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>

               <filter id="displacementFilter8">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.8"
                numOctaves="10"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="9"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>

              <filter id="displacementFilter9">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.9"
                numOctaves="10"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="10"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>

              <filter id="displacementFilter10">
              <feTurbulence
                type="turbulence"
                baseFrequency="1.5"
                numOctaves="100"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="19"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>

              <filter id="displacementFilter11">
              <feTurbulence
                type="turbulence"
                baseFrequency="1.8"
                numOctaves="100"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="23"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>

              <filter id="displacementFilter12">
              <feTurbulence
                type="turbulence"
                baseFrequency="1.9"
                numOctaves="100"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="25"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>

              <filter id="displacementFilter13">
              <feTurbulence
                type="turbulence"
                baseFrequency="2"
                numOctaves="100"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="30"
                xChannelSelector="R"
                yChannelSelector="G" />
              </filter>



       style="filter:url(#displacementFilter${s})"       
*/