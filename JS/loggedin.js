var userHCData = [
    {
        username: 'nkwxn05',
        fullName: 'Nicholas Kwan',
        emailaddress: 'nichz123@gmail.com'
    },
    {
        username: 'johnd03',
        fullName: 'John Doe',
        emailaddress: 'johndoe03@yahoo.com'
    },
    {
        username: 'yacm4haptr',
        fullName: 'Yacob Mahaputra',
        emailaddress: 'yacobmahaputra@gmail.com'
    },
    {
        username: 'stefani_gabriel4',
        fullName: 'Stefani Gabriela',
        emailaddress: 'stefgabi@outlook.com'
    },
    {
        username: 'guest',
        fullName: 'Guest',
        emailaddress: ''
    }
];
// Data Login tampil di setiap page pada tulisan Logged in as @username
var logInData = "";
window.onload = function () {
    if (location.href.indexOf('?') > -1) {
        var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }
        logInData = data.username;      
        document.getElementById('username').innerHTML = logInData;
    } else {
        logInData = document.getElementById('username').innerHTML
    }
    console.log(logInData);
    loadDetails(logInData);  
    loadForumContent();
}
function loadOtherPage(pageID) {
    var b = document.getElementById('username').innerHTML,
    url = pageID + '?username=' + b;
    document.location.href = url;
}
// Untuk page rating
function rateMeter() {
    let ratinGiven = 0;
    if (document.getElementById('rate1').checked) {
        ratinGiven = 1;
    } else if (document.getElementById('rate2').checked) {
        ratinGiven = 2;
    } else if (document.getElementById('rate3').checked) {
        ratinGiven = 3;
    } else if (document.getElementById('rate4').checked) {
        ratinGiven = 4;
    } else if (document.getElementById('rate5').checked) {
        ratinGiven = 5;
    }
    document.getElementById('ratingDesc').style.opacity = 1;
    document.getElementById('ratingDesc').innerHTML = "You rated " + ratinGiven + "/5";
}
function submitRating() {
    let ratinGiven = 0,
        reminder = "";
    if (document.getElementById('rate1').checked) {
        ratinGiven = 1;
    } else if (document.getElementById('rate2').checked) {
        ratinGiven = 2;
    } else if (document.getElementById('rate3').checked) {
        ratinGiven = 3;
    } else if (document.getElementById('rate4').checked) {
        ratinGiven = 4;
    } else if (document.getElementById('rate5').checked) {
        ratinGiven = 5;
    }
    if (ratinGiven == 0) {
        reminder = "Rate must be checked before submit";
    } else {
        reminder = "Rate submitted: " + ratinGiven + "/5";
        document.getElementById('resetButton').click();
    }
    alert(reminder);
    return false;
}
//untuk menu bookingvar 
var signUpData = {
    bookingDate: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    serviceCategory: "",
    carModel: "",
    carTransmission: "",
    carModelYear: ""
};
function getBookingData() {   
    signUpData.bookingDate = new Date();
    signUpData.fullName= document.getElementById('usrName').value;
    signUpData.email= document.getElementById('usrEmail').value;
    signUpData.phoneNumber= document.getElementById('usrPhoneNumber').value;
    signUpData.serviceCategory= document.getElementById('serviceCategory').value;
    signUpData.carModel= document.getElementById('carBrand').value;
    if (document.getElementById("mt").checked) {
        signUpData.carTransmission= "Manual (MT)";
    } else if (document.getElementById("at").checked) {
        signUpData.carTransmission= "Automatic (AT)";
    } else {
        signUpData.carTransmission= "";
    }
    signUpData.carModelYear= document.getElementById('modelYear').value;
}
function loadDetails(userID) {
    if (userID === "guest"  && location.href.indexOf("bookservice.html") > -1) {
        alert("You are logged in as guest. You may book our services by entering your details manually");
    } else {
        for (let i = 0; i < userHCData.length; i++) {
            const element = userHCData[i];
            if (element.username === userID && location.href.indexOf("bookservice.html") > -1) {
                document.getElementById('usrName').value = element.fullName;
                document.getElementById('usrEmail').value = element.emailaddress;
                break;
            }
        }
    }
}
//array untuk isi data booking
var allBookingServiceData = new Array();
//untuk validasi dan pencatatan booking
function submitBooking() {
    getBookingData();
    console.log(signUpData);
    var valFullName = validateFilled(signUpData.fullName, 'errFullName', 'usrName');
    var valEmail = validateFilled(signUpData.email, 'errEmail', 'usrEmail');
    var valPhoneNumber = validateFilled(signUpData.phoneNumber, 'errPhoneNumber', 'usrPhoneNumber');
    var valCategory = validateFilled(signUpData.serviceCategory, 'errCategory', 'serviceCategory');
    var valCarModel = validateFilled(signUpData.carModel, 'errCarBrand', 'carBrand');
    var valCarTransmission = validateFilled(signUpData.carTransmission, 'errTransmission', '');
    var valCarModelYear = validateFilled(signUpData.carModelYear, 'errModelYear', 'modelYear');
    if (valFullName) {
        valFullName = validateFullName();
    }
    if (valEmail) {
        valEmail = validateEmailAddress();
    }
    if (valPhoneNumber) {
        valPhoneNumber = validatePhoneNum();
    }
    if (valCarModelYear) {
        valEmail = validateYear();
    }
    if (valFullName && valEmail && valPhoneNumber && valCategory && valCarModel && valCarModelYear && valCarTransmission) {
        alert("Service Booked");
        document.getElementById('formBooking').reset();
        loadDetails(logInData);
        // To add booking list to array
        var objBooking = {
            bookingDate: signUpData.bookingDate,
            fullName: signUpData.fullName,
            email: signUpData.email,
            phoneNumber: signUpData.phoneNumber,
            serviceCategory: signUpData.serviceCategory,
            carModel: signUpData.carModel,
            carTransmission: signUpData.carTransmission,
            carModelYear: signUpData.carModelYear
        }
        allBookingServiceData[allBookingServiceData.length] = objBooking;
        refreshBookingList();
    }
    return false;
}
let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}
function refreshBookingList() {
    console.log(allBookingServiceData);
    let bookingsAccordionList = "";
    document.getElementById('serviceBooked').style.display = "block";
    for (let i = 0; i < allBookingServiceData.length; i++) {
        let objEach = allBookingServiceData[i];
        let today = new Date(objEach.bookingDate);
        let todayDate = today.getDate() + "";
        switch (todayDate.substr((todayDate.length)-1)) {
            case 1:
                todayDate += "st"                
                break;
            case 2:
                todayDate += "nd"                    
                break;
            case 3:
                todayDate += "rd"                    
                break;
        
            default:
                todayDate += "th"
                break;
        }
        let formattedDate = weekday[today.getDay()] +", "+ months[today.getMonth()] + " " + todayDate +", "+ today.getFullYear() +" @ "+ checkTime(today.getHours()) +":"+ checkTime(today.getMinutes()) +":"+ checkTime(today.getSeconds())
        console.log(formattedDate);
        let htmlBookingCode = `
        <div class="accordion">
            <p>${objEach.serviceCategory} for ${objEach.carModelYear} ${objEach.carModel} ${objEach.carTransmission}</p>
        </div>
        <div class="panel">
            <p>Booked by: ${objEach.fullName}</p>
            <p>Email: ${objEach.email}</p>
            <p>Phone Number: ${objEach.phoneNumber}</p>
            <p>Date and Time Booked: ${formattedDate}</p>
            <p>Service Category: ${objEach.serviceCategory}</p>
            <p>Car model: ${objEach.carModel}</p>
            <p>Year: ${objEach.carModelYear}</p>
            <p>Transmission: ${objEach.carTransmission}</p>
        </div>
        `;
        bookingsAccordionList += htmlBookingCode;
    }
    document.getElementById("accordionHandler").innerHTML = bookingsAccordionList;
}
//untuk validasi feedback form
var allFeedbackData = new Array();
var feedbackData = {
    feedbackDate: "",
    feedbackTime: "",
    feedbackPoster: "",
    serviceFeedbacked: "",
    feedbackTitle: "",
    feedbackContent: ""
}
function getFeedbackData() {
    let today = new Date();
    let todayDate = today.getDate() + "";
    switch (todayDate.substr((todayDate.length)-1)) {
        case 1:
            todayDate += "st"                
            break;
        case 2:
            todayDate += "nd"                    
            break;
        case 3:
            todayDate += "rd"                    
            break;
    
        default:
            todayDate += "th"
            break;
    }
    let formattedDate = weekday[today.getDay()] +", "+ months[today.getMonth()] + " " + todayDate +", "+ today.getFullYear();
    let formattedTime = checkTime(today.getHours()) +":"+ checkTime(today.getMinutes()) +":"+ checkTime(today.getSeconds());
    console.log(formattedDate);
    feedbackData.feedbackDate = formattedDate;
    feedbackData.feedbackTime = formattedTime;
    for (let i = 0; i < userHCData.length; i++) {
        const element = userHCData[i];
        if (element.username === logInData) {
            feedbackData.feedbackPoster = element.fullName;
            break;
        }
    }
    feedbackData.serviceFeedbacked = document.getElementById('serviceCategory').value;
    feedbackData.feedbackTitle = document.getElementById('feedTitle').value;
    feedbackData.feedbackContent = document.getElementById('feedContent').value;
}
function submitFeedback() {
    getFeedbackData();
    let valServiceUsed = validateFilled(feedbackData.serviceFeedbacked, 'errCategory', 'serviceCategory');
    let valFeedTitle = validateFilled(feedbackData.feedbackTitle, 'errTitle', 'feedTitle');
    let valFeedContent = validateFilled(feedbackData.feedbackContent, 'errContent', 'feedContent');
    if (valServiceUsed && valFeedTitle && valFeedContent) {
        alert("Feedback sent");
        document.getElementById("feedbackForm").reset();
        // To add feedback in array
        var objFeedback = {
            feedbackDate: feedbackData.feedbackDate,
            feedbackTime: feedbackData.feedbackTime,
            feedbackPoster: feedbackData.feedbackPoster,
            serviceFeedbacked: feedbackData.serviceFeedbacked,
            feedbackTitle: feedbackData.feedbackTitle,
            feedbackContent: feedbackData.feedbackContent
        }
        allFeedbackData.push(objFeedback);
        console.log(allFeedbackData);
        refreshFeedback();
    }
    return false;
}
function refreshFeedback() {
    let feedBackLists = "";
    document.getElementById('userFeedbacks').style.display = "block";
    for (let i = 0; i < allFeedbackData.length; i++) {
        let element = allFeedbackData[i];
        let htmlFeedBackCode = `
        <div class="verticalCont feedbackPost">
            <p>Posted on ${element.feedbackDate}</p>
            <p>${element.feedbackTime}</p>
        </div>
        <h2>${element.feedbackTitle}</h2>
        <p>by ${element.feedbackPoster} for ${element.serviceFeedbacked} Service</p>
        <p>${element.feedbackContent}</p>
        <hr>
        `;
        feedBackLists += htmlFeedBackCode;
    }
    document.getElementById('feedBackContainer').innerHTML = feedBackLists;
}
//untuk page forum
var forumPostCollection = [
    {
        postDateTime: "Friday, July 3rd, 2020 at 13:35:27",
        postName: "Stefani Gabriela",
        postTitle: "Masalah pada Tenaga Mesin Honda Jazz",
        postContent: "Halo sis, aku punya Honda Jazz tahun 2018 namun saya merasa kurang puas dengan tenaga mesin bawaan nya. Apakah layanan tune-up yang disediakan pada AutoFix memungkinkan untuk meningkatkan tenaga mesin? Terima kasih.",
        postCommentIndex: 1
    },
    {
        postDateTime: "Wednesday, July 1st, 2020 at 20:05:34",
        postName: "Nicholas Kwan",
        postTitle: "Masalah pada Aki Toyota Innova Reborn",
        postContent: "Halo agan sista, saya punya Innova Reborn tahun 2017 yang sudah tidak pernah dihidupkan selama 1 bulan lebih karena pandemi virus corona yang mengharuskan saya untuk bekerja dari rumah. Pada saat saya ingin menghidupkan kembali mobil tersebut, starter tidak bekerja secara maksimal, yang sepertinya akar masalah nya terdapat pada aki yang sudah habis tenaganya. Apakah ada solusi untuk menghidupkan kembali mobil saya? Terima kasih.",
        postCommentIndex: 0
    }
];
var forumPostData = {
    postDateTime: "",
    postName: "",
    postTitle: "",
    postContent: "",
    postCommentIndex: forumPostCollection.length    
}
var forumPostComments = [
    {
        commentDateTime: ["Wednesday, July 1st, 2020 at 20:30:02", "Wednesday, July 1st, 2020 at 22:07:13"],
        commentName: ["Yacob Mahaputra", "Stefani Gabriela"],
        commentCotent: ["Coba di jumper sama mobil lain yang voltase akinya lebih besar", "Hmm kalo udah di jumper jangan lupa ganti aki nya dong"]
    },
    {
        commentDateTime: ["Friday, July 3rd, 2020 at 14:05:46"],
        commentName: ["John Doe"],
        commentCotent: ["Bisa sis, gua punya Honda Mobilio yang mesin nya sama kyk jazz. Peningkatan tenaga nya sangat signifikan kok :)"]
    }
]
var forumPostCommentData = {
    commentDateTime: "",
    commentName: "",
    postContent: ""
}
function loadForumContent() {
    if (location.href.indexOf("forum.html") > -1) {
        let forumList = "";
        for (let i = 0; i < forumPostCollection.length; i++) {
            let element = forumPostCollection[i];
            let postCommentCount = forumPostComments[element.postCommentIndex].commentName.length;
            let htmlFeedBackCode = `
            <div class="verticalCont forumPost">
                <p>${element.postName}</p>
                <p>${element.postDateTime}</p>
            </div>
            <h1>${element.postTitle}</h1>
            <p>${element.postContent}</p>
            <div class="verticalCont forumPost">
                <a href="javascript:toggleCommentList(${element.postCommentIndex})"><p>View Comments (${postCommentCount})</p></a>
                <div class="verticalStick">
                    <a href="javascript:toggleCommentForm(${element.postCommentIndex})"><p><i class="fa fa-comment-o"></i> <span id="btComment">Give a Comment</span></p></a>
                </div>
            </div>
            <hr>
            `;
            forumList += htmlFeedBackCode;
        }
        document.getElementById('forumPosts').innerHTML = forumList;
    }
}
function toggleForm() {
    var disp = document.getElementById('forumPost').style.display;
    var buttonText = document.getElementById('createCancelPost').innerHTML;
    console.log(disp);
    console.log(buttonText);
    if (buttonText === "Cancel") {
        disp = "none";
        document.getElementById('forumPost').reset();
        buttonText = "Create Post";
    } else if (buttonText === "Create Post") {
        disp = "flex";
        buttonText = "Cancel";
    }
    document.getElementById('forumPost').style.display = disp;
    document.getElementById('createCancelPost').innerHTML = buttonText;
}
function postForumContent() {
    getForumPostData();
    console.log(forumPostData);
    var valForumTitle = validateFilled(forumPostData.postTitle, 'errTitle', 'feedTitle');
    var valForumContent = validateFilled(forumPostData.postContent, 'errContent', 'feedContent');
    if (valForumTitle && valForumContent) {
        toggleForm();
        var objContent = {
            postDateTime: forumPostData.postDateTime,
            postName: forumPostData.postName,
            postTitle: forumPostData.postTitle,
            postContent: forumPostData.postContent,
            postCommentIndex: forumPostCollection.length    
        }
        forumPostCollection.unshift(objContent);
        var objComment = {
            commentDateTime: [],
            commentName: [],
            commentCotent: []
        }
        forumPostComments.push(objComment);
        console.log(forumPostComments);
        alert("Forum post success");
        loadForumContent();
    }
    return false;
}
function getForumPostData() {
    let today = new Date();
    let todayDate = today.getDate() + "";
    switch (todayDate.substr((todayDate.length)-1)) {
        case 1:
            todayDate += "st"                
            break;
        case 2:
            todayDate += "nd"                    
            break;
        case 3:
            todayDate += "rd"                    
            break;
    
        default:
            todayDate += "th"
            break;
    }
    let formattedDate = weekday[today.getDay()] +", "+ months[today.getMonth()] + " " + todayDate +", "+ today.getFullYear();
    let formattedTime = checkTime(today.getHours()) +":"+ checkTime(today.getMinutes()) +":"+ checkTime(today.getSeconds());
    console.log(formattedDate);
    forumPostData.postDateTime = formattedDate + " at " + formattedTime;
    forumPostData.postTitle = document.getElementById('feedTitle').value;
    forumPostData.postContent = document.getElementById('feedContent').value;
    forumPostData.postCommentIndex = forumPostComments.length;
    for (let i = 0; i < userHCData.length; i++) {
        const element = userHCData[i];
        if (element.username === logInData) {
            forumPostData.postName = element.fullName;
            break;
        }
    }
}

function setForumCommentData(comment) {
    let commentDateTime = "";
    let commentName = "";
    let postContent = comment;
    for (let i = 0; i < userHCData.length; i++) {
        const element = userHCData[i];
        if (element.username === logInData) {
            commentName = element.fullName;
            break;
        }
    }
    let today = new Date();
    let todayDate = today.getDate() + "";
    switch (todayDate.substr((todayDate.length)-1)) {
        case 1:
            todayDate += "st"                
            break;
        case 2:
            todayDate += "nd"                    
            break;
        case 3:
            todayDate += "rd"                    
            break;
    
        default:
            todayDate += "th"
            break;
    }
    let formattedDate = weekday[today.getDay()] +", "+ months[today.getMonth()] + " " + todayDate +", "+ today.getFullYear();
    let formattedTime = checkTime(today.getHours()) +":"+ checkTime(today.getMinutes()) +":"+ checkTime(today.getSeconds());
    commentDateTime = formattedDate + " at " + formattedTime;
    forumPostCommentData.commentDateTime = commentDateTime;
    forumPostCommentData.commentName = commentName;
    forumPostCommentData.postContent = postContent;
}
function toggleCommentForm(number) {
    var promptText = "Enter comment for " + forumPostCollection[(forumPostCollection.length-1) - number].postTitle + ":";
    var comment = "";
    while (comment == "") {
        comment = prompt(promptText);
    }
    console.log(comment);
    setForumCommentData(comment);
    var objCommentPost = {
        commentDateTime: forumPostCommentData.commentDateTime,
        commentName: forumPostCommentData.commentName,
        postContent: forumPostCommentData.postContent
    }
    forumPostComments[number].commentDateTime.push(objCommentPost.commentDateTime);
    forumPostComments[number].commentName.push(objCommentPost.commentName);
    forumPostComments[number].commentCotent.push(objCommentPost.postContent);
    alert("Comment for " + forumPostCollection[(forumPostCollection.length-1) - number].postTitle + " posted!");
    loadForumContent();
}
function toggleCommentList(number) {
    if (forumPostComments[forumPostCollection[(forumPostCollection.length-1) - number].postCommentIndex].commentName.length == 0) {
        alert("No comment posted yet!");
    } else {
    let commentView = "Comments sent to " + forumPostCollection[(forumPostCollection.length-1) - number].postTitle + ":\n";
    for (let i = 0; i < forumPostComments[number].commentName.length; i++) {
        let commentsList = `
${i+1}) ${forumPostComments[number].commentName[i]}
${forumPostComments[number].commentDateTime[i]}
${forumPostComments[number].commentCotent[i]}
        `;
        commentView += commentsList;
    }
    alert(commentView);
    }
}
//bisa digunakan untuk validasi booking service dan forum
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
    if (errLabel != "errTransmission") {
        document.getElementById(fieldx).style.borderColor = bColor;
    }
}
function validateFilled(fieldContent, errLabel, fieldx) {
    if (fieldContent == "") {
        if (errLabel == "errTransmission") {
            errText = "must be checked";
        } else if (errLabel == "errCarBrand" || errLabel == "errCategory") {
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
function valIsNumber(errLabel, fieldx) {
    let valx = document.getElementById(fieldx).value;
    for (let i = 0; i < valx.length; i++) {
        const char = valx.charCodeAt(i);
        if (char < 48 || char > 57) { // Number (0-9)
            errText = "must be a number";
            break;
        } else {
            errText = "";
        }
    }
    showHideErrText(errLabel, fieldx);
    return errOrNot(errText);
}
function validatePhoneNum() {
    var valNum = valIsNumber('errPhoneNumber', 'usrPhoneNumber');
    if (valNum) {
        if (signUpData.phoneNumber.length < 12) {
            errText = "must be at least 12 characters or more";
        } else {
            errText = "";
        }
    }
    showHideErrText('errPhoneNumber', 'usrPhoneNumber');
    return errOrNot(errText);
}
function validateYear() {
    let valNum = valIsNumber('errModelYear','modelYear');
    let yearNow = new Date().getFullYear();
    if (valNum) {
        if (signUpData.carModelYear < 2005) {
            errText = "can't be before 2005";
        } else if (signUpData.carModelYear > yearNow) {
            errText = "can't be after this year";
        } else {
            errText = "";
        }
    }
    showHideErrText('errModelYear','modelYear');
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