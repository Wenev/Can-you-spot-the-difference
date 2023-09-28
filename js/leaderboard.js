// default leaderboard, when player plays for the first time
const DEFAULT_LEADERBOARD = [
  {
    username: "Sepuh",
    score: 200000,
  },
];

/**
 * localStorage related functions
 */

function get_username_localStorage() {
  const username = localStorage.getItem("current-username");
  return username;
}

function get_score_localStorage() {
  const score = localStorage.getItem("current-score");
  return Number(score);
}

// with get username and score from localStorage
function get_username_score_localStorage() {
  const username = get_username_localStorage();
  const score = get_score_localStorage();

  if (username && score !== undefined) {
    return [username, score];
  }

  return false;
}

// clears username and score from localstorage
function clear_username_score_localStorage() {
  localStorage.removeItem("current-username");
  localStorage.removeItem("current-score");
}

// get previous leaderboard
function get_leaderboard_localStorage() {
  let currentLeaderboardRaw = localStorage.getItem("leaderboard");
  let currentLeaderboard = JSON.parse(currentLeaderboardRaw);

  // sets default leaderboard if not available
  if (!currentLeaderboard) {
    currentLeaderboard = DEFAULT_LEADERBOARD;
  }

  return currentLeaderboard;
}

function update_leaderboard_localStorage(newLeaderboard) {
  const leaderboardString = JSON.stringify(newLeaderboard);

  localStorage.setItem("leaderboard", leaderboardString);
}

/**
 * leaderboard related functions
 */

// with get previous leaderboard and update it with new player data
// updates the leaderboard before rendering the leaderboard
function update_leaderboard(lastUsername, lastScore) {
  const leaderboard = get_leaderboard_localStorage();

  let index = 0;

  for (const perLeaderboard of leaderboard) {
    // score from highest to lowest
    const { score } = perLeaderboard;

    if (score > lastScore) {
      index++;
    } else {
      break;
    }
  }

  const newData = {
    username: lastUsername,
    score: lastScore,
  };

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
  leaderboard.splice(index, 0, newData);

  update_leaderboard_localStorage(leaderboard);
}

// renders leaderboard from game mode
// with get current leaderboard from localstorage
function render_leaderboard() {
  const leaderboard = get_leaderboard_localStorage();
  const leaderboardElement = document.getElementById("leaderboard");

  //   clears leaderboard element first
  leaderboardElement.innerHTML = "";

  for (let i = 0; i < leaderboard.length; i++) {
    const { username, score } = leaderboard[i];

    const trElement = document.createElement("tr");
    trElement.innerHTML = `
                <th scope="row">${i + 1}</th>
                <td>${username}</td>
                <td>${score}</td>
              `;

    leaderboardElement.appendChild(trElement);
  }
}

// resets leaderboard and rerenders it
function reset_leaderboard() {
  const leaderboard = DEFAULT_LEADERBOARD;
  update_leaderboard_localStorage(leaderboard);

  render_leaderboard();
}

function set_leaderboard() {
  // check if last user available
  const lastPlayerData = get_username_score_localStorage();

  if (lastPlayerData) {
    const [username, score] = lastPlayerData;
    clear_username_score_localStorage();

    update_leaderboard(username, score);
  }

  render_leaderboard();
}

/**
 * button related functions
 */

function set_home_button() {
  const homeButtonElement = document.getElementById("homeButton");

  homeButtonElement.addEventListener("click", function () {
    window.location.href = "homepage.html";
  });
}

function set_reset_button() {
  const resetButtonElement = document.getElementById("resetButton");

  resetButtonElement.addEventListener("click", function () {
    // confirm before resettting leaderboard
    const resetAnswer = confirm("Reset leaderboard?"); // true or false

    if (resetAnswer) {
      reset_leaderboard();
      render_leaderboard();
    }
  });
}

function set_buttons() {
  set_home_button();
  set_reset_button();
}

/**
 * Main function
 */

function leaderboard_page() {
  set_buttons();
  set_leaderboard();
}

document.addEventListener("DOMContentLoaded", function () {
  leaderboard_page();
});
