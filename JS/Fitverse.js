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

// Function to set the initial page based on Division
async function setInitialPage(report, Division) {
    let pageName;

    if (Division === "APP") {
        pageName = "0cceab97c8a564c2e4ea";  // Page for "APP"
    } else if (Division === "FTW") {
        pageName = "d05390902dc1467be33e";  // Page for "FTW"
    } else {
        console.error("Unknown Division value:", Division);
        return;
    }

    try {
        await report.setPage(pageName);
        console.log(`Page set to: ${pageName}`);
    }
    catch (errors) {
        console.error("Error setting the page:", errors);
    }
}

// Example function to get all report pages (for debugging)
async function getReportPages(report) {
    try {
        const pages = await report.getPages();
        pages.forEach(page => {
            console.log(`Page Name: ${page.name}, Display Name: ${page.displayName}`);
        });
    }
    catch (errors) {
        console.error("Error getting report pages:", errors);
    }
}
