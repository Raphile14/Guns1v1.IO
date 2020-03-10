let rankQueueLength = 0;
let username = "";

// swap page script
function show(shown, hidden) {
    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';
  }

function getCurrentTime() {
    let today = new Date();
    let date = today.getFullYear() +'-'+ (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

function getTimeOnly() {
    let today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
}

$(function(){
    // connect to server. change if ip address changes
    // let socket = io.connect('http://192.168.0.11:3000');
    let socket = io.connect('192.168.10.104:3000');

    // Logout
    let logout = $("#logout");
    logout.click(function(){
        socket.disconnect();
        location.reload(true);
        show('loginPage', 'chatRoom');
    })

    // ================================= Queuing ==================================
    // Rank Queue
    let rankedButton = $("#rankedButton");    
    rankedButton.click(function(){
        socket.emit('rankQueue');
    });    
    socket.on('rankQueueConfirmation', (data) => {
        if (data.queueWarning.length > 0) {
            document.getElementById("rankedButton").style.background = 'rgb(90, 97, 202)';
            alert(data.queueWarning);
        }
        else {
            document.getElementById("rankedButton").style.background = '#808080';
            alert("Queuing for a Rank Match");
        }
    });

    // Casual Queue
    let casualButton = $("#casualButton");
    casualButton.click(function(){
        socket.emit('casualQueue');
    });
    socket.on('casualQueueConfirmation', (data) => {
        if (data.queueWarning.length > 0) {
            document.getElementById("casualButton").style.background = 'rgb(194, 226, 77)';
            alert(data.queueWarning);
        }
        else {
            document.getElementById("casualButton").style.background = '#808080';
            alert("Queuing for a Casual Match");
        }
    });

    // =================================== Login ===================================
    let usernameLogin = $("#usernameLogin");
    let passwordLogin = $("#passwordLogin");
    let signInButton = $("#signInButton");

    // click sign in button
    signInButton.click(function(){
        let warning = "";
        // console.log(usernameLogin.val() + " with password: " + passwordLogin.val() + " signed in!");
        if (usernameLogin.val().length == 0) {
            warning += ("Empty Username Field\n");
        }
        if (passwordLogin.val().length == 0) {
            warning += ("Empty Password Field\n");
        }
        if (warning.length != 0) {
            alert(warning);
        }
        else if (warning.length == 0) {
            socket.emit('signIn', {usernameLogin : usernameLogin.val(), passwordLogin : passwordLogin.val()});
        }        
    })

    // Listen to server login verification
    socket.on('signIn', (data)=> {
        if (!data.signInStatus) {
            alert("Account Does not Exist");
            console.log('false');
        }
        if (data.signInStatus) {           
            username = data.username; 
            return show("chatRoom", "loginPage");
        }
    });

    // ============================ Update Player Counts ============================

    socket.on('countData', (data) => {
        document.getElementById('playerCount').innerHTML = data.playerCount; 
        document.getElementById('ingameCount').innerHTML = data.ingameCount; 
        document.getElementById('rankQueueCount').innerHTML = data.rankQueueCount; 
        document.getElementById('casualQueueCount').innerHTML = data.casualQueueCount; 
    })

    // =================================== Signup ===================================
    let usernameSignUp = $("#usernameSignUp");
    let useremailSignUp = $("#useremailSignUp");
    let passwordSignUp = $("#passwordSignUp");
    let passwordSignUpConfirm = $("#passwordSignUpConfirm");
    let signUpButton = $("#signUpButton");
    
    signUpButton.click(function(){
        console.log("test");
        let warningSignUp = "";
        // console.log(usernameLogin.val() + " with password: " + passwordLogin.val() + " signed in!");
        if (usernameSignUp.val().length == 0) {
            warningSignUp += ("Empty Username Field\n");
        }
        if (useremailSignUp.val().length == 0) {
            warningSignUp += ("Empty Email Field\n");
        }
        if (passwordSignUp.val().length == 0) {
            warningSignUp += ("Empty Password Field\n");
        }
        if (passwordSignUpConfirm.val().length == 0) {
            warningSignUp += ("Empty Confirm Password Field\n");
        }
        if (passwordSignUp.val() != passwordSignUpConfirm.val()) {
            warningSignUp += ("Password not the same\n");
        }
        if (warningSignUp.length != 0) {
            alert(warningSignUp);
        }        
        else if (warningSignUp.length == 0) {
            console.log("test2");
            socket.emit('signUp', {usernameSignUp : usernameSignUp.val(), 
            useremailSignUp : useremailSignUp.val(), passwordSignUp : passwordSignUp.val()});
        }        
    })

    // Listen to server sign verification
    socket.on('signUp', (data)=> {
        // console.log("warning: " + data.signUpWarning);
        // console.log("bool: " + data.statusSignUp);
        let warningMessage = data.signUpWarning;
        if (!data.statusSignUp) {
            alert(warningMessage);
            // console.log('false');
        }
        if (data.statusSignUp) {
            // console.log("Registration Success");
            alert("Registration Success");
            return show("loginPage", "registrationPage");            
        }
    })

    // =================================== Chat ===================================
    // chat
    let message = $("#message");
    let username = $("#username");
    let sendMessage = $("#sendMessage");
    let sendUserName = $("#sendUserName");
    let chatroom = $("#chatroom")
    let register = $("#register");    

    let input = document.getElementById("message");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sendMessage").click();
        }
    });

    // Emit Message
    sendMessage.click(function(){        
        if (message.val().length > 0) {
            socket.emit('newMessage', {message : message.val()});
            document.getElementById("message").value = "";
        }
    })

    // Listen on newMessage
    socket.on("newMessage", (data) => {
        console.log(data);
        chatroom.append("<p class = 'message'> (" + getTimeOnly() + ") " + data.username + ": " + data.message + "</p>")
    })

    // Emit a username
    sendUserName.click(function(){
        console.log(username.val());
        socket.emit('changeUserName', {username : username.val()});
    })    

    register.click(function(){
        socket.emit('register', {register : true});
    })

    // =================================== Leaderboard ===================================
    let leaderboardButton = $("#leaderboardButton");
    let leaderboardMainMenu = $("#leaderboardMainMenu");

    leaderboardButton.click(function(){
        show('leaderboard', 'chatRoom');
    });

    leaderboardMainMenu.click(function(){
        show('chatRoom', 'leaderboard');
    })

    // =================================== Profile ===================================
    let profileButton = $("#profileButton");
    let profileMainMenu = $("#profileMainMenu");

    profileButton.click(function(){
        show('profile', 'chatRoom');
    });

    profileMainMenu.click(function(){
        show('chatRoom', 'profile');
    })
});