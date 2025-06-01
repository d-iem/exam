function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple hardcoded credentials
    const validUsername = "user1";
    const validPassword = "123";

    if (username.length < 50 && password === validPassword) {
        // Store login status
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        document.getElementById("loginMessage").textContent = "Login successful!";
        // You can redirect or show other content here
        window.location.href = "mock_start.html";

    } else {
        document.getElementById("loginMessage").textContent = "Invalid credentials.";
    }

    return false; // Prevent form from submitting
}



