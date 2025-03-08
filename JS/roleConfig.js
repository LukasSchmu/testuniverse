document.addEventListener("DOMContentLoaded", function () {
    const userRole = "HQ"; // Change to "HQ" or load the role dynamically

    // Configuration of menu based on role
    const roleConfig = {
        HQ: ["overview-link", "fitverseO-link", "adi-link", "test-level-link", "fitverse-link", "wear-link", "performance-link", "lab-link", "biomechanical-link", "Admin-link"],
        OC: ["fitverse-link", "performance-link", "lab-link"]
    };

    // ===== Menu configuration based on role =====
    function configureMenuForRole(role) {
        // Hide all menu items initially
        document.querySelectorAll('.menu-item').forEach(item => item.style.display = 'none');

        if (roleConfig[role]) {
            roleConfig[role].forEach(linkId => {
                const menuItem = document.getElementById(linkId)?.closest('.menu-item');
                if (menuItem) {
                    menuItem.style.display = 'flex'; // Make the item visible
                }
            });
        }
    }

    // Initialize the menu based on the role
    configureMenuForRole(userRole);
});
