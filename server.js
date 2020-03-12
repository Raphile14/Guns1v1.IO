// $ npm run start
// link https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088

function getCurrentTime() {
    let today = new Date();
    let date = today.getFullYear() +'-'+ (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

// Storage for Connected Users
let connectedIP = [];
let connectedUsers = [];
let rankQueue = [];
let casualQueue = [];
let inGame = [];

// Require Changelog
let fs = require('fs');

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
            let createTable = "CREATE TABLE tbl_userData (userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), userEmail VARCHAR(255), userElo int, userWin int, userLose int, timesUsedCharge int, timesUsedPistol int, timesUsedShield1 int, timesUsedCounter int, timesUsedEvade int, timesUsedBlock int, timesUsedDoublePistol int, timesUsedGrenade int, timesUsedShotgun int, timesUsedShield2 int, timesUsedLaser int, timesUsedShield3 int, timesUsedNuke int);";
            conn.query(createTable, function(err, result){
                // if (err) throw err;
                console.log("UPDATE: tbl_userData created");
            })
        } catch (error) {
            console.log("ERROR: Table already exists or error in creating table");
        }        
    })

    // Operating Server
    const express = require('express');
    const app = express();

    app.set('view engine', 'ejs');
    app.use(express.static('public'));

    // Routes
    app.get('*', (req, res) => {
        res.render('index');        
    })

    server = app.listen(3000);

    // socket.io instantiation
    const io = require("socket.io")(server);

    // Encryption Instantiation
    let crypto = require("simple-crypto-js").default;
    let _secretkey = "guns1v1";
    let simpleCrypto = new crypto(_secretkey);

    // listen to every connection
    io.on('connection', (socket) => {

        // =============================== New Connection ================================
        // Load Changelog
        let changelogContents = fs.readFileSync('changelog.txt', 'utf8');

        // Connect Notification
        let address = socket.request.connection.remoteAddress;

        // Default Username
        socket.username = "Anonymous";        

        console.log('\n(' + getCurrentTime() + ') UPDATE: New Connection from ' + address);
        if (!connectedIP.includes(address)) {
            connectedIP.push(address);
            connectedUsers.push(socket.username);
        }        
        consoleUpdate();
        updateCount();

        // ================================= Functions ==================================
        function updateCount() {
            io.sockets.emit('countData', {playerCount : connectedUsers.length, ingameCount : inGame.length, rankQueueCount : rankQueue.length, casualQueueCount : casualQueue.length});
        }
        function consoleUpdate() {
            console.log('(' + getCurrentTime() + ') UPDATE: Connected Users: ' + connectedUsers);
            console.log('(' + getCurrentTime() + ') UPDATE: Connected IPs: ' + connectedIP);
        }

        // ================================= Queuing ==================================
        // Queue Game Logic
        socket.rankQueueStatus = false;
        socket.casualQueueStatus = false;

        // Rank Queue
        socket.on('rankQueue', function(){
            let queueWarning = "";
            if (!socket.rankQueueStatus && !socket.casualQueueStatus) {
                rankQueue.push(socket.username);
                console.log('\n(' + getCurrentTime() + ') UPDATE: ' + socket.username + ' queued for a rank match');
                console.log('(' + getCurrentTime() + ') UPDATE: Rank Queued Player: ' + rankQueue);
                socket.rankQueueStatus = true;
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

        // Casual Queue
        socket.on('casualQueue', function(){
            let queueCasualWarning = "";
            if (!socket.rankQueueStatus && !socket.casualQueueStatus) {
                casualQueue.push(socket.username);
                console.log('\n(' + getCurrentTime() + ') UPDATE: ' + socket.username + ' queued for a casual match');
                console.log('(' + getCurrentTime() + ') UPDATE: Casual Queued Player: ' + casualQueue);
                socket.casualQueueStatus = true;
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

        // ================================= Game Logic ==================================
        // Ingame Logic
        socket.ingameStatus = false;
        socket.enemy = "";
        socket.charges = 0;

        // Receiving Data from Players
        socket.on('gameData', function(){

        });

        // Sending Data to Players

        // ============================== Client Disconnect ==============================
        // Disconnect
        socket.on('disconnect', function() {
            for (let i = 0; i < connectedIP.length; i++) {
                if (connectedIP[i] == address) {
                    connectedIP.splice(i, 1);
                    connectedUsers.splice(i, 1);
                }
            }
            console.log('\n(' + getCurrentTime() + ')' + " UPDATE: User " + socket.username + " from " + address + " disconnected!");
            consoleUpdate();
            if (rankQueue.includes(socket.username)) {
                rankQueue.splice(rankQueue.indexOf(socket.username), 1);
                updateCount();
                console.log('\n(' + getCurrentTime() + ') UPDATE: ' + socket.username + ' unqueued in a rank match for disconnecting');
                console.log('(' + getCurrentTime() + ') UPDATE: Rank Queued Players: ' + rankQueue);
            }
            if (casualQueue.includes(socket.username)) {
                casualQueue.splice(casualQueue.indexOf(socket.username), 1);
                updateCount();
                console.log('\n(' + getCurrentTime() + ') UPDATE: ' + socket.username + ' unqueued in a casual match for disconnecting');
                console.log('(' + getCurrentTime() + ') UPDATE: Casual Queued Players: ' + casualQueue);
            }
            socket.rankQueueStatus = false;
            socket.casualQueueStatus = false;
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
                    let insertQuery = "INSERT INTO tbl_userData (username, password, userEmail, userElo, userWin, userLose, timesUsedCharge, timesUsedPistol, timesUsedShield1, timesUsedCounter, timesUsedEvade, timesUsedBlock, timesUsedDoublePistol, timesUsedGrenade, timesUsedShotgun, timesUsedShield2, timesUsedLaser, timesUsedShield3, timesUsedNuke)";
                    let insertValuesQuery = " VALUES ('" + data.usernameSignUp + "', '" + encryptedPassword + "', '" + data.useremailSignUp + "', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')";
                    let fullQuery = insertQuery + insertValuesQuery;
                    conn.query(fullQuery, function(err, result){
                        if (err) throw err;
                        console.log("\n(" + getCurrentTime() + ") UPDATE: User " + data.usernameSignUp + " registered!");
                        statusSignUp = true;
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
            let message = "";
            conn.query("SELECT * FROM tbl_userData", function(err, result, fields) {
                for (let x = 0; x < result.length; x++) {
                    // console.log("test input name: " + data.usernameSignUp + "\nresult name: " + result[x].username);  
                    if (!signInStatus) {
                        if (data.usernameLogin == result[x].username) {
                            let decryptedPassword = simpleCrypto.decrypt(result[x].password);
                            if(data.passwordLogin == decryptedPassword) {
                                signInStatus = true;
                            }   
                        } 
                    }                                 
                }
                if (signInStatus) {
                    // add check if log in
                    // console.log("THE USER NAME IS " + data.usernameLogin);
                    socket.username = data.usernameLogin;
                    let index = connectedIP.indexOf(address);
                    connectedUsers[index] = socket.username;
                    console.log('\n(' + getCurrentTime() + ')' + " UPDATE: Successful Login of " + socket.username);
                    consoleUpdate();                  
                }                
                socket.emit('signIn', {signInStatus : signInStatus, username : socket.username, changelogContents : changelogContents});
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
            let profileQuery = "SELECT username, userElo, userWin, userLose, timesUsedCharge, timesUsedPistol, timesUsedShield1, timesUsedCounter, timesUsedEvade, timesUsedBlock, timesUsedDoublePistol, timesUsedGrenade, timesUsedShotgun, timesUsedShield2, timesUsedLaser, timesUsedShield3, timesUsedNuke FROM tbl_userdata WHERE username = '" + socket.username + "';";
            conn.query(profileQuery, function(err, result, fields){
                if (err) throw err;
                socket.emit('profileConfirm', result);
            });
        }) 
    })
    console.log("Guns1v1 Server Online");

} catch (error) {
    console.log("Guns1v1 Server Failed to Launch");
}
