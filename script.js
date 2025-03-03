const msalConfig = {
    auth: {
        clientId: "e1e9ecc2-2f89-4640-aa8a-7d9ae189784c
", // Deine Microsoft-App-Client-ID
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "/testuniverse/HTML/main.html" // Nach erfolgreichem Login hierhin weiterleiten
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

document.getElementById("sso-login-button").addEventListener("click", function() {
    msalInstance.loginRedirect({ scopes: ["User.Read"] });
});
