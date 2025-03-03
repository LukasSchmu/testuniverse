<script src="https://alcdn.msauth.net/browser/2.34.0/js/msal-browser.min.js"></script>
<script src="script.js"></script>

<script>
console.log("Script.js geladen!"); // Prüfen, ob das Skript läuft

const msalConfig = {
    auth: {
        clientId: "e1e9ecc2-2f89-4640-aa8a-7d9ae189784c",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: window.location.href
    }
};

// MSAL-Instanz erstellen
const msalInstance = new msal.PublicClientApplication(msalConfig);

window.onload = function() {
    console.log("Seite geladen!");

    const loginButton = document.getElementById("sso-login-button");

    if (loginButton) {
        loginButton.addEventListener("click", function() {
            console.log("Login-Button wurde geklickt!");
            msalInstance.loginRedirect({ scopes: ["User.Read"] })
                .catch(error => console.error("Login-Fehler:", error));
        });
    } else {
        console.error("FEHLER: Login-Button mit ID 'sso-login-button' wurde nicht gefunden!");
    }
};
</script>