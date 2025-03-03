console.log("Script.js geladen!"); // Prüfen, ob das Skript läuft

const msalConfig = {
    auth: {
        clientId: "e1e9ecc2-2f89-4640-aa8a-7d9ae189784c",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: window.location.href
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

// Stelle sicher, dass MSAL bereit ist
msalInstance.initialize().then(() => {
    console.log("MSAL ist bereit.");
    const loginButton = document.getElementById("sso-login-button");

    if (loginButton) {
        loginButton.addEventListener("click", function() {
            console.log("Login-Button wurde geklickt!");
            msalInstance.loginRedirect({ scopes: ["User.Read"] });
        });
    } else {
        console.log("FEHLER: Button nicht gefunden!");
    }
});