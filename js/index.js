function reset_username_db() {
  // reset current player username
  const previous_username = localStorage.getItem("username");

  if (previous_username) {
    localStorage.removeItem("username");
  }
}

function submitUsername(e) {
  e.preventDefault();

  const usernameInput = document.getElementById("usernameInput");
  const username = usernameInput.value;

  if (!username) {
    alert("Mohon isi username anda");
  } else {
    localStorage.setItem("username", username);

    // https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
    // redirect to game page
    window.location.href = "game.html";
  }
}

// redirect user after submiting input
usernameForm.addEventListener("submit", submitUsername);
