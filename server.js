// $ npm run start
// link https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088
// lt --port 3000
// ssh -R 80:localhost:8080 ssh.localhost.run

function getCurrentTime() {
    let today = new Date();
    let date = today.getFullYear() +'-'+ (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

// Storage for Connected Users and other data
let connectedUsers = [];
let rankQueue = [];
let casualQueue = [];

// Player Data Storage
let inGame = []; // Stringa
let lobbyOfPlayers = []; // String
let chargesOfPlayers = []; // Int
let actionsOfPlayers = []; // String
let statusOfPlayers = []; // Boolean
let modeOfPlayers = []; // String

// Game Conditions
let canBeatCharge = ["pistol", "doublepistol", "grenade", "shotgun", "laser", "nuke"];
let canBeatCounter = ["pistol", "doublepistol", "grenade", "shotgun", "laser", "nuke"];
let canBeatEvade = ["doublepistol", "laser", "nuke"];
let canBeatBlock = ["grenade", "laser", "nuke"];
let canBeatPistol = ["doublepistol", "grenade", "shotgun", "laser", "nuke", "shield1", "shield2", "shield3"];
let canBeatDoublePistol = ["laser", "nuke", "shield1", "shield2", "shield3"];
let canBeatShotgun = ["laser", "nuke", "shield2", "shield3"];
let canBeatGrenade = ["laser", "nuke", "shield1", "shield2", "shield3"];
let canBeatLaser = ["nuke", "shield2", "shield3"];
let canBeatNuke = ["shield3"];
let canBeatShield1 = ["counter", "shotgun", "laser", "nuke"];
let canBeatShield2 = ["counter", "nuke"];
let canBeatShield3 = ["counter"];

// Require Changelog
let fs = require('fs');
let fsExtra = require("fs-extra");

try {
    // Connecting and Checking SQL server
    let mysql = require('mysql');
    
    let create = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
    });

    create.connect(function(err){
        if (err) throw err;
        console.log("UPDATE: Established Connection to SQL");        
        try {
            create.query("CREATE DATABASE db_guns1v1", function(err, result){
                // if (err) throw err;
                console.log("UPDATE: Database db_guns1v1 existing");
            });    
        } catch (error) {
            console.log("ERROR: Database db_guns1v1 already exists or creationg error (sql server not online)");
        }        
    })

    let conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "db_guns1v1"
    });

    conn.connect(function(err){
        // if (err) throw err;
        console.log("UPDATE: Established Connection to SQL");        
        try {
            let createTable = "CREATE TABLE tbl_userData (userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), userEmail VARCHAR(255), userElo int, userWin int, userLose int, timesUsedCharge int, timesUsedPistol int, timesUsedShield1 int, timesUsedCounter int, timesUsedEvade int, timesUsedBlock int, timesUsedDoublePistol int, timesUsedGrenade int, timesUsedShotgun int, timesUsedShield2 int, timesUsedLaser int, timesUsedShield3 int, timesUsedNuke int, isAdmin VARCHAR(255), isBanned VARCHAR(255));";
            conn.query(createTable, function(err, result){
                // if (err) throw err;
                console.log("UPDATE: tbl_userData created");
            })
        } catch (error) {
            console.log("ERROR: Table already exists or error in creating table");
        }        
    })

    // Operating Server and requirements
    const express = require('express');    
    
    // Image handling
    const siofu = require("socketio-file-upload");
    const app = express().use(siofu.router);


    app.set('view engine', 'ejs');
    app.use('/', express.static(__dirname + '/public'));

    // Routes
    app.get('*', (req, res) => {
        res.render('index');        
    })

    server = app.listen(8080);

    // socket.io instantiation
    const io = require("socket.io")(server);

    // Encryption Instantiation
    let crypto = require("simple-crypto-js").default;
    let _secretkey = "guns1v1";
    let simpleCrypto = new crypto(_secretkey);

    // listen to every connection
    io.on('connection', (socket) => {
        // ================================= Functions ==================================
        function updateCount() {
            io.sockets.emit('countData', {playerCount : connectedUsers.length, ingameCount : inGame.length, rankQueueCount : rankQueue.length, casualQueueCount : casualQueue.length});
        }
        function consoleUpdate() {
            console.log('(' + getCurrentTime() + ') UPDATE: Connected Users (' + connectedUsers.length + '): ' + connectedUsers);
        }
        function removePlayer(name){
            let index = inGame.indexOf(name);
            inGame.splice(index, 1);
            lobbyOfPlayers.splice(index, 1);
            chargesOfPlayers.splice(index, 1);
            actionsOfPlayers.splice(index, 1);
            statusOfPlayers.splice(index, 1);
            modeOfPlayers.splice(index, 1);
            socket.ingameStatus = false;
            console.log("FROM REMOVE FUNCTION");
            console.log(inGame);
            updateCount();
        }
        // =============================== Uploading Files ================================
        let uploader = new siofu();
        uploader.dir = __dirname + "/public/profileImages";
        uploader.listen(socket);
        let ID;
        uploader.on("saved", function(event){            
            conn.query("SELECT userID FROM tbl_userdata WHERE username = '" + socket.username + "';", function(err, result, fields){
                ID = result[0].userID;
                let file = event.file.pathName.split('\\').pop().split('/').pop();
                let lastIndex = file.lastIndexOf(".");
                fs.renameSync(event.file.pathName, __dirname +'/public/profileImages/' + result[0].userID + '.' + file.substr(lastIndex + 1));
                fs.readFile(__dirname +'/public/profileImages/' + ID + '.' + file.substr(lastIndex + 1), function(err, data){
                    socket.emit('profileChange', {image : true, buffer : data});
                    // socket.emit('profileChange', {username : socket.username, userID : result[0].userID});
                })                 
            });            
        })

        // =============================== New Connection ================================
        // Load Changelog
        let changelogContents = fs.readFileSync('changelog.txt', 'utf8');

        // Default Username
        socket.username = "Anonymous";        

        // New Connection Update      
        consoleUpdate();
        updateCount();
        

        // ============================ Queuing and Lobbying ============================
        // Queue Game Logic
        socket.rankQueueStatus = false;
        socket.casualQueueStatus = false;
        socket.ingameStatus = false;
        socket.enemy = "";

        // Rank Queue
        socket.on('rankQueue', function(){
            let queueWarning = "";
            if (!socket.rankQueueStatus && !socket.casualQueueStatus) {
                rankQueue.push(socket.username);
                console.log('\n(' + getCurrentTime() + ') UPDATE: ' + socket.username + ' queued for a rank match');
                console.log('(' + getCurrentTime() + ') UPDATE: Rank Queued Player: ' + rankQueue);
                socket.rankQueueStatus = true;
                if (rankQueue.length > 1) {                    
                    socket.enemy = rankQueue.shift();
                    rankQueue.splice(rankQueue.indexOf(socket.username), 1);                                       
                    let players = [socket.username, socket.enemy];
                    let lobbyName = "(Rank) " + socket.username + " vs " + socket.enemy;
                    
                    // Initializing Data of the Two Players. Storing them in Arrays
                    inGame.push(socket.username); inGame.push(socket.enemy); 
                    lobbyOfPlayers.push(lobbyName); lobbyOfPlayers.push(lobbyName);
                    chargesOfPlayers.push(0); chargesOfPlayers.push(0);
                    actionsOfPlayers.push(""); actionsOfPlayers.push("");
                    statusOfPlayers.push(false); statusOfPlayers.push(false);
                    modeOfPlayers.push("Rank"); modeOfPlayers.push("Rank");
                    io.sockets.emit('rankQueueFound', {players : players, lobbyName : lobbyName});
                    console.log('\n(' + getCurrentTime() + ') UPDATE: Rank Match has started. ' + socket.username + ' vs ' + socket.enemy);
                    console.log(lobbyOfPlayers);
                    console.log(chargesOfPlayers);
                }
            }
            else if (socket.casualQueueStatus) {
                queueWarning = "Already queuing for a Casual Match!";
            }
            else {                              
                rankQueue.splice(rankQueue.indexOf(socket.username), 1);  
                socket.rankQueueStatus = false;
                queueWarning = "Unqueued from Rank Matchmaking!";
                console.log('\n(' + getCurrentTime() + ') UPDATE ' + socket.username + ' unqueued for a rank match');
                console.log('(' + getCurrentTime() + ') UPDATE Rank Queued Player: ' + rankQueue);
            }
            socket.emit('rankQueueConfirmation', {queueWarning : queueWarning});
            updateCount();
        });

        // Rank Join Lobby
        socket.on('rankQueueConfirm', (data) => {
            if (data.players.includes(socket.username)) {
                socket.rankQueueStatus = false;
                rankQueue.splice(rankQueue.indexOf(socket.username), 1);
                socket.ingameStatus = true;
                socket.join(data.lobbyName);
                socket.emit('rankJoin', {players : data.players, lobbyName : data.lobbyName});
            }
        });        

        // Rank Disconnect
        socket.on('rankDisconnect', (data) => {
            let index = inGame.indexOf(socket.username);
            if (data.username == socket.username && lobbyOfPlayers[index] == data.lobbyName) {  
                let winQuery = "UPDATE tbl_userdata SET userWin = userWin + 1, userElo = userElo + 25 WHERE username = '" + data.enemy + "';" ;
                let loseQuery = "UPDATE tbl_userdata SET userLose = userLose + 1, userElo = userElo - 25 WHERE username = '" + data.username + "';" ;   
                let newEloLoser;
                let newEloWinner;
                conn.query(winQuery);
                conn.query(loseQuery);  
                conn.query("SELECT userElo FROM tbl_userdata WHERE username = '" + data.enemy + "';", function(err, result, fields){
                    newEloWinner = result[0].userElo;
                });    
                conn.query("SELECT userElo FROM tbl_userdata WHERE username = '" + socket.username + "';", function(err, result, fields){
                    newEloLoser = result[0].userElo;
                    removePlayer(socket.username);                         
                    io.to(data.lobbyName).emit('rankDisconnectConfirm', {userWinner : data.enemy, userLoser : data.username, lobbyName : data.lobbyName, userEloLoser : newEloLoser, userEloWinner : newEloWinner});
                    socket.leave(data.lobbyName);
                });                
            }
            updateCount();          
        });

        // Rank Finish Game
        socket.on('rankGameFinish', (data) => {
            socket.leave(data.lobbyName);
        });

        // Rank Remove Other Players
        socket.on('rankRemoveMe', (data) => {
            if (inGame.includes(data.username)) {
                removePlayer(data.username);
            }
            console.log("FROM REMOVE");
            console.log(inGame)
            console.log(chargesOfPlayers);
            updateCount();
        });

        // Casual Queue
        socket.on('casualQueue', function(){
            let queueCasualWarning = "";
            if (!socket.rankQueueStatus && !socket.casualQueueStatus) {
                casualQueue.push(socket.username);
                console.log('\n(' + getCurrentTime() + ') UPDATE: ' + socket.username + ' queued for a casual match');
                console.log('(' + getCurrentTime() + ') UPDATE: Casual Queued Player: ' + casualQueue);
                socket.casualQueueStatus = true;
                if (casualQueue.length > 1) {                    
                    socket.enemy = casualQueue.shift();
                    casualQueue.splice(casualQueue.indexOf(socket.username), 1);
                    let players = [socket.username, socket.enemy];
                    let lobbyName = "(Casual) " + socket.username + " vs " + socket.enemy;

                    // Initializing Data of the Two Players. Storing them in Arrays
                    inGame.push(socket.username); inGame.push(socket.enemy); 
                    lobbyOfPlayers.push(lobbyName); lobbyOfPlayers.push(lobbyName);
                    chargesOfPlayers.push(0); chargesOfPlayers.push(0);
                    actionsOfPlayers.push(""); actionsOfPlayers.push("");
                    statusOfPlayers.push(false); statusOfPlayers.push(false);
                    modeOfPlayers.push("Casual"); modeOfPlayers.push("Casual");
                    io.sockets.emit('casualQueueFound', {players : players, lobbyName : lobbyName});
                    console.log('\n(' + getCurrentTime() + ') UPDATE: Casual Match has started. ' + socket.username + ' vs ' + socket.enemy);
                }
            }
            else if (socket.rankQueueStatus) {
                queueCasualWarning = "Already queuing for a Rank Match!";
            }
            else {                
                casualQueue.splice(casualQueue.indexOf(socket.username), 1);
                socket.casualQueueStatus = false;
                queueCasualWarning = "Unqueued from Rank Matchmaking!";
                console.log('\n(' + getCurrentTime() + ') UPDATE ' + socket.username + ' unqueued for a casual match');
                console.log('(' + getCurrentTime() + ') UPDATE: Casual Queued Player: ' + casualQueue);
            }
            socket.emit('casualQueueConfirmation', {queueWarning : queueCasualWarning});
            updateCount();
        });

        // Casual Join Lobby
        socket.on('casualQueueConfirm', (data) => {
            if (data.players.includes(socket.username)) {
                socket.casualQueueStatus = false;
                casualQueue.splice(casualQueue.indexOf(socket.username), 1);
                socket.ingameStatus = true;
                socket.join(data.lobbyName);
                socket.emit('casualJoin', {players : data.players, lobbyName : data.lobbyName});
            }
        });

        // Casual Disconnect
        socket.on('casualDisconnect', (data) => {
            let index = inGame.indexOf(socket.username);
            if (data.username == socket.username && lobbyOfPlayers[index] == data.lobbyName) {   
                removePlayer(socket.username);                         
                io.to(data.lobbyName).emit('casualDisconnectConfirm', {lobbyName : data.lobbyName});
                socket.leave(data.lobbyName);
            }
            updateCount();          
        });

        // Casual Finish Game
        socket.on('casualGameFinish', (data) => {
            socket.leave(data.lobbyName);
        });

        // Casual Remove Other Players
        socket.on('casualRemoveMe', (data) => {
            if (inGame.includes(data.username)) {
                removePlayer(data.username);
            }
            updateCount();
        });

        // ================================= Game Logic ==================================
        // Ingame Logic                
        // Check Action and Deduct Charges
        function checkAction(charges, action) {
            let index = inGame.indexOf(socket.username);
            let actionStatus = false;
            let chargeFree = ["evade", "block"];
            let charge1 = ["pistol", "counter", "shield1"];
            let charge2 = ["doublepistol", "grenade", "shotgun", "shield2"];
            let charge3 = ["laser", "shield3"];
            let charge4 = ["nuke"];
            let deduction = 0;
            if (action == "charge") {
                actionStatus = true;
                chargesOfPlayers[index] += 1;                
            }
            else if (charge1.includes(action) && charges >= 1) {
                actionStatus = true;
                deduction = 1;
            }
            else if (charge2.includes(action) && charges >= 2) {
                actionStatus = true;
                deduction = 2;
            }
            else if (charge3.includes(action) && charges >= 3) {
                actionStatus = true;
                deduction = 3;
            }
            else if (charge4.includes(action) && charges >= 4) {
                actionStatus = true;
                deduction = 4;
            }
            else if (chargeFree.includes(action)) {
                actionStatus = true;
                deduction = 0;
            }
            if (actionStatus) {
                chargesOfPlayers[index] -= deduction;
            }
            if (modeOfPlayers[index] == "Rank") {
                let statTrack = "UPDATE tbl_userdata SET timesUsedCharge = timesUsedCharge + 1 WHERE username = '" + inGame[index] + "';" ;   
                if (action == "pistol") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedPistol = timesUsedPistol + 1 WHERE username = '" + inGame[index] + "';" ;   
                } 
                else if (action == "counter") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedCounter = timesUsedCounter + 1 WHERE username = '" + inGame[index] + "';" ;                       
                }   
                else if (action == "shield1") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedShield1 = timesUsedShield1 + 1 WHERE username = '" + inGame[index] + "';" ;                       
                }
                else if (action == "evade") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedEvade = timesUsedEvade + 1 WHERE username = '" + inGame[index] + "';" ;                       
                }
                else if (action == "block") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedBlock = timesUsedBlock + 1 WHERE username = '" + inGame[index] + "';" ;                       
                }
                else if (action == "doublepistol") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedDoublePistol = timesUsedDoublePistol + 1 WHERE username = '" + inGame[index] + "';" ;                       
                }
                else if (action == "grenade") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedGrenade = timesUsedGrenade + 1 WHERE username = '" + inGame[index] + "';" ;                       
                }
                else if (action == "shotgun") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedShotgun = timesUsedShotgun + 1 WHERE username = '" + inGame[index] + "';" ;                       
                }
                else if (action == "shield2") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedShield2 = timesUsedShield2 + 1 WHERE username = '" + inGame[index] + "';" ;                       
                }
                else if (action == "laser") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedLaser = timesUsedLaser + 1 WHERE username = '" + inGame[index] + "';" ;                       
                }
                else if (action == "shield3") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedShield3 = timesUsedShield3 + 1 WHERE username = '" + inGame[index] + "';" ;                       
                }
                else if (action == "nuke") {
                    statTrack = "UPDATE tbl_userdata SET timesUsedNuke= timesUsedNuke + 1 WHERE username = '" + inGame[index] + "';" ;                       
                }
                conn.query(statTrack);
            }
            return actionStatus;
        }
        function checkConditions(player1Action, player2Action) {
            let conditions = [false, false];
            // Win and Lose Conditions
            // Charge
            if (player1Action == "charge" && canBeatCharge.includes(player2Action)){
                conditions[1] = true;
            }
            else if (player2Action == "charge" && canBeatCharge.includes(player1Action)) {
                conditions[0] = true;
            }
            // Counter
            else if (player1Action == "counter" && canBeatCounter.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "counter" && canBeatCounter.includes(player1Action)) {
                conditions[0] = true;
            }
            // Evade
            else if (player1Action == "evade" && canBeatEvade.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "evade" && canBeatEvade.includes(player1Action)) {
                conditions[0] = true;
            }
            // Block
            else if (player1Action == "block" && canBeatBlock.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "block" && canBeatBlock.includes(player1Action)) {
                conditions[0] = true;
            }
            //Pistol
            else if (player1Action == "pistol" && canBeatPistol.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "pistol" && canBeatPistol.includes(player1Action)) {
                conditions[0] = true;
            }
            // Double Pistol
            else if (player1Action == "doublepistol" && canBeatDoublePistol.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "doublepistol" && canBeatDoublePistol.includes(player1Action)) {
                conditions[0] = true;
            }
            // Shotgun
            else if (player1Action == "shotgun" && canBeatShotgun.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "shotgun" && canBeatShotgun.includes(player1Action)) {
                conditions[0] = true;
            }
            // Grenade
            else if (player1Action == "grenade" && canBeatGrenade.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "grenade" && canBeatGrenade.includes(player1Action)) {
                conditions[0] = true;
            }
            // Laser
            else if (player1Action == "laser" && canBeatLaser.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "laser" && canBeatLaser.includes(player1Action)) {
                conditions[0] = true;
            }
            // Nuke
            else if (player1Action == "nuke" && canBeatNuke.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "nuke" && canBeatNuke.includes(player1Action)) {
                conditions[0] = true;
            }
            // Shield 1
            else if (player1Action == "shield1" && canBeatShield1.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "shield1" && canBeatShield1.includes(player1Action)) {
                conditions[0] = true;
            }
            // Shield 2
            else if (player1Action == "shield2" && canBeatShield2.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "shield2" && canBeatShield2.includes(player1Action)) {
                conditions[0] = true;
            }
            // Shield 3
            else if (player1Action == "shield3" && canBeatShield3.includes(player2Action)) {
                conditions[1] = true;
            }
            else if (player2Action == "shield3" && canBeatShield3.includes(player1Action)) {
                conditions[0] = true;
            }
            return conditions;
        }

        // Receiving Rank Data from Players
        socket.on('rankAction', (data) => {
            let index = inGame.indexOf(socket.username);
            let enemyIndex;
            if (data.lobbyName == lobbyOfPlayers[index]) {
                let index = inGame.indexOf(socket.username);
                let enemyStatus = false;
                console.log(statusOfPlayers);
                if (data.username == socket.username && !statusOfPlayers[index]) {
                    actionsOfPlayers[index] = data.rankChosen;
                    // check charge if action is correct and send error note
                    let playerConfirmation = checkAction(chargesOfPlayers[index], data.rankChosen);
                    if (playerConfirmation) {
                        statusOfPlayers[index] = true;   
                        console.log("action accepted");                        
                    }                    
                    else if (!playerConfirmation) {
                        // emit error. expound. exact error needed
                        console.log("action not accepted");
                        socket.emit('rankErrorChosen');
                    }
                    if (index % 2 == 0) {
                        enemyStatus = statusOfPlayers[index + 1];
                        enemyIndex = index + 1;
                    }
                    else if (index % 2 != 0) {
                        enemyStatus = statusOfPlayers[index - 1];
                        enemyIndex = index - 1;
                    }
                    if ((!enemyStatus && statusOfPlayers[index]) || (enemyStatus && !statusOfPlayers[index])) {
                        io.to(data.lobbyName).emit('rankDataAccepted', {username : data.username});
                    }
                    if (statusOfPlayers[index] && enemyStatus) {                      

                        // Logic results for game
                        let player1Action = actionsOfPlayers[index]; 
                        let player2Action = actionsOfPlayers[enemyIndex];
                        let conditionResults = checkConditions(player1Action, player2Action);                        

                        // Transmitting back to the players
                        let player1 = [inGame[index], chargesOfPlayers[index], conditionResults[0], actionsOfPlayers[index]];
                        let player2 = [inGame[enemyIndex], chargesOfPlayers[enemyIndex], conditionResults[1], actionsOfPlayers[enemyIndex]];
                        io.to(data.lobbyName).emit('rankGameData', {player1 : player1, player2 : player2});
                        statusOfPlayers[index] = false;
                        statusOfPlayers[enemyIndex] = false;

                        if (conditionResults[0]) {
                            let winQuery = "UPDATE tbl_userdata SET userWin = userWin + 1, userElo = userElo + 25 WHERE username = '" + inGame[index] + "';" ;
                            let loseQuery = "UPDATE tbl_userdata SET userLose = userLose + 1, userElo = userElo - 25 WHERE username = '" + inGame[enemyIndex] + "';" ;   
                            conn.query(winQuery);
                            conn.query(loseQuery);  
                            socket.emit('updateElo', {username : inGame[index], value : 25});
                            socket.emit('updateElo', {username : inGame[enemyIndex], value : -25});
                            removePlayer(inGame[index]); 
                            removePlayer(inGame[enemyIndex]); 
                        }
                        else if (conditionResults[1]) {
                            let winQuery = "UPDATE tbl_userdata SET userWin = userWin + 1, userElo = userElo + 25 WHERE username = '" + inGame[enemyIndex] + "';" ;
                            let loseQuery = "UPDATE tbl_userdata SET userLose = userLose + 1, userElo = userElo - 25 WHERE username = '" + inGame[index] + "';" ;   
                            conn.query(winQuery);
                            conn.query(loseQuery); 
                            socket.emit('updateElo', {username : inGame[enemyIndex], value : 25});
                            socket.emit('updateElo', {username : inGame[index], value : -25});
                            removePlayer(inGame[index]); 
                            removePlayer(inGame[enemyIndex]); 
                        }
                    }
                }                
            }
        });

        // Receiving Casual Data from Players
        socket.on('casualAction', (data) => {
            let index = inGame.indexOf(socket.username);
            let enemyIndex;
            if (data.lobbyName == lobbyOfPlayers[index]) {
                let index = inGame.indexOf(socket.username);
                let enemyStatus = false;
                console.log(statusOfPlayers);
                if (data.username == socket.username && !statusOfPlayers[index]) {
                    actionsOfPlayers[index] = data.casualChosen;
                    // check charge if action is correct and send error note
                    let playerConfirmation = checkAction(chargesOfPlayers[index], data.casualChosen);
                    if (playerConfirmation) {
                        statusOfPlayers[index] = true;   
                        console.log("action accepted");                        
                    }                    
                    else if (!playerConfirmation) {
                        // emit error. expound. exact error needed
                        console.log("action not accepted");
                        socket.emit('rankErrorChosen');
                    }
                    if (index % 2 == 0) {
                        enemyStatus = statusOfPlayers[index + 1];
                        enemyIndex = index + 1;
                    }
                    else if (index % 2 != 0) {
                        enemyStatus = statusOfPlayers[index - 1];
                        enemyIndex = index - 1;
                    }
                    if ((!enemyStatus && statusOfPlayers[index]) || (enemyStatus && !statusOfPlayers[index])) {
                        io.to(data.lobbyName).emit('casualDataAccepted', {username : data.username});
                    }
                    if (statusOfPlayers[index] && enemyStatus) {                      

                        // Logic results for game
                        let player1Action = actionsOfPlayers[index]; 
                        let player2Action = actionsOfPlayers[enemyIndex];
                        let conditionResults = checkConditions(player1Action, player2Action);

                        // Transmitting back to the players
                        let player1 = [inGame[index], chargesOfPlayers[index], conditionResults[0], actionsOfPlayers[index]];
                        let player2 = [inGame[enemyIndex], chargesOfPlayers[enemyIndex], conditionResults[1], actionsOfPlayers[enemyIndex]];
                        io.to(data.lobbyName).emit('casualGameData', {player1 : player1, player2 : player2});
                        statusOfPlayers[index] = false;
                        statusOfPlayers[enemyIndex] = false;

                        if (conditionResults[0]) { 
                            removePlayer(inGame[index]); 
                            removePlayer(inGame[enemyIndex]); 
                        }
                        else if (conditionResults[1]) {     
                            removePlayer(inGame[index]); 
                            removePlayer(inGame[enemyIndex]); 
                        }
                    }
                }                
            }
        });

        // ============================== Client Disconnect ==============================
        // Disconnect
        socket.on('disconnect', function() {
            if (connectedUsers.includes(socket.username)) {
                connectedUsers.splice(connectedUsers.indexOf(socket.username), 1);
                console.log('\n(' + getCurrentTime() + ')' + " UPDATE: User " + socket.username + " disconnected!");
            }            
            consoleUpdate();
            if (rankQueue.includes(socket.username)) {
                rankQueue.splice(rankQueue.indexOf(socket.username), 1);
                console.log('\n(' + getCurrentTime() + ') UPDATE: ' + socket.username + ' unqueued in a rank match for disconnecting');
                console.log('(' + getCurrentTime() + ') UPDATE: Rank Queued Players: ' + rankQueue);
            }
            if (casualQueue.includes(socket.username)) {
                casualQueue.splice(casualQueue.indexOf(socket.username), 1);                
                console.log('\n(' + getCurrentTime() + ') UPDATE: ' + socket.username + ' unqueued in a casual match for disconnecting');
                console.log('(' + getCurrentTime() + ') UPDATE: Casual Queued Players: ' + casualQueue);
            }
            if (socket.ingameStatus) {
                // add logic if player was ingame (increment 1 lose)
            }
            if (inGame.includes(socket.username)) {
                removePlayer(socket.username);
            }
            socket.rankQueueStatus = false;
            socket.casualQueueStatus = false;
            socket.ingameStatus = false;
            updateCount();
        })  

        // =================================== Signup ===================================
        // Sign up user
        socket.on('signUp', (data)=> {
            let signUpWarning = "";
            let checkSystem = true;
            let statusSignUp = false;            
            
            // Checking data if a duplicate exists
            conn.query("SELECT * FROM tbl_userData", function(err, result, fields){
                if (err) throw err;
                if (result.length == 0) {
                    statusSignUp = true;
                }
                else {
                    for (let x = 0; x < result.length; x++) {
                        if (checkSystem){
                            if (data.usernameSignUp == result[x].username) {
                                signUpWarning += "Username already in System\n";
                            }
                            if (data.useremailSignUp == result[x].userEmail) {
                                signUpWarning += "User Email already in System\n";
                            }
                            if (data.useremailSignUp == result[x].username) {
                                signUpWarning += "User Email already in System\n";
                            }
                            if (signUpWarning.length > 0) {
                                checkSystem = false;
                            }
                            else if (signUpWarning.length == 0) {
                                statusSignUp = true;
                            }                                              
                        }                    
                    } 
                }                                 
                // If data is unique and ready for registration on database
                if (statusSignUp) {
                    let encryptedPassword = simpleCrypto.encrypt(data.passwordSignUp);
                    let insertQuery = "INSERT INTO tbl_userData (username, password, userEmail, userElo, userWin, userLose, timesUsedCharge, timesUsedPistol, timesUsedShield1, timesUsedCounter, timesUsedEvade, timesUsedBlock, timesUsedDoublePistol, timesUsedGrenade, timesUsedShotgun, timesUsedShield2, timesUsedLaser, timesUsedShield3, timesUsedNuke, isAdmin, isBanned)";
                    let insertValuesQuery = " VALUES ('" + data.usernameSignUp + "', '" + encryptedPassword + "', '" + data.useremailSignUp + "', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'false', 'false')";
                    let fullQuery = insertQuery + insertValuesQuery;
                    conn.query(fullQuery, function(err, result){
                        if (err) throw err;
                        console.log("\n(" + getCurrentTime() + ") UPDATE: User " + data.usernameSignUp + " registered!");
                        statusSignUp = true;
                        conn.query("SELECT userID FROM tbl_userdata WHERE username = '" + data.usernameSignUp + "';", function(err, result, fields){
                            fs.copyFileSync(__dirname + '/public/textures/default.png', __dirname + '/public/profileImages/' + result[0].userID + ".png");
                        });
                        
                    });
                }          
                socket.emit('signUp', {statusSignUp : statusSignUp, signUpWarning : signUpWarning});        
            });                                             
        })
        
        // =================================== Login ===================================
        
        // Sign in user
        socket.on('signIn', (data)=> {            
            // Login Validation
            let signInStatus = false;
            let message = "User Account does not exist!";
            let userElo;
            conn.query("SELECT * FROM tbl_userData", function(err, result, fields) {
                for (let x = 0; x < result.length; x++) {
                    // console.log("test input name: " + data.usernameSignUp + "\nresult name: " + result[x].username);  
                    if (!signInStatus) {
                        if (data.usernameLogin == result[x].username) {
                            let decryptedPassword = simpleCrypto.decrypt(result[x].password);
                            if(data.passwordLogin == decryptedPassword) {
                                signInStatus = true;           
                                userElo = result[x].userElo;                     
                            }   
                        } 
                    }                                 
                }
                if (signInStatus) {
                    socket.username = data.usernameLogin;
                    if (connectedUsers.includes(socket.username)) {
                        signInStatus = false;
                        message = "User " + socket.username + " already logged in!"
                    }
                    else {
                        connectedUsers.push(socket.username);
                        console.log('\n(' + getCurrentTime() + ')' + " UPDATE: Successful Login of " + socket.username);
                    }                                                                                
                    consoleUpdate();                  
                }                
                socket.emit('signIn', {signInStatus : signInStatus, username : socket.username, changelogContents : changelogContents, message : message, userElo : userElo});
                updateCount();
            })            
        })
        
        // ============================== Change Username ==============================
        // Change username
        socket.on('changeUserName', (data) => {
            socket.username = data.username;            
        })
            
        // =============================== Chat Messages ===============================
        // listen on newMessage
        socket.on('newMessage', (data) => {
            //broadcast the new message
            io.sockets.emit('newMessage', {message : data.message, username : socket.username});
        })

        // =============================== Leaderboards ===============================
        socket.on('leaderboard', (data) => {
            let leaderboardNames = [];
            let leaderBoardData = [];
            let leaderboardStatus = false;
            let leaderboardQuery = "SELECT * FROM tbl_userdata WHERE " + data.type + " > 0 ORDER BY " + data.type + " DESC;";
            conn.query(leaderboardQuery, function(err, result, fields){
                for (let x = 0; x < result.length; x++) {
                    leaderboardNames.push(result[x].username);
                    if (data.type == "userElo") {
                        leaderBoardData.push(result[x].userElo);
                    } 
                    else if (data.type == "userWin") {
                        leaderBoardData.push(result[x].userWin);
                    }      
                    else if (data.type == "timesUsedCharge") {
                        leaderBoardData.push(result[x].timesUsedCharge);
                    } 
                    else if (data.type == "timesUsedPistol") {
                        leaderBoardData.push(result[x].timesUsedPistol);
                    }    
                    else if (data.type == "timesUsedCounter") {
                        leaderBoardData.push(result[x].timesUsedCounter);
                    }    
                    else if (data.type == "timesUsedShield1") {
                        leaderBoardData.push(result[x].timesUsedShield1);
                    }    
                    else if (data.type == "timesUsedEvade") {
                        leaderBoardData.push(result[x].timesUsedEvade);
                    } 
                    else if (data.type == "timesUsedBlock") {
                        leaderBoardData.push(result[x].timesUsedBlock);
                    } 
                    else if (data.type == "timesUsedDoublePistol") {
                        leaderBoardData.push(result[x].timesUsedDoublePistol);
                    } 
                    else if (data.type == "timesUsedGrenade") {
                        leaderBoardData.push(result[x].timesUsedGrenade);
                    }    
                    else if (data.type == "timesUsedShotgun") {
                        leaderBoardData.push(result[x].timesUsedShotgun);
                    } 
                    else if (data.type == "timesUsedShield2") {
                        leaderBoardData.push(result[x].timesUsedShield2);
                    }   
                    else if (data.type == "timesUsedLaser") {
                        leaderBoardData.push(result[x].timesUsedLaser);
                    }   
                    else if (data.type == "timesUsedShield3") {
                        leaderBoardData.push(result[x].timesUsedShield3);
                    }   
                    else if (data.type == "timesUsedNuke") {
                        leaderBoardData.push(result[x].timesUsedNuke);
                    }                         
                }
                if (leaderboardNames.length > 0) {
                    leaderboardStatus = true;
                }
                socket.emit("leaderboardSent", {leaderboardStatus : leaderboardStatus, leaderboardNames : leaderboardNames, leaderBoardData : leaderBoardData});
            });
                        
        })

        // =============================== Profile ===============================
        socket.on('profile', function(){
            let profileQuery = "SELECT userID, username, userElo, userWin, userLose, timesUsedCharge, timesUsedPistol, timesUsedShield1, timesUsedCounter, timesUsedEvade, timesUsedBlock, timesUsedDoublePistol, timesUsedGrenade, timesUsedShotgun, timesUsedShield2, timesUsedLaser, timesUsedShield3, timesUsedNuke FROM tbl_userdata WHERE username = '" + socket.username + "';";
            conn.query(profileQuery, function(err, result, fields){
                if (err) throw err;
                let profileSrc = __dirname + '/public/profileImages/';
                socket.emit('profileConfirm', {result : result, profileSrc : profileSrc});
            });
        }) 
    })
    console.log("Guns1v1 Server Online");

} catch (error) {
    console.log("Guns1v1 Server Failed to Launch");
}
