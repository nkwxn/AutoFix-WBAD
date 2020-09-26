let errText = "", 
    opac = "",
    bColor = "";
var userHCData = [
    ['nkwxn05', 'Ch0n3un-$4rangh43yo'],
    ['johnd03', 'password123'],
    ['yacm4haptr', 'Tuh4nmahab#sar'],
    ['stefani_gabriel4', 'Ch1ngu_y4']
];
var signInData = {
    userName: document.getElementById('usrUserName').value,
    password: document.getElementById('usrPwd').value
};
function alertHCData() {
    let listHCData = "";
    for (let i = 0; i < userHCData.length; i++) {
        const userNameHC = userHCData[i][0];
        const pwdHC = userHCData[i][1];
        listHCData += ("\nUser " + (i+1) + ":\nUsername: " + userNameHC + "\nPassword: " + pwdHC + "\n");
    }
    let alertText = `This is a hard-coded login page. The User ID and Password you can use are:\n` + listHCData;
    alert(alertText);
}
function validateLogIn() {
    getData();
    console.log(signInData);
    var valUserName = validateFilled(signInData.userName, 'errUserName', 'usrUserName');
    var valPwd = validateFilled(signInData.password, 'errPwd', 'usrPwd');
    if (valUserName) {
        valUserName = validateUserName();
    }
    if (valPwd) {
        valPwd = validatePwd();
    }
    if (valUserName && valPwd) {
        var b = document.getElementById('usrUserName').value,
        url = 'bookservice.html?username=' + b;
        document.location.href = url;
    }
    return false;
}
function getData() {
    signInData.userName= document.getElementById('usrUserName').value;
    signInData.password= document.getElementById('usrPwd').value;
}
function validateFilled(fieldContent, errLabel, fieldx) {
    if (fieldContent == "") {
        errText = "must be filled";
    } else {
        errText = "";
    }
    showHideErrText(errLabel, fieldx);
    switch (errText) {
        case "":
            return true;
            break;
        default:
            return false;
            break;
    }
}
function showHideErrText(errLabel, fieldx) {
    if (errText == "") {
        opac = 0;
        bColor = "black";
    } else {
        opac = 1;
        bColor = "red";
    }
    document.getElementById(errLabel).innerHTML = errText;
    document.getElementById(errLabel).style.opacity = opac;
    if (errLabel != "errGender") {
        document.getElementById(fieldx).style.borderColor = bColor;
    }
}
function validateUserName() {
    var userName = signInData.userName;
    for (let i = 0; i < userHCData.length; i++) {
        const element = userHCData[i][0];
        if (element === userName) {
            errText = "";
            break;
        } else {
            errText = "invalid username";       
        }
    }
    showHideErrText('errUserName', 'usrUserName');
    return errOrNot(errText);
}
function validatePwd() {
    var userName = signInData.userName;
    var userPwd = signInData.password;
    for (let i = 0; i < userHCData.length; i++) {
        const element = userHCData[i][0];
        const usrPwd = userHCData[i][1];
        if (element === userName) {
            if (usrPwd === userPwd) {
                errText = "";                
            } else {
                errText = "wrong password"
            }
            break;
        } else {
            errText = "invalid password"
        }
    }
    showHideErrText('errPwd', 'usrPwd');
    return errOrNot(errText);
}
function errOrNot(errText) {
    switch (errText) {
        case "":
            return true;
            break;
        default:
            return false;
            break;
    }
}