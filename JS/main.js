document.addEventListener("DOMContentLoaded", function () {
    // ===== Menü- und iFrame-Management =====
    
    const iframe = document.querySelector('.iframe-container iframe');
    const menuButtons = document.querySelectorAll('.menu-button');

    function changeIframeSource(url, linkId) {
        iframe.src = url;
        activateMenuLink(linkId);
    }

    function activateMenuLink(linkId) {
        document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
        const activeItem = document.querySelector(`.menu-item a#${linkId}`);
        if (activeItem) {
            activeItem.parentElement.classList.add('active');
        }
    }

    // Klick-Event-Listener für Menü-Buttons
    menuButtons.forEach(button => {
        button.addEventListener('click', function () {
            const url = button.getAttribute('data-url');
            changeIframeSource(url, button.previousElementSibling.id);
        });
    });

    // ===== Overlay-Management =====

    const overlay = document.getElementById('overlay');
    const msButton = document.getElementById('MS-button');
    const closePopupButton = document.getElementById('close-popup');
    const linkField = document.getElementById('link-field');
    const copyLinkButton = document.getElementById('copy-link');
    const exampleLink = "https://example.com/test-link"; // Beispiel-Link

    msButton.addEventListener('click', function () {
        linkField.value = exampleLink;
        overlay.style.display = 'flex';
    });

    closePopupButton.addEventListener('click', function () {
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    copyLinkButton.addEventListener('click', function () {
        navigator.clipboard.writeText(linkField.value)
            .then(() => alert("Link kopiert!"))
            .catch(err => console.error('Konnte den Text nicht kopieren:', err));
    });

    // ===== Profil-Popup-Management =====

    const transparentButton = document.getElementById('open-profile-popup');
    const logoutButton = document.getElementById('logout-button');
    let isLogoutButtonVisible = false;

    // Klick auf den transparenten Button zeigt/versteckt den Logout-Button
    transparentButton.addEventListener('click', function () {
        isLogoutButtonVisible = !isLogoutButtonVisible;
    
        // Logout-Button anzeigen oder ausblenden
        logoutButton.style.display = isLogoutButtonVisible ? 'block' : 'none';
    
        // Breite des Logout-Buttons ermitteln
        const logoutButtonWidth = logoutButton.offsetWidth;
    
        // Transparenten Button nach links verschieben
        transparentButton.style.transform = `translateX(-${logoutButtonWidth}px)`;
    });

    // ===== Logout-Button klickbar, wenn sichtbar =====
    
    logoutButton.addEventListener("click", function() {
        if (isLogoutButtonVisible) {
            // Weiterleitung zur sso.html-Seite
            window.location.href = "index.html";
        }
    });
});

// Funktion zum Aktualisieren der Icons im Toggle
function updateToggleIcon() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const toggleIconLeft = document.getElementById('toggleIconLeft');
    const toggleIconLeftActive = document.getElementById('toggleIconLeftActive');
    const toggleIconRight = document.getElementById('toggleIconRight');
    const toggleIconRightActive = document.getElementById('toggleIconRightActive');

    // Wechseln der Sichtbarkeit der Icons
    if (toggleSwitch.checked) {
        toggleIconLeft.classList.add('hidden');
        toggleIconLeftActive.classList.remove('hidden');
        toggleIconRight.classList.add('hidden');
        toggleIconRightActive.classList.remove('hidden');
    } else {
        toggleIconLeft.classList.remove('hidden');
        toggleIconLeftActive.classList.add('hidden');
        toggleIconRight.classList.remove('hidden');
        toggleIconRightActive.classList.add('hidden');
    }
}
