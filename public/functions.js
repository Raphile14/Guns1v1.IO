let rankQueueLength = 0;
let username = "Anonymous";
let lobbyName = "";
let enemy = "";

// ================================= Functions ==================================
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
    let socket = io.connect('58b9112b.ngrok.io');

    // Logout
    let logout = $("#logout");
    logout.click(function(){
        socket.disconnect();
        location.reload(true);
        show('loginPage', 'chatRoom');
    })

    // ============================= Queuing and Lobbying =============================
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

    // Found Rank Queue
    socket.on('rankQueueFound', (data) => {
        if (data.players.includes(username)) {
            socket.emit('rankQueueConfirm', {players : data.players, lobbyName : data.lobbyName});
        }
    });

    // Join Rank Match
    socket.on('rankJoin', (data) => {
        document.getElementById("rankedButton").style.background = 'rgb(90, 97, 202)';
        document.getElementById("rankLobbyName").innerText = data.lobbyName;
        lobbyName = data.lobbyName;
        if (data.players[0] == username) {
            enemy = data.players[1];
        }   
        else if (data.players[1] == username) {
            enemy = data.players[0];
        }
        return show("rankMatch", "chatRoom");
    });

    // Leave/Disconnect from Rank Match
    let rankDisconnect = $("#rankDisconnect");
    rankDisconnect.click(function(){
        console.log("user wants to disconnect");
        socket.emit('rankDisconnect', {username : username, lobbyName : lobbyName, enemy : enemy});        
    });

    // Return to Chatroom from Rank Match
    socket.on('rankDisconnectConfirm', (data) => {
        if (data.lobbyName == lobbyName) {
            lobbyName = "";
            enemy = "";
            socket.emit('rankRemoveMe', {username : username});
            return show('chatRoom', 'rankMatch');
        }        
    });

    // Rank Match Action 
    let rankChosen = "";
    $("#rankCharge").click(function(){rankChosen = "charge"; emitRankAction();});
    $("#rankPistol").click(function(){rankChosen = "pistol"; emitRankAction();});
    $("#rankCounter").click(function(){rankChosen = "counter"; emitRankAction();});
    $("#rankShield1").click(function(){rankChosen = "shield1"; emitRankAction();});
    $("#rankEvade").click(function(){rankChosen = "evade"; emitRankAction();});
    $("#rankBlock").click(function(){rankChosen = "block"; emitRankAction();});
    $("#rankDoublePistol").click(function(){rankChosen = "doublepistol"; emitRankAction();});
    $("#rankGrenade").click(function(){rankChosen = "grenade"; emitRankAction();});
    $("#rankShotgun").click(function(){rankChosen = "shotgun"; emitRankAction();});
    $("#rankShield2").click(function(){rankChosen = "shield2"; emitRankAction();});
    $("#rankLaser").click(function(){rankChosen = "laser"; emitRankAction();});
    $("#rankShield3").click(function(){rankChosen = "shield3"; emitRankAction();});
    $("#rankNuke").click(function(){rankChosen = "nuke"; emitRankAction();});

    function emitRankAction() {
        console.log("action: " + rankChosen);
        socket.emit("rankAction", {username : username, lobbyName : lobbyName, rankChosen : rankChosen});
    }
    // If chosen input is invalid
    socket.on('rankErrorChosen', function(){
        // expound. More specifc error needed
        alert('Invalid action! Choose Another One');
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
            alert(data.message);
        }
        if (data.signInStatus) {           
            username = data.username; 
            let changelogContents = data.changelogContents;
            document.getElementById("changelogArea").innerText = changelogContents;
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

    // =================================== How to Play ===================================
    let instructions = $("#instructions");
    let instructionMainMenu = $("#instructionMainMenu");

    instructions.click(function(){
        return show('instructionsPage', 'chatRoom');
    });
    instructionMainMenu.click(function(){
        return show('chatRoom', 'instructionsPage');
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
    let leaderboardShow = $("#leaderboardShow");

    // Tell Server to send Table
    leaderboardShow.click(function(){
        let choice = document.getElementById('leaderboardChoices'); 
        socket.emit('leaderboard', {type : choice.options[choice.selectedIndex].value});      
    });

    // Receive Table Data
    socket.on("leaderboardSent", (data) => {
        counter = 0;        
        let table = document.getElementById('leaderboardTable');
        if (data.leaderboardStatus) {
            table.innerHTML = "";
            table.style["verticalAlign"] = "middle";
            let choice = document.getElementById('leaderboardChoices');        
            let headerName = document.createElement("TH");
            let headerType = document.createElement("TH");
            let row = table.insertRow(counter);            
            
            headerName.innerHTML = "Name";
            headerName.style['border'] = "5px solid black";
            headerName.style['width'] = "50%";
            headerType.innerHTML = choice.options[choice.selectedIndex].text;
            headerType.style['border'] = "5px solid black";
            headerType.style['width'] = "50%";
            row.appendChild(headerName);
            row.appendChild(headerType);
            counter += 1;

            for (let x = 0; x < data.leaderboardNames.length; x++) {
                row = table.insertRow(counter);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                cell1.innerHTML = data.leaderboardNames[x];
                cell2.innerHTML = data.leaderBoardData[x];
                counter += 1;
            }
        }
        else {
            table.innerHTML = "No Scores greater than 0";
        }
        
    })

    // Go to leaderboard page
    leaderboardButton.click(function(){
        let choice = document.getElementById('leaderboardChoices'); 
        socket.emit('leaderboard', {type : choice.options[choice.selectedIndex].value}); 
        show('leaderboard', 'chatRoom');
    });

    // Go back to main menu page
    leaderboardMainMenu.click(function(){
        show('chatRoom', 'leaderboard');
    })

    // =================================== Profile ===================================
    let profileButton = $("#profileButton");
    let profileMainMenu = $("#profileMainMenu");

    // Go to Profile Page
    profileButton.click(function(){
        socket.emit('profile');    
    });

    // Profile Confirmation
    socket.on('profileConfirm', (data) => {
        document.getElementById('profileUserName').innerHTML = data[0].username;
        document.getElementById('profileGames').innerHTML = ((data[0].userWin) + (data[0].userLose));
        document.getElementById('profileElo').innerHTML = data[0].userElo;
        document.getElementById('profileWin').innerHTML = data[0].userWin;
        document.getElementById('profileLose').innerHTML = data[0].userLose;
        document.getElementById('profileCharge').innerHTML = data[0].timesUsedCharge;
        document.getElementById('profilePistol').innerHTML = data[0].timesUsedPistol;
        document.getElementById('profileShield1').innerHTML = data[0].timesUsedShield1;
        document.getElementById('profileCounter').innerHTML = data[0].timesUsedCounter;
        document.getElementById('profileEvade').innerHTML = data[0].timesUsedEvade;
        document.getElementById('profileBlock').innerHTML = data[0].timesUsedBlock;
        document.getElementById('profileDoublePistol').innerHTML = data[0].timesUsedDoublePistol;
        document.getElementById('profileGrenade').innerHTML = data[0].timesUsedGrenade;
        document.getElementById('profileShotgun').innerHTML = data[0].timesUsedShotgun;
        document.getElementById('profileShield2').innerHTML = data[0].timesUsedShield2;
        document.getElementById('profileLaser').innerHTML = data[0].timesUsedLaser;
        document.getElementById('profileShield3').innerHTML = data[0].timesUsedShield3;
        document.getElementById('profileNuke').innerHTML = data[0].timesUsedNuke;
        show('profile', 'chatRoom');
    })

    // Go back to main menu
    profileMainMenu.click(function(){
        show('chatRoom', 'profile');
    })
});