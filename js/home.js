// render home page
// refreshes whole page into home page
// which consists of username input and submit button

//? and with leaderboard button?
function render_home() {}

// handle username on submit
// get username and start the game
// if username not found, set alert
// if username found, save username into localstorage['playerName']
function handle_username() {
    var fieldValue = document.getElementById('username').value;
    localStorage.setItem('username', fieldValue);
}

// switches game into game mode
function start_game() {
    handle_username();
    window.location.href = "game.html";
}

//? switches into leaderboard page
function go_leaderboard() {}
