
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

function showAnimation(actionName, isEnemy) {
    if (!isEnemy) {
        if (actionName == "charge") {
            hoverCharge = true; hoverPistol = false; hoverCounter = false; hoverShield1 = false; hoverEvade = false; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = false; hoverShield2 = false; hoverLaser = false; hoverShield3 = false; hoverNuke = false;
        }
        else if (actionName == "pistol") {
            hoverCharge = false; hoverPistol = true; hoverCounter = false; hoverShield1 = false; hoverEvade = false; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = false; hoverShield2 = false; hoverLaser = false; hoverShield3 = false; hoverNuke = false;
        }
        else if (actionName == "counter") {
            hoverCharge = false; hoverPistol = false; hoverCounter = true; hoverShield1 = false; hoverEvade = false; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = false; hoverShield2 = false; hoverLaser = false; hoverShield3 = false; hoverNuke = false;
        }
        else if (actionName == "shield1") {
            hoverCharge = false; hoverPistol = false; hoverCounter = false; hoverShield1 = true; hoverEvade = false; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = false; hoverShield2 = false; hoverLaser = false; hoverShield3 = false; hoverNuke = false;
        }
        else if (actionName == "evade") {
            hoverCharge = false; hoverPistol = false; hoverCounter = false; hoverShield1 = false; hoverEvade = true; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = false; hoverShield2 = false; hoverLaser = false; hoverShield3 = false; hoverNuke = false;
        }
        else if (actionName == "block") {
            hoverCharge = false; hoverPistol = false; hoverCounter = false; hoverShield1 = false; hoverEvade = false; hoverBlock = true; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = false; hoverShield2 = false; hoverLaser = false; hoverShield3 = false; hoverNuke = false;
        }
        else if (actionName == "doublepistol") {
            hoverCharge = false; hoverPistol = false; hoverCounter = false; hoverShield1 = false; hoverEvade = false; hoverBlock = false; hoverDoublePistol = true; hoverGrenade = false; hoverShotgun = false; hoverShield2 = false; hoverLaser = false; hoverShield3 = false; hoverNuke = false;
        }
        else if (actionName == "grenade") {
            hoverCharge = false; hoverPistol = false; hoverCounter = false; hoverShield1 = false; hoverEvade = false; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = true; hoverShotgun = false; hoverShield2 = false; hoverLaser = false; hoverShield3 = false; hoverNuke = false;
        }
        else if (actionName == "shotgun") {
            hoverCharge = false; hoverPistol = false; hoverCounter = false; hoverShield1 = false; hoverEvade = false; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = true; hoverShield2 = false; hoverLaser = false; hoverShield3 = false; hoverNuke = false;
        }
        else if (actionName == "shield2") {
            hoverCharge = false; hoverPistol = false; hoverCounter = false; hoverShield1 = false; hoverEvade = false; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = false; hoverShield2 = true; hoverLaser = false; hoverShield3 = false; hoverNuke = false;
        }
        else if (actionName == "laser") {
            hoverCharge = false; hoverPistol = false; hoverCounter = false; hoverShield1 = false; hoverEvade = false; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = false; hoverShield2 = false; hoverLaser = true; hoverShield3 = false; hoverNuke = false;
        }
        else if (actionName == "shield3") {
            hoverCharge = false; hoverPistol = false; hoverCounter = false; hoverShield1 = false; hoverEvade = false; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = false; hoverShield2 = false; hoverLaser = false; hoverShield3 = true; hoverNuke = false;
        }
        else if (actionName == "nuke") {
            hoverCharge = false; hoverPistol = false; hoverCounter = false; hoverShield1 = false; hoverEvade = false; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = false; hoverShield2 = false; hoverLaser = false; hoverShield3 = false; hoverNuke = true;
        }
        else {
            hoverCharge = false; hoverPistol = false; hoverCounter = false; hoverShield1 = false; hoverEvade = false; hoverBlock = false; hoverDoublePistol = false; hoverGrenade = false; hoverShotgun = false; hoverShield2 = false; hoverLaser = false; hoverShield3 = false; hoverNuke = false;
        }
        console.log("PLAYER");
        console.log(actionName);
    }
    else if (isEnemy) {
        if (actionName == "charge") {
            hoverChargeE = true; hoverPistolE = false; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = false; hoverShield3E = false; hoverNukeE = false;
        }
        else if (actionName == "pistol") {
            hoverChargeE = false; hoverPistolE = true; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = false; hoverShield3E = false; hoverNukeE = false;
        }
        else if (actionName == "counter") {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = true; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = false; hoverShield3E = false; hoverNukeE = false;
        }
        else if (actionName == "shield1") {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = false; hoverShield1E = true; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = false; hoverShield3E = false; hoverNukeE = false;
        }
        else if (actionName == "evade") {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = true; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = false; hoverShield3E = false; hoverNukeE = false;
        }
        else if (actionName == "block") {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = true; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = false; hoverShield3E = false; hoverNukeE = false;
        }
        else if (actionName == "doublepistol") {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = true; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = false; hoverShield3E = false; hoverNukeE = false;
        }
        else if (actionName == "grenade") {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = true; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = false; hoverShield3E = false; hoverNukeE = false;
        }
        else if (actionName == "shotgun") {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = true; hoverShield2E = false; hoverLaserE = false; hoverShield3E = false; hoverNukeE = false;
        }
        else if (actionName == "shield2") {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = true; hoverLaserE = false; hoverShield3E = false; hoverNukeE = false;
        }
        else if (actionName == "laser") {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = true; hoverShield3E = false; hoverNukeE = false;
        }
        else if (actionName == "shield3") {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = false; hoverShield3E = true; hoverNukeE = false;
        }
        else if (actionName == "nuke") {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = false; hoverShield3E = false; hoverNukeE = true;
        }
        else {
            hoverChargeE = false; hoverPistolE = false; hoverCounterE = false; hoverShield1E = false; hoverEvadeE = false; hoverBlockE = false; hoverDoublePistolE = false; hoverGrenadeE = false; hoverShotgunE = false; hoverShield2E = false; hoverLaserE = false; hoverShield3E = false; hoverNukeE = false;
        }
        console.log("ENEMY");
        console.log(actionName);
    }
}

$(function(){
    // connect to server. change if ip address changes
    // let socket = io.connect('http://192.168.0.11:3000');
    let socket = io.connect('http://admin-ylyp.localhost.run/'); //263cba96.ngrok.io
    let uploader = new SocketIOFileUpload(socket);
    uploader.listenOnInput(document.getElementById("siofu_input"));

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

    // Rank Confirmation
    socket.on('rankQueueConfirmation', (data) => {
        if (data.queueWarning.length > 0) {
            document.getElementById("rankedButton").style.background = 'rgb(90, 97, 202)';
            document.getElementById("playerQueueStatus").innerText = "ONLINE";
            document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)';  
        }
        else {
            document.getElementById("rankedButton").style.background = '#808080';
            document.getElementById("playerQueueStatus").innerText = "QUEUING: RANK";
            document.getElementById("playerQueueStatus").style.color = '#0dc545';            
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
        document.getElementById("rankPlayerName").innerText = username;
        document.getElementById("rankLobbyName").innerText = data.lobbyName;
        lobbyName = data.lobbyName;
        if (data.players[0] == username) {            
            enemy = data.players[1];
            document.getElementById("rankEnemyName").innerText = enemy;
            socket.emit('getEnemyProfilePicture', {enemy : enemy, username : username});
        }   
        else if (data.players[1] == username) {
            enemy = data.players[0];
            document.getElementById("rankEnemyName").innerText = enemy;
            socket.emit('getEnemyProfilePicture', {enemy : enemy, username : username});
        }
        inGamePage = true;
        mainMenuPage = false;
        showAnimation("", false);
        showAnimation("", true);
        return show("rankMatch", "chatRoom");
    });

    // Receive Enemy Profile Picture
    socket.on('enemyProfileChange', (data) => {   
        $("#enemyPicture").attr("src", "data:image/png;base64," + b64(data.buffer));  
        $("#enemyPictureCasual").attr("src", "data:image/png;base64," + b64(data.buffer));             
        console.log("loaded texture");
        // textureFace.load("data:image/png;base64," + b64(data.buffer));
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
            document.getElementById("rankLobbyName").innerText = "";
            document.getElementById("rankEnemyName").innerText = "";
            document.getElementById("rankEnemyUsed").innerText = "No Actions Yet";
            document.getElementById("rankPlayerUsed").innerText = "No Actions Yet";
            document.getElementById("chargeCount").innerText = "0";  
            document.getElementById("playerQueueStatus").innerText = "ONLINE";
            document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)'; 
            if (data.userWinner == username) {
                document.getElementById("playerElo").innerText = data.userEloWinner;
            }
            else if (data.userLoser == username) {
                document.getElementById("playerElo").innerText = data.userEloLoser;
            }                
            inGamePage = false;
            mainMenuPage = true;          
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

    socket.on('rankDataAccepted', (data) => {
        if (data.username != username) {
            document.getElementById("rankReady").innerText = "Ready"; 
            document.getElementById("rankReady").style.color = "#0dc545";
        }
    })

    socket.on('rankGameData', (data) => {
        if (data.player1.includes(username)) {
            document.getElementById("chargeCount").innerText = data.player1[1];
            document.getElementById("rankPlayerUsed").innerText = data.player1[3];
            document.getElementById("rankEnemyUsed").innerText = data.player2[3];
            document.getElementById("rankReady").innerText = "Not Ready";
            document.getElementById("rankReady").style.color = "#750a0a";
            showAnimation(data.player1[3], false);
            showAnimation(data.player2[3], true);
            if (data.player1[2] && !data.player2[2]) {
                socket.emit('rankGameFinish', {lobbyName : lobbyName});
                lobbyName = "";
                inGamePage = true;
                mainMenuPage = false;   
                showAnimation("", false);
                showAnimation("", true);
                document.getElementById("playerQueueStatus").innerText = "ONLINE";
                document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)';  
                return show("winPage", "rankMatch");
            }
            else if (!data.player1[2] && data.player2[2]) {
                socket.emit('rankGameFinish', {lobbyName : lobbyName});
                lobbyName = "";
                inGamePage = true;
                mainMenuPage = false;   
                showAnimation("", false);
                showAnimation("", true);
                document.getElementById("playerQueueStatus").innerText = "ONLINE";
                document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)';  
                return show("losePage", "rankMatch");
            }
        }
        else if (data.player2.includes(username)) {
            document.getElementById("chargeCount").innerText = data.player2[1];
            document.getElementById("rankPlayerUsed").innerText = data.player2[3];
            document.getElementById("rankEnemyUsed").innerText = data.player1[3];
            document.getElementById("rankReady").innerText = "Not Ready";
            document.getElementById("rankReady").style.color = "#750a0a";
            showAnimation(data.player2[3], false);
            showAnimation(data.player1[3], true);
            if (data.player2[2] && !data.player1[2]) {
                socket.emit('rankGameFinish', {lobbyName : lobbyName});
                lobbyName = "";
                inGamePage = true;
                mainMenuPage = false; 
                showAnimation("", false);
                showAnimation("", true);  
                document.getElementById("playerQueueStatus").innerText = "ONLINE";
                document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)';  
                return show("winPage", "rankMatch");
            }
            else if (!data.player2[2] && data.player1[2]) {
                socket.emit('rankGameFinish', {lobbyName : lobbyName});
                lobbyName = "";
                inGamePage = true;
                mainMenuPage = false; 
                showAnimation("", false);
                showAnimation("", true);  
                document.getElementById("playerQueueStatus").innerText = "ONLINE";
                document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)';  
                return show("losePage", "rankMatch");
            }
        }        
    });

    socket.on('updateElo', (data) => {
        if (data.username == username) {
            document.getElementById('playerElo').innerText -= data.value;
        }
    })

    // Casual Queue
    let casualButton = $("#casualButton");
    casualButton.click(function(){
        socket.emit('casualQueue');
    });

    // Casual Confirmation
    socket.on('casualQueueConfirmation', (data) => {
        if (data.queueWarning.length > 0) {
            document.getElementById("casualButton").style.background = 'rgb(194, 226, 77)';
            document.getElementById("playerQueueStatus").innerText = "ONLINE";
            document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)'; 
        }
        else {
            document.getElementById("casualButton").style.background = '#808080';
            document.getElementById("playerQueueStatus").innerText = "QUEUING: CASUAL";
            document.getElementById("playerQueueStatus").style.color = '#0dc545'; 
        }
    });  
    
    // Found Casual Queue
    socket.on('casualQueueFound', (data) => {
        if (data.players.includes(username)) {
            socket.emit('casualQueueConfirm', {players : data.players, lobbyName : data.lobbyName});
        }
    });

    // Join Casual Match
    socket.on('casualJoin', (data) => {
        document.getElementById("casualButton").style.background = 'rgb(194, 226, 77)';        
        document.getElementById("casualPlayerName").innerText = username;
        document.getElementById("casualLobbyName").innerText = data.lobbyName;
        console.log(username);
        console.log(data.lobbyName);
        lobbyName = data.lobbyName;
        if (data.players[0] == username) {            
            enemy = data.players[1];
            document.getElementById("casualEnemyName").innerText = enemy;
            socket.emit('getEnemyProfilePicture', {enemy : enemy, username : username});
        }   
        else if (data.players[1] == username) {
            enemy = data.players[0];
            document.getElementById("casualEnemyName").innerText = enemy;
            socket.emit('getEnemyProfilePicture', {enemy : enemy, username : username});
        }
        inGamePage = true;
        mainMenuPage = false;
        showAnimation("", false);
        showAnimation("", true);
        return show("casualMatch", "chatRoom");
    });

    // Leave/Disconnect from Casual Match
    let casualDisconnect = $("#casualDisconnect");
    casualDisconnect.click(function(){
        console.log("user wants to disconnect");
        socket.emit('casualDisconnect', {username : username, lobbyName : lobbyName, enemy : enemy});        
    });

    // Return to Chatroom from Casual Match
    socket.on('casualDisconnectConfirm', (data) => {
        if (data.lobbyName == lobbyName) {
            lobbyName = "";
            enemy = "";
            socket.emit('casualRemoveMe', {username : username});
            document.getElementById("casualLobbyName").innerText = "";
            document.getElementById("casualEnemyName").innerText = "";
            document.getElementById("casualEnemyUsed").innerText = "No Actions Yet";
            document.getElementById("casualPlayerUsed").innerText = "No Actions Yet";
            document.getElementById("casualChargeCount").innerText = "0";
            document.getElementById("playerQueueStatus").innerText = "ONLINE";
            document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)'; 
            inGamePage = false;
            mainMenuPage = true;   
            return show('chatRoom', 'casualMatch');
        }        
    });

    // Casual Match Action 
    let casualChosen = "";
    $("#casualCharge").click(function(){casualChosen = "charge"; emitCasualAction();});
    $("#casualPistol").click(function(){casualChosen = "pistol"; emitCasualAction();});
    $("#casualCounter").click(function(){casualChosen = "counter"; emitCasualAction();});
    $("#casualShield1").click(function(){casualChosen = "shield1"; emitCasualAction();});
    $("#casualEvade").click(function(){casualChosen = "evade"; emitCasualAction();});
    $("#casualBlock").click(function(){casualChosen = "block"; emitCasualAction();});
    $("#casualDoublePistol").click(function(){casualChosen = "doublepistol"; emitCasualAction();});
    $("#casualGrenade").click(function(){casualChosen = "grenade"; emitCasualAction();});
    $("#casualShotgun").click(function(){casualChosen = "shotgun"; emitCasualAction();});
    $("#casualShield2").click(function(){casualChosen = "shield2"; emitCasualAction();});
    $("#casualLaser").click(function(){casualChosen = "laser"; emitCasualAction();});
    $("#casualShield3").click(function(){casualChosen = "shield3"; emitCasualAction();});
    $("#casualNuke").click(function(){casualChosen = "nuke"; emitCasualAction();});

    function emitCasualAction() {
        console.log("action: " + casualChosen);
        socket.emit("casualAction", {username : username, lobbyName : lobbyName, casualChosen : casualChosen});
    }
    // If chosen input is invalid
    socket.on('casualErrorChosen', function(){
        // expound. More specifc error needed
        alert('Invalid action! Choose Another One');
    });

    socket.on('casualDataAccepted', (data) => {
        if (data.username != username) {
            document.getElementById("casualReady").innerText = "Ready";
            document.getElementById("casualReady").style.color = "#0dc545";
        }
    })
    socket.on('casualGameData', (data) => {
        if (data.player1.includes(username)) {
            document.getElementById("casualChargeCount").innerText = data.player1[1];
            document.getElementById("casualPlayerUsed").innerText = data.player1[3];
            document.getElementById("casualEnemyUsed").innerText = data.player2[3];
            document.getElementById("casualReady").innerText = "Not Ready";
            document.getElementById("casualReady").style.color = "#750a0a";
            showAnimation(data.player1[3], false);
            showAnimation(data.player2[3], true);
            if (data.player1[2] && !data.player2[2]) {
                socket.emit('casualGameFinish', {lobbyName : lobbyName});
                lobbyName = "";
                inGamePage = true;
                mainMenuPage = false;   
                showAnimation("", false);
                showAnimation("", true);
                document.getElementById("playerQueueStatus").innerText = "ONLINE";
                document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)';  
                return show("winPage", "casualMatch");
            }
            else if (!data.player1[2] && data.player2[2]) {
                socket.emit('casualGameFinish', {lobbyName : lobbyName});
                lobbyName = "";
                inGamePage = true;
                mainMenuPage = false;   
                showAnimation("", false);
                showAnimation("", true);
                document.getElementById("playerQueueStatus").innerText = "ONLINE";
                document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)';  
                return show("losePage", "casualMatch");
            }
        }
        else if (data.player2.includes(username)) {
            document.getElementById("casualChargeCount").innerText = data.player2[1];
            document.getElementById("casualPlayerUsed").innerText = data.player2[3];
            document.getElementById("casualEnemyUsed").innerText = data.player1[3];
            document.getElementById("casualReady").innerText = "Not Ready";
            document.getElementById("casualReady").style.color = "#750a0a";
            showAnimation(data.player2[3], false);
            showAnimation(data.player1[3], true);
            if (data.player2[2] && !data.player1[2]) {
                socket.emit('casualGameFinish', {lobbyName : lobbyName});
                lobbyName = "";
                inGamePage = true;
                mainMenuPage = false;   
                showAnimation("", false);
                showAnimation("", true);
                document.getElementById("playerQueueStatus").innerText = "ONLINE";
                document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)';  
                return show("winPage", "casualMatch");
            }
            else if (!data.player2[2] && data.player1[2]) {
                socket.emit('casualGameFinish', {lobbyName : lobbyName});
                lobbyName = "";
                inGamePage = true;
                mainMenuPage = false;  
                showAnimation("", false);
                showAnimation("", true);      
                document.getElementById("playerQueueStatus").innerText = "ONLINE";
                document.getElementById("playerQueueStatus").style.color = 'rgb(180, 180, 180)';             
                return show("losePage", "casualMatch");
            }
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
            document.getElementById("losePageName").innerText = username;
            document.getElementById("winPageName").innerText = username;
            document.getElementById("playerUsername").innerText = username + "!";            
            document.getElementById("playerElo").innerText = data.userElo; 
            loginRegistrationPage = false;
            mainMenuPage = true;            
            if (data.isAdmin == "true") {
                document.getElementById("adminButton").style.display = 'block';
            }
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
        let warningSignUp = "";
        // console.log(usernameLogin.val() + " with password: " + passwordLogin.val() + " signed in!");
        if (usernameSignUp.val().trim().length == 0) {
            warningSignUp += ("Empty Username Field\n");
        }
        if (useremailSignUp.val().trim().length == 0) {
            warningSignUp += ("Empty Email Field\n");
        }
        if (passwordSignUp.val().trim().length == 0) {
            warningSignUp += ("Empty Password Field\n");
        }
        if (passwordSignUpConfirm.val().trim().length == 0) {
            warningSignUp += ("Empty Confirm Password Field\n");
        }
        if (passwordSignUp.val() != passwordSignUpConfirm.val()) {
            warningSignUp += ("Password not the same\n");
        }
        if (warningSignUp.length != 0) {
            alert(warningSignUp);
        }        
        else if (warningSignUp.length == 0) {
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
        instructionsPage = true;
        mainMenuPage = false;
        useWaiting();
        return show('instructionsPage', 'chatRoom');
    });
    instructionMainMenu.click(function(){
        instructionsPage = false;
        mainMenuPage = true;
        return show('chatRoom', 'instructionsPage');
    })

    // Hover Input 
    document.getElementById("instructionsCharge").onmouseover = function(){hoverCharge = true;};
    document.getElementById("instructionsCharge").onmouseout = function(){hoverCharge = false;};
    document.getElementById("instructionsPistol").onmouseover = function(){hoverPistol= true;};
    document.getElementById("instructionsPistol").onmouseout = function(){hoverPistol = false;};
    document.getElementById("instructionsCounter").onmouseover = function(){hoverCounter= true;};
    document.getElementById("instructionsCounter").onmouseout = function(){hoverCounter = false;};    
    document.getElementById("instructionsShield1").onmouseover = function(){hoverShield1= true;};
    document.getElementById("instructionsShield1").onmouseout = function(){hoverShield1 = false;};
    document.getElementById("instructionsEvade").onmouseover = function(){hoverEvade= true;};
    document.getElementById("instructionsEvade").onmouseout = function(){hoverEvade = false;};
    document.getElementById("instructionsBlock").onmouseover = function(){hoverBlock= true;};
    document.getElementById("instructionsBlock").onmouseout = function(){hoverBlock = false;};
    document.getElementById("instructionsDoublePistol").onmouseover = function(){hoverDoublePistol= true;};
    document.getElementById("instructionsDoublePistol").onmouseout = function(){hoverDoublePistol = false;};
    document.getElementById("instructionsGrenade").onmouseover = function(){hoverGrenade= true;};
    document.getElementById("instructionsGrenade").onmouseout = function(){hoverGrenade = false;};
    document.getElementById("instructionsShotgun").onmouseover = function(){hoverShotgun= true;};
    document.getElementById("instructionsShotgun").onmouseout = function(){hoverShotgun = false;};
    document.getElementById("instructionsShield2").onmouseover = function(){hoverShield2= true;};
    document.getElementById("instructionsShield2").onmouseout = function(){hoverShield2 = false;};
    document.getElementById("instructionsLaser").onmouseover = function(){hoverLaser= true;};
    document.getElementById("instructionsLaser").onmouseout = function(){hoverLaser = false;};
    document.getElementById("instructionsShield3").onmouseover = function(){hoverShield3= true;};
    document.getElementById("instructionsShield3").onmouseout = function(){hoverShield3 = false;};
    document.getElementById("instructionsNuke").onmouseover = function(){hoverNuke= true;};
    document.getElementById("instructionsNuke").onmouseout = function(){hoverNuke = false;};

    // ================== Return to Main Menu After Win or Lose ===================
    $("#winPageMainMenu").click(function(){
        document.getElementById("chargeCount").innerText = "0";
        document.getElementById("casualChargeCount").innerText = "0";
        inGamePage = false;
        instructionsPage = false;
        mainMenuPage = true;
        loginRegistrationPage = false;
        return show('chatRoom', 'winPage')
    })
    $("#losePageMainMenu").click(function(){
        document.getElementById("chargeCount").innerText = "0";
        document.getElementById("casualChargeCount").innerText = "0";
        inGamePage = false;
        instructionsPage = false;
        mainMenuPage = true;
        loginRegistrationPage = false;
        return show('chatRoom', 'losePage')
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
        $('#chatroom').stop ().animate ({
            scrollTop: $('#chatroom')[0].scrollHeight
          });
    })

    // Emit a username
    $("#changeUserNameButton").click(function(){
        let newUsername = document.getElementById("changeUserName").value;
        newUsername = newUsername.trim();
        if (newUsername.length == 0) {
            alert("Username field empty!");
        }
        else {
            socket.emit('changeUserName', {oldUsername : username, username : newUsername});
        }        
    })        

    // Receive change username confirmation
    socket.on('changeUsernameConfirm', (data) => {
        if (!data.changeStatus && data.oldUsername == username) {
            alert("Invalid New Username Input");
        }
        else if (data.changeStatus && data.oldUsername == username) {
            username = data.newUsername;
            console.log(username);
            document.getElementById("winPageName").innerText = username;
            document.getElementById("losePageName").innerText = username;
            document.getElementById("playerUsername").innerText = username + "!";  
            document.getElementById('profileUserName').innerHTML = username;
            document.getElementById("rankPlayerName").innerText = username;
            document.getElementById("casualPlayerName").innerText = username;
            document.getElementById("changeUserName").value = "";
            alert("Change Username Success!")
        }
    })

    // Emit New Password
    $("#passwordChange").click(function(){
        let newPassword = document.getElementById("changePassword").value;
        let confirmPassword = document.getElementById("changePasswordConfirm").value;
        let oldPassword = document.getElementById("oldPassword").value;
        if (newPassword != confirmPassword) {
            alert("Password and Confirm Password not identical");
        }
        else {
            socket.emit('changePassword', {username : username, password : newPassword, oldPassword : oldPassword});
        }
    })

    // Receive change password confirmation
    socket.on('changePasswordConfirm', function(){
        document.getElementById("changePassword").value = "";
        document.getElementById("changePasswordConfirm").value = "";
        alert("Password Change Success");
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
        length = 0;
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
            if (data.leaderboardNames.length > 10) {
                length = 10;
            }
            else {
                length = data.leaderboardNames.length;
            }
            for (let x = 0; x < length; x++) {
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
    // =================================== Admin Controls ===================================
    function adminQuery(name, type, status) {
        socket.emit('adminQuery', {name : name, type : type, status : status});
    }
    $("#adminButton").click(function(){
        socket.emit('retrieveAdmin', {username : username});
        show('adminControls', 'chatRoom');
    });

    $("#adminShow").click(function(){
        socket.emit('retrieveAdmin');
    });
    socket.on('adminData', (data) => {
        if (data.username == username) {
            let counter = 0;
            let table = document.getElementById("adminTable");
            table.innerHTML = "";
            table.style["verticalAlign"] = "middle";
            table.style["overflow-x"] = "auto"; 
            let headerName = document.createElement("TH");
            let headerIsAdmin = document.createElement("TH");
            let headerAdminStatus = document.createElement("TH");
            let headerIsBanned = document.createElement("TH");
            let headerBannedStatus = document.createElement("TH");
            let row = table.insertRow(counter);

            headerName.innerHTML = "Name";
            headerName.style['border'] = "5px solid black";
            headerName.style['width'] = "20%";
            headerIsAdmin.innerHTML = "isAdmin";
            headerIsAdmin.style['border'] = "5px solid black";
            headerIsAdmin.style['width'] = "20%";
            headerAdminStatus.innerHTML = "Status";
            headerAdminStatus.style['border'] = "5px solid black";
            headerAdminStatus.style['width'] = "20%";
            headerIsBanned.innerHTML = "isBanned";
            headerIsBanned.style['border'] = "5px solid black";
            headerIsBanned.style['width'] = "20%";
            headerBannedStatus.innerHTML = "Status";
            headerBannedStatus.style['border'] = "5px solid black";
            headerBannedStatus.style['width'] = "20%";
            row.appendChild(headerName);
            row.appendChild(headerIsAdmin);
            row.appendChild(headerAdminStatus);
            row.appendChild(headerIsBanned);
            row.appendChild(headerBannedStatus);
            counter += 1;

            // while (counter < 1000) {
            //     row = table.insertRow(counter);
            //     let cell1 = row.insertCell(0);
            //     cell1.innerHTML = "Raphael Gwapo";
            //     counter += 1;
            // }

            for (let x = 0; x < data.result.length; x++) {
                row = table.insertRow(counter);
                let cellName = row.insertCell(0);
                let cellIsAdmin = row.insertCell(1);
                let cellIsAdminStatus = row.insertCell(2);
                let cellIsBanned = row.insertCell(3);
                let cellIsBannedStatus = row.insertCell(4);

                let adminButton = document.createElement("Button");
                adminButton.addEventListener('click', function() { 
                    socket.emit('adminQuery', {name : data.result[x].username, type : "isAdmin", status : data.result[x].isAdmin}); 
                }, false);                                
                let banButton = document.createElement("Button");
                banButton.addEventListener('click', function() { 
                    socket.emit('adminQuery', {name : data.result[x].username, type : "isBanned", status : data.result[x].isBanned}); 
                }, false);   

                if (data.result[x].isAdmin == "true") {
                    adminButton.appendChild(document.createTextNode("Remove Admin"));
                    cellIsAdminStatus.innerHTML = "Admin";
                }
                else if (data.result[x].isAdmin == "false") {
                    adminButton.appendChild(document.createTextNode("Make Admin"));
                    cellIsAdminStatus.innerHTML = "non-Admin";
                }
                if (data.result[x].isBanned == "true") {
                    banButton.appendChild(document.createTextNode("Unban User"));
                    cellIsBannedStatus.innerHTML = "Banned";
                }
                else if (data.result[x].isBanned == "false") {
                    banButton.appendChild(document.createTextNode("Ban User"));
                    cellIsBannedStatus.innerHTML = "Not Banned";
                }
                cellName.innerHTML = data.result[x].username;
                cellIsAdmin.appendChild(adminButton);                
                cellIsBanned.appendChild(banButton);                
            }
        }
    });

    $("#adminControlsMainMenu").click(function(){
        show('chatRoom', 'adminControls');
    });

    // =================================== Profile ===================================
    let profileButton = $("#profileButton");
    let profileMainMenu = $("#profileMainMenu");

    // Go to Profile Page
    profileButton.click(function(){
        socket.emit('profile');    
    });

    // Profile Confirmation
    socket.on('profileConfirm', (data) => {
        document.getElementById('profileUserName').innerHTML = data.result[0].username;
        document.getElementById('profileGames').innerHTML = ((data.result[0].userWin) + (data.result[0].userLose));
        document.getElementById('profileElo').innerHTML = data.result[0].userElo;
        document.getElementById('profileWin').innerHTML = data.result[0].userWin;
        document.getElementById('profileLose').innerHTML = data.result[0].userLose;
        document.getElementById('profileCharge').innerHTML = data.result[0].timesUsedCharge;
        document.getElementById('profilePistol').innerHTML = data.result[0].timesUsedPistol;
        document.getElementById('profileShield1').innerHTML = data.result[0].timesUsedShield1;
        document.getElementById('profileCounter').innerHTML = data.result[0].timesUsedCounter;
        document.getElementById('profileEvade').innerHTML = data.result[0].timesUsedEvade;
        document.getElementById('profileBlock').innerHTML = data.result[0].timesUsedBlock;
        document.getElementById('profileDoublePistol').innerHTML = data.result[0].timesUsedDoublePistol;
        document.getElementById('profileGrenade').innerHTML = data.result[0].timesUsedGrenade;
        document.getElementById('profileShotgun').innerHTML = data.result[0].timesUsedShotgun;
        document.getElementById('profileShield2').innerHTML = data.result[0].timesUsedShield2;
        document.getElementById('profileLaser').innerHTML = data.result[0].timesUsedLaser;
        document.getElementById('profileShield3').innerHTML = data.result[0].timesUsedShield3;
        document.getElementById('profileNuke').innerHTML = data.result[0].timesUsedNuke;
        document.getElementById("profilePicture").src = 'profileImages/' + data.result[0].userID + '.png';
        show('profile', 'chatRoom');
    })

    socket.on('profileChange', function(data) {
        $("#profilePicture").attr("src", "data:image/png;base64," + b64(data.buffer));
    })
    function b64(e){var t="";var n=new Uint8Array(e);var r=n.byteLength;for(var i=0;i<r;i++){t+=String.fromCharCode(n[i])}return window.btoa(t)}

    // Go back to main menu
    profileMainMenu.click(function(){
        show('chatRoom', 'profile');
    })
});