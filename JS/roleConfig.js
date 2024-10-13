document.addEventListener("DOMContentLoaded", function () {
    const userRole = "HQ"; // Ändere zu "HQ" oder lade die Rolle dynamisch

    // Konfiguration des Menüs basierend auf der Rolle
    const roleConfig = {
        HQ: ["overview-link", "test-level-link", "fitverse-link", "wear-link", "performance-link", "lab-link", "biomechanical-link"],
        OC: ["wear-link", "performance-link", "lab-link"]
    };

    // ===== Menükonfiguration basierend auf der Rolle =====

    function configureMenuForRole(role) {
        document.querySelectorAll('.menu-item').forEach(item => item.style.display = 'none');

        if (roleConfig[role]) {
            roleConfig[role].forEach(linkId => {
                const menuItem = document.getElementById(linkId).closest('.menu-item');
                if (menuItem) {
                    menuItem.style.display = 'flex';
                }
            });
        }
    }

    // Menü basierend auf der Rolle initialisieren
    configureMenuForRole(userRole);
});
