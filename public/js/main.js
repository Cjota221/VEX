document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed. main.js executing.");

    // --- Sidebar Toggle --- //
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const sidebar = document.querySelector(".sidebar");

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("active");
            console.log("Sidebar toggled.");
        });
    } else {
        console.warn("Sidebar toggle button or sidebar element not found.");
    }

    // --- Generic Modal Handling --- //
    const openModalButtons = document.querySelectorAll("[id^=\"open\"][id$=\"ModalBtn\"]"); // Matches openModalBtn, openEntradaModalBtn, etc.
    const closeModalButtons = document.querySelectorAll("[id^=\"close\"][id$=\"ModalBtn\"], [id^=\"cancel\"][id$=\"ModalBtn\"]"); // Matches closeModalBtn, cancelModalBtn, etc.

    console.log(`Found ${openModalButtons.length} modal open buttons.`);
    console.log(`Found ${closeModalButtons.length} modal close/cancel buttons.`);

    // Function to open a modal
    const openModal = (modal) => {
        if (modal) {
            modal.style.display = "flex"; // Use flex as per the inline style in HTML
            console.log(`Modal ${modal.id} opened.`);
        }
    };

    // Function to close a modal
    const closeModal = (modal) => {
        if (modal) {
            modal.style.display = "none";
            console.log(`Modal ${modal.id} closed.`);
        }
    };

    // Add event listeners to open buttons
    openModalButtons.forEach(button => {
        // Derive modal ID from button ID (e.g., openAddInsumoModalBtn -> addInsumoModal)
        let modalId = button.id.replace("open", "").replace("Btn", "");
        modalId = modalId.charAt(0).toLowerCase() + modalId.slice(1);
        const modal = document.getElementById(modalId);

        if (modal) {
            button.addEventListener("click", () => openModal(modal));
        } else {
            // Handle generic case like 'openModalBtn' -> find the first modal on the page?
            // Or assume a convention like 'add<PageName>Modal'
            // For now, let's try finding *any* modal if the specific one isn't found by ID convention
            const genericModal = document.querySelector("[id$=Modal]");
            if (genericModal && button.id === "openModalBtn") {
                 button.addEventListener("click", () => openModal(genericModal));
            } else {
                 console.warn(`Modal with derived ID ${modalId} not found for button ${button.id}.`);
            }
        }
    });

    // Add event listeners to close/cancel buttons
    closeModalButtons.forEach(button => {
        const modal = button.closest("[id$=Modal]"); // Find the parent modal
        if (modal) {
            button.addEventListener("click", () => closeModal(modal));
        } else {
            console.warn(`Could not find parent modal for close/cancel button:`, button);
        }
    });

    // Optional: Close modal when clicking outside of it
    window.addEventListener("click", (event) => {
        document.querySelectorAll("[id$=Modal]").forEach(modal => {
            if (event.target === modal) { // Check if the click is directly on the modal background
                closeModal(modal);
            }
        });
    });

    console.log("main.js setup complete.");
});

