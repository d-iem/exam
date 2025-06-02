window.onload = function() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  if (isLoggedIn === "true" && username) {
    document.getElementById("welcomeMessage").textContent = `Welcome, ${username}! to the Exam`;
  } else {
    // If not logged in, redirect to login page
    window.location.href = "index.html";
  }
};

function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}
