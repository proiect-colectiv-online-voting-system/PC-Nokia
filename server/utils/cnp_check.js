// TODO: implement additional features for checking CNP
var isCNPvalid = function(CNP){
    CNP_mask = "279146358279";
    if(CNP.length != 13){        
        return false;
    }
    else{
        var sum = 0;
        for(var i = 0; i < CNP.length - 1; i++){
            sum += (parseInt(CNP.charAt(i)) * parseInt(CNP_mask.charAt(i)));
        }
        var control_digit = sum%11 != 0 ? sum%11 : 1;
        if(control_digit != CNP.charAt(12))
            return false;
    }
    return true; 
}

exports.isCNPvalid = isCNPvalid;