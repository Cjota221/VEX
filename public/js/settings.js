/**
 * settings.js - Funcionalidades da página de configurações
 * Este arquivo implementa as funcionalidades específicas da página de configurações,
 * incluindo navegação entre abas e salvamento de preferências.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const tabButtons = document.querySelectorAll('.config-tabs .btn-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const saveSettingsBtn = document.getElementById('saveSettings');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Inicializa a página de configurações
    initSettings();
    
    /**
     * Inicializa a página de configurações e seus eventos
     */
    function initSettings() {
        // Inicializa a navegação entre abas
        initTabs();
        
        // Inicializa a seleção de tema
        initThemeSelection();
        
        // Adiciona evento ao botão de salvar
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', saveSettings);
        }
        
        // Carrega as configurações salvas
        loadSavedSettings();
    }
    
    /**
     * Inicializa a navegação entre abas
     */
    function initTabs() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove a classe active de todos os botões
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona a classe active ao botão clicado
                this.classList.add('active');
                
                // Obtém o ID da aba a ser exibida
                const tabId = this.getAttribute('data-tab');
                
                // Oculta todas as abas
                tabPanes.forEach(pane => {
                    pane.style.display = 'none';
                });
                
                // Exibe a aba selecionada
                const selectedPane = document.getElementById(tabId);
                if (selectedPane) {
                    selectedPane.style.display = 'block';
                }
            });
        });
    }
    
    /**
     * Inicializa a seleção de tema
     */
    function initThemeSelection() {
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove a classe active de todas as opções
                themeOptions.forEach(opt => opt.classList.remove('active'));
                
                // Adiciona a classe active à opção clicada
                this.classList.add('active');
                
                // Aplica o tema selecionado
                const theme = this.querySelector('.theme-preview').classList[1];
                applyTheme(theme);
            });
        });
    }
    
    /**
     * Aplica o tema selecionado
     * @param {string} theme - O tema a ser aplicado
     */
    function applyTheme(theme) {
        // Remove todas as classes de tema do body
        document.body.classList.remove('dark-mode', 'light-mode', 'blue-mode');
        
        // Adiciona a classe do tema selecionado
        switch (theme) {
            case 'dark-theme':
                document.body.classList.add('dark-mode');
                break;
            case 'light-theme':
                document.body.classList.add('light-mode');
                break;
            case 'blue-theme':
                document.body.classList.add('blue-mode');
                break;
        }
    }
    
    /**
     * Carrega as configurações salvas
     */
    function loadSavedSettings() {
        // Simulação de carregamento de configurações
        // Em um ambiente real, isso seria baseado em dados do localStorage ou do backend
        console.log('Configurações carregadas');
    }
    
    /**
     * Salva as configurações atuais
     */
    function saveSettings() {
        // Coleta todas as configurações
        const settings = {
            general: {
                language: document.getElementById('language').value,
                timezone: document.getElementById('timezone').value,
                dateFormat: document.getElementById('dateFormat').value,
                currency: document.getElementById('currency').value
            },
            user: {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value
            },
            company: {
                name: document.getElementById('companyName').value,
                cnpj: document.getElementById('companyCNPJ').value,
                address: document.getElementById('companyAddress').value,
                phone: document.getElementById('companyPhone').value,
                email: document.getElementById('companyEmail').value
            },
            notifications: {
                lowStock: document.getElementById('notifyLowStock').checked,
                payments: document.getElementById('notifyPayments').checked,
                production: document.getElementById('notifyProduction').checked,
                email: document.getElementById('notifyEmail').checked,
                system: document.getElementById('notifySystem').checked
            },
            appearance: {
                theme: document.querySelector('.theme-option.active .theme-preview').classList[1],
                fontSize: document.getElementById('fontSize').value,
                sidebarPosition: document.getElementById('sidebarPosition').value,
                compactMode: document.getElementById('compactMode').checked
            },
            backup: {
                auto: document.getElementById('autoBackup').checked,
                frequency: document.getElementById('backupFrequency').value
            }
        };
        
        // Simulação de salvamento de configurações
        // Em um ambiente real, isso seria salvo no localStorage ou enviado para o backend
        console.log('Configurações salvas:', settings);
        
        // Exibe uma notificação de sucesso
        showToast('Configurações salvas com sucesso!', 'success');
    }
});
