let errText = "", 
    opac = "",
    bColor = "";
var signUpData = {
    fullName: document.getElementById('usrName').value,
    email: document.getElementById('usrEmail').value,
    userName: document.getElementById('usrUserName').value,
    password: document.getElementById('usrPwd').value,
    confirmPassword: document.getElementById('usrCPwd').value,
    gender: "",
    dateOfBirth: document.getElementById('usrDOB').value
};
function validateData() {
    getData();
    console.log(signUpData);
    var valFullName = validateFilled(signUpData.fullName, 'errFullName', 'usrName');
    var valEmail = validateFilled(signUpData.email, 'errEmail', 'usrEmail');
    var valUserName = validateFilled(signUpData.userName, 'errUserName', 'usrUserName');
    var valPwd = validateFilled(signUpData.password, 'errPwd', 'usrPwd');
    var valCPwd = validateFilled(signUpData.confirmPassword, 'errCPwd', 'usrCPwd');
    var valGender = validateFilled(signUpData.gender, 'errGender', '');
    var valDOB = validateFilled(signUpData.dateOfBirth, 'errDOB', 'usrDOB');
    if (valFullName) {
        valFullName = validateFullName();
    }
    if (valEmail) {
        valEmail = validateEmailAddress();
    }
    if (valUserName) {
        valUserName = validateUserName();
    }
    if (valPwd) {
        valPwd = validatePwd();
    }
    if (valCPwd) {
        valCPwd = validateCPwd();
    }
    if (valDOB) {
        valDOB = validateDOB();
    }
    if (valFullName && valEmail && valUserName && valPwd && valCPwd && valGender && valDOB) {
        let strInsertedData = 'Your account is signed up as: \n' + 
        'Full Name: '+signUpData.fullName+'\n' + 
        'Date of Birth: '+signUpData.dateOfBirth+'\n' +
        'Email: '+signUpData.email+'\n' +
        'Username: '+signUpData.userName+'\n' +
        'Password: '+signUpData.password+'\n' +
        'Are you sure with the data that you filled?';
        var showInsertedData = confirm(strInsertedData);
        if (showInsertedData) {
            alert("Sign up done successfully*\n*)Your sign up data won't be saved.");
            redirectToLogin();
        }
    }
    return false;
}
function redirectToLogin() {
    location.replace("login.html");
}
function getData() {    
    signUpData.fullName = document.getElementById('usrName').value;
    signUpData.userName= document.getElementById('usrUserName').value;
    signUpData.email= document.getElementById('usrEmail').value;
    signUpData.password= document.getElementById('usrPwd').value;
    signUpData.confirmPassword= document.getElementById('usrCPwd').value;
    if (document.getElementById("male").checked) {
        signUpData.gender= "Male";
    } else if (document.getElementById("female").checked) {
        signUpData.gender= "Female";
    } else {
        signUpData.gender= "";
    }
    signUpData.dateOfBirth= document.getElementById('usrDOB').value;
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
function validateFilled(fieldContent, errLabel, fieldx) {
    if (fieldContent == "") {
        if (errLabel == "errGender") {
            errText = "must be checked";
        } else if (errLabel == "errDOB") {
            errText = "must be chosen";
        } else {
            errText = "must be filled"
        }
    } else {
        errText = "";
    }
    showHideErrText(errLabel, fieldx);
    return errOrNot(errText);
}
function validateFullName() {
    let fullName = signUpData.fullName;
    let alphabetOnly = true;
    for (let i = 0; i < fullName.length; i++) {
        let char = fullName.charCodeAt(i);
        if (char >= 65 && char <= 90) { // Alphabet Huruf Besar
            alphabetOnly = true;
        } else if (char >= 97 && char <= 122) { // Alphabet Huruf Kecil
            alphabetOnly = true;
        } else if ((char >= 192 && char <= 214) || (char >= 216 && char <= 253)) { // Alphabet special characters (e.g. áäåóöúü)
            alphabetOnly = true;
        } else if (char == 32) {
            alphabetOnly = true;
        } else {
            alphabetOnly = false;
            break;
        }
    }
    if (!alphabetOnly) {
        errText = "Must consist of letters only";
    } else {
        errText = "";
    }
    showHideErrText('errFullName', 'usrName');
    return errOrNot(errText);
}
function validateEmailAddress() {
    let email = signUpData.email;
    let hasAt = false, hasDot = false, hasBoth, alphabetOnly;
    let atCharLoc, dotCharLoc;
    for (let i = 0; i < email.length; i++) {
        let char = email.charCodeAt(i);
        if (char == 64) {
            hasAt = true;
            atCharLoc = i;
            break;
        }
    }
    for (let i = 0; i < email.length; i++) {
        let char = email.charCodeAt(i);
        if (char == 46) {
            hasDot = true;
            dotCharLoc = i;
            break;
        }
    }
    for (let i = 0; i < email.length; i++) {
        let char = email.charCodeAt(i);
        if ((char >= 65 && char <= 90) || (char >= 97 && char <= 122) || char == 64 || char == 46 || (char >= 48 && char <= 57)) {
            alphabetOnly = true;
        } else {
            alphabetOnly = false;
            break;
        }
    }
    hasBoth = hasAt && hasDot;
    if (email.includes("@.") || email.includes(".@")) {
        errText = "'@' and '.' cannot be side by side"
    } else if (!hasBoth) {
        errText = "must contain '@' and '.'"
    } else if (!alphabetOnly || (dotCharLoc < atCharLoc)) {
        errText = "must be valid";
    } else if (dotCharLoc == (email.length-1)) {
        errText = "must be valid"
    } else {
        errText = "";
    }
    showHideErrText('errEmail', 'usrEmail');
    return errOrNot(errText);
}
function validateUserName() {
    let userName = signUpData.userName;
    let containSpace = false;
    for (let i = 0; i < userName.length; i++) {
        let char = userName.charCodeAt(i);
        if (char == 32) {
            containSpace = true;
            break;
        } else {
            containSpace = false;
        }
    }
    if (userName.length < 6) {
        errText = "length must be at least 6 chars";
    } else if (containSpace) {
        errText = "cannot contain space";
    } else {
        errText = "";
    }
    showHideErrText('errUserName', 'usrUserName');
    return errOrNot(errText);
}
function validatePwd() {
    let password = signUpData.password;
    let isAlphaNumeric;
    let countAlphabet = 0;
    let countNumeric = 0;
    for (let i = 0; i < password.length; i++) {
        let char = password.charCodeAt(i);
        if (char >= 65 && char <= 90) { // Alphabet Huruf Besar
            countAlphabet++;
        } else if (char >= 97 && char <= 122) { // Alphabet Huruf Kecil
            countAlphabet++;
        } else if ((char >= 192 && char <= 214) || (char >= 216 && char <= 253)) { // Alphabet special characters (e.g. áäåóöúü)
            countAlphabet++;
        } else if (char >= 48 && char <= 57) { // Number (0-9)
            countNumeric++;
        }
    }
    if ((countAlphabet > 0) && (countNumeric > 0)) {
        isAlphaNumeric = true;
    } else {
        isAlphaNumeric = false;
    }
    if (password.length < 8) {
        errText = "length must be at least 8 characters";
    } else if (!isAlphaNumeric) {
        errText = "must be alphanumeric";
    } else {
        errText = ""
    }
    showHideErrText('errPwd', 'usrPwd');
    return errOrNot(errText);
}
function validateCPwd() {
    let password = signUpData.password;
    let confirmPwd = signUpData.confirmPassword;
    if (password === confirmPwd) {
        errText = "";
    } else {
        errText = "must be same with Password";
    }
    showHideErrText('errCPwd', 'usrCPwd');
    return errOrNot(errText);
}
function validateDOB() {
    let DOB = new Date(signUpData.dateOfBirth),
        today = new Date(),
        yyyy = today.getFullYear(),
        mm = today.getMonth() + 1,
        dd = today.getDate();
    today = yyyy + "-" + mm + "-" + dd;
    today = new Date(today);
    console.log(today + " " + DOB);
    var age = ((today - DOB) / 31557600000);
    console.log(age);
    if (age < 0) {
        errText = "cannot be the day after today";
    } else if (age < 13) {
        errText = "must be 13 years old";
    } else {
        errText = "";
    }
    showHideErrText('errDOB', 'usrDOB');
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