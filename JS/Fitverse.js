let loadedResolve, reportLoaded = new Promise((res, rej) => { loadedResolve = res; });
let renderedResolve, reportRendered = new Promise((res, rej) => { renderedResolve = res; });

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Embed a Power BI report in the given HTML element with the given configurations
function embedPowerBIReport() {
    let accessToken = EMBED_ACCESS_TOKEN;
    let embedUrl = EMBED_URL;
    let embedReportId = REPORT_ID;
    let tokenType = TOKEN_TYPE;
    let permissions = models.Permissions.All;

    let config = {
        type: 'report',
        tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
        accessToken: accessToken,
        embedUrl: embedUrl,
        id: embedReportId,
        permissions: permissions,
        settings: {
            panes: {
                filters: { visible: true },
                pageNavigation: { visible: true }
            },
            bars: {
                statusBar: { visible: true }
            }
        }
    };

    let embedContainer = $('#embedContainer')[0];
    report = powerbi.embed(embedContainer, config);

    // Set up the event handlers
    report.off("loaded");
    report.on("loaded", async function () {
        console.log("Report loaded");

        // Set the page immediately after loading
        const Division = "FTW";  // Example: Change the division as needed
        await setInitialPage(report, Division);

        loadedResolve();
        report.off("loaded");
    });

    report.off("error");
    report.on("error", function (event) {
        console.log(event.detail);
    });

    report.off("rendered");
    report.on("rendered", function () {
        renderedResolve();
        report.off("rendered");
    });
}

// Embed the Power BI report and wait for it to load/render
embedPowerBIReport();
await reportLoaded;  // Code to run after report is loaded

// Insert the code that runs after report is fully rendered
await reportRendered;


// Funktion zum Aktualisieren der Division basierend auf dem Status des Toggles
function updateDivision() {
    const toggle = document.getElementById("toggleSwitch");
    const Division = toggle.checked ? "APP" : "FTW"; // "APP" wenn aktiviert, "FTW" wenn nicht aktiviert
    console.log(Division); // Gibt den aktuellen Status in der Konsole aus
}

// Event Listener für den Toggle
document.getElementById("toggleSwitch").addEventListener("change", updateDivision);


// Funktion zum Setzen der Seite basierend auf dem Wert der Konstante
async function setInitialPage(report, Division) {
    let pageName;

    // Überprüfe den Wert von Division und setze den entsprechenden Seitennamen
    if (Division === "APP") {
        pageName = "0cceab97c8a564c2e4ea";  // Seite für "APP"
    } else if (Division === "FTW") {
        pageName = "d05390902dc1467be33e";  // Seite für "FTW"
    } else {
        console.error("Unbekannter Wert für Division:", Division);
        return;  // Beende die Funktion, falls der Wert ungültig ist
    }

    // Versuche, die Seite zu ändern
    try {
        await report.setPage(pageName);
        console.log(`Seite wurde auf: ${pageName} gesetzt.`);
    }
    catch (errors) {
        console.error("Fehler beim Setzen der Seite:", errors);
    }
}

// Beispiel: Initialisiere die Seite basierend auf der Konstante
setInitialPage(report, Division);
