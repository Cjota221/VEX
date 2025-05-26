/**
 * menu-fixes.js - Correções para o menu lateral do Appvex
 * Este arquivo corrige problemas de comportamento do menu lateral
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const mainContainer = document.querySelector('.main-container');
    
    // Verifica se o overlay do sidebar existe, se não, cria
    if (!sidebarOverlay) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }
    
    // Verifica se o botão de toggle existe, se não, cria
    if (!sidebarToggle) {
        const toggle = document.createElement('button');
        toggle.className = 'sidebar-toggle';
        toggle.innerHTML = '<i class="bx bx-menu"></i>';
        document.body.appendChild(toggle);
    }
    
    // Atualiza as referências caso elementos tenham sido criados
    const updatedSidebarToggle = document.querySelector('.sidebar-toggle');
    const updatedSidebarOverlay = document.querySelector('.sidebar-overlay');
    
    // Toggle do sidebar em dispositivos móveis
    if (updatedSidebarToggle) {
        updatedSidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('sidebar-open');
            
            // Ajusta o overlay
            if (updatedSidebarOverlay) {
                if (sidebar.classList.contains('active')) {
                    updatedSidebarOverlay.style.display = 'block';
                } else {
                    updatedSidebarOverlay.style.display = 'none';
                }
            }
        });
    }
    
    // Fecha o sidebar ao clicar no overlay
    if (updatedSidebarOverlay) {
        updatedSidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
            updatedSidebarOverlay.style.display = 'none';
        });
    }
    
    // Fecha o sidebar em dispositivos móveis ao clicar em um item do menu
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                document.body.classList.remove('sidebar-open');
                if (updatedSidebarOverlay) {
                    updatedSidebarOverlay.style.display = 'none';
                }
            }
        });
    });
    
    // Marca o item de menu ativo com base na URL atual
    const currentPath = window.location.pathname;
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href) {
            // Remove extensão .html para comparação
            const cleanHref = href.replace('.html', '');
            const cleanPath = currentPath.replace('.html', '');
            
            // Verifica se o href corresponde ao caminho atual
            if (cleanPath.endsWith(cleanHref) || 
                (cleanHref === 'index.html' && (cleanPath === '/' || cleanPath.endsWith('/index')))) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
    
    // Ajusta o layout ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
            if (updatedSidebarOverlay) {
                updatedSidebarOverlay.style.display = 'none';
            }
            
            // Ajusta a margem do container principal
            if (mainContainer) {
                mainContainer.style.marginLeft = '250px';
            }
        } else {
            // Ajusta a margem do container principal em dispositivos móveis
            if (mainContainer) {
                mainContainer.style.marginLeft = '0';
            }
            
            // Exibe o botão de toggle
            if (updatedSidebarToggle) {
                updatedSidebarToggle.style.display = 'flex';
            }
        }
    });
    
    // Inicializa o estado correto com base no tamanho da tela
    if (window.innerWidth <= 768) {
        if (mainContainer) {
            mainContainer.style.marginLeft = '0';
        }
        
        // Exibe o botão de toggle
        if (updatedSidebarToggle) {
            updatedSidebarToggle.style.display = 'flex';
        }
    } else {
        if (mainContainer) {
            mainContainer.style.marginLeft = '250px';
        }
    }
});
