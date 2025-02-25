

function QrCodeCtrl($scope){
    let length=7;
    
    $scope.getRemaining= function(){
        let remaining = length - $scope.inputString.length;
        return remaining==7?["",remaining]:
                remaining>=0?
                [("remaining: " + remaining),remaining]:
                ["input exceeds allowed size",-1];
    }
    $scope.warn= function(){
        return $scope.getRemaining()[1]<2;
    }
    $scope.hasValidLength = function(){
        return $scope.getRemaining()[1]>=0;
    }
    $scope.generateQR = function(){
        document.getElementById('result').style.visibility = 'visible';
    }
    $scope.input = function(){
        $scope.QRCode=createQrCode($scope.inputString);
    }

    $scope.tryAgain = function(){
        $scope.QRCode="";
        $scope.inputString="";
        qrASCII = "";
        document.getElementById('result').style.visibility = 'hidden';
    }

}

function copyTxt() {
    var copyText = qrASCII;
    navigator.clipboard.writeText(copyText);
  }

