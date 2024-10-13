let loadedResolve, reportLoaded = new Promise((res, rej) => { loadedResolve = res; });
let renderedResolve, reportRendered = new Promise((res, rej) => { renderedResolve = res; });

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Embed a Power BI report in the given HTML element with the given configurations
async function embedPowerBIReport() {
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

        // Set slicer filters immediately after loading
        await setSlicerFilters();

        // After setting slicers, check the division
        const Division = await checkDivision();
        await setInitialPage(report, Division);

        loadedResolve();
    });

    report.off("error");
    report.on("error", function (event) {
        console.log(event.detail);
    });

    report.off("rendered");
    report.on("rendered", async function () {
        renderedResolve();
    });

    // Wait for the report to load/render
    await reportLoaded;
    await reportRendered;

    console.log("Report fully loaded and rendered.");
}

// Function to set slicer filters
async function setSlicerFilters() {
    // Create the filter objects
    const filterAPP = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
            table: "APP_PRD_User",
            column: "Name"
        },
        filterType: models.FilterType.Basic,
        operator: "In",
        values: ["Lachner, Markus"] // Change this value to what you need
    };

    const filterFTW = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
            table: "FTW_PRD_User",
            column: "Name"
        },
        filterType: models.FilterType.Basic,
        operator: "In",
        values: ["Lachner, Markus"] // Change this value to what you need
    };

    try {
        const pages = await report.getPages();

        // Retrieve the active page.
        let page = pages.filter(function (page) {
            return page.isActive;
        })[0];

        const visuals = await page.getVisuals();

        // Set filters for APP slicer
        let slicerAPP = visuals.filter(function (visual) {
            return visual.type === "slicer" && visual.name === "c18533f5b16de07e7c5e"; // Use the actual name of your APP slicer
        })[0];

        // Set the slicer state with the APP filter.
        await slicerAPP.setSlicerState({ filters: [filterAPP] });
        console.log("Simple filter was set on the APP slicer.");

        // Set filters for FTW slicer
        let slicerFTW = visuals.filter(function (visual) {
            return visual.type === "slicer" && visual.name === "3c61d5ec1508373cb63e"; // Use the actual name of your FTW slicer
        })[0];

        // Set the slicer state with the FTW filter.
        await slicerFTW.setSlicerState({ filters: [filterFTW] });
        console.log("Simple filter was set on the FTW slicer.");
    } catch (errors) {
        console.log("Error setting slicer filters:", errors);
    }
}

// Function to check the division logic
async function checkDivision() {
    // Logic to determine the division, returning "APP" or "FTW"
    // For example purposes, we can return a hardcoded value or implement actual logic
    const Division = "FTW"; // Replace with actual logic
    return Division;
}

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
    } catch (errors) {
        console.error("Fehler beim Setzen der Seite:", errors);
    }
}

// Embed the Power BI report
embedPowerBIReport();
