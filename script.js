const msalConfig = {
    auth: {
        clientId: "e1e9ecc2-2f89-4640-aa8a-7d9ae189784c",
        authority: "https://login.microsoftonline.com/3bfeb222-e42c-4535-aace-ea6f7751369b",
        redirectUri: window.location.href
    }
};
const loginRequest = {
    scopes: ["https://analysis.windows.net/powerbi/api"]
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
msalInstance.loginRedirect(loginRequest);
