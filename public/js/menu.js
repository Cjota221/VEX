/**
 * menu.js - Gerenciamento do menu lateral e responsividade
 * Este arquivo implementa as funcionalidades do menu lateral, incluindo
 * o comportamento responsivo para dispositivos móveis.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const mainContainer = document.querySelector('.main-container');
    
    // Toggle do sidebar em dispositivos móveis
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('sidebar-open');
            
            // Ajusta o overlay
            if (sidebarOverlay) {
                if (sidebar.classList.contains('active')) {
                    sidebarOverlay.style.display = 'block';
                } else {
                    sidebarOverlay.style.display = 'none';
                }
            }
        });
    }
    
    // Fecha o sidebar ao clicar no overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
            sidebarOverlay.style.display = 'none';
        });
    }
    
    // Fecha o sidebar em dispositivos móveis ao clicar em um item do menu
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                document.body.classList.remove('sidebar-open');
                if (sidebarOverlay) {
                    sidebarOverlay.style.display = 'none';
                }
            }
        });
    });
    
    // Ajusta o layout ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
            if (sidebarOverlay) {
                sidebarOverlay.style.display = 'none';
            }
            mainContainer.style.marginLeft = '250px';
        } else {
            mainContainer.style.marginLeft = '0';
        }
    });
    
    // Inicializa o estado correto com base no tamanho da tela
    if (window.innerWidth <= 768) {
        mainContainer.style.marginLeft = '0';
    }
});
