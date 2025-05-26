/**
 * main.js - Funcionalidades principais do Appvex
 * Este arquivo implementa as funcionalidades comuns a todas as páginas
 * e inicializa componentes compartilhados.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de componentes
    initViewToggle();
    initFormValidation();
    initTableSorting();
    initTooltips();
    
    // Detecta se há mensagens de notificação para exibir
    showNotifications();
});

/**
 * Inicializa o toggle entre visualização em cards e tabela
 */
function initViewToggle() {
    const viewToggleButtons = document.querySelectorAll('.view-toggle button');
    const cardsGrid = document.querySelector('.cards-grid');
    const tableView = document.querySelector('.table-responsive');
    
    if (viewToggleButtons.length && cardsGrid && tableView) {
        viewToggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove a classe active de todos os botões
                viewToggleButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona a classe active ao botão clicado
                this.classList.add('active');
                
                // Alterna entre visualização em cards e tabela
                if (this.querySelector('i').classList.contains('bxs-grid')) {
                    cardsGrid.style.display = 'grid';
                    tableView.style.display = 'none';
                } else {
                    cardsGrid.style.display = 'none';
                    tableView.style.display = 'block';
                }
            });
        });
    }
}

/**
 * Inicializa a validação de formulários
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Valida ao perder o foco
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            // Valida ao alterar o valor
            input.addEventListener('input', function() {
                validateInput(this);
            });
        });
        
        // Valida ao enviar o formulário
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    });
}

/**
 * Valida um campo de formulário
 * @param {HTMLElement} input - O elemento de input a ser validado
 * @returns {boolean} - Retorna true se o input for válido, false caso contrário
 */
function validateInput(input) {
    // Ignora campos desabilitados ou readonly
    if (input.disabled || input.readOnly) {
        return true;
    }
    
    let isValid = true;
    const value = input.value.trim();
    
    // Validação básica por tipo
    if (input.hasAttribute('required') && value === '') {
        isValid = false;
    } else if (input.type === 'email' && value !== '' && !validateEmail(value)) {
        isValid = false;
    } else if (input.type === 'number' && value !== '') {
        const min = parseFloat(input.getAttribute('min'));
        const max = parseFloat(input.getAttribute('max'));
        
        if (!isNaN(min) && parseFloat(value) < min) {
            isValid = false;
        }
        
        if (!isNaN(max) && parseFloat(value) > max) {
            isValid = false;
        }
    }
    
    // Atualiza as classes de validação
    if (isValid) {
        input.classList.remove('is-invalid');
        if (value !== '') {
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
        }
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
    
    return isValid;
}

/**
 * Valida um endereço de e-mail
 * @param {string} email - O e-mail a ser validado
 * @returns {boolean} - Retorna true se o e-mail for válido, false caso contrário
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Inicializa a ordenação de tabelas
 */
function initTableSorting() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        
        headers.forEach((header, index) => {
            // Adiciona cursor pointer aos cabeçalhos
            header.style.cursor = 'pointer';
            
            // Adiciona evento de clique para ordenar
            header.addEventListener('click', function() {
                sortTable(table, index);
            });
        });
    });
}

/**
 * Ordena uma tabela pelo índice da coluna
 * @param {HTMLElement} table - A tabela a ser ordenada
 * @param {number} columnIndex - O índice da coluna pela qual ordenar
 */
function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isAscending = table.getAttribute('data-sort-dir') !== 'asc';
    
    // Atualiza a direção da ordenação
    table.setAttribute('data-sort-dir', isAscending ? 'asc' : 'desc');
    
    // Ordena as linhas
    rows.sort((a, b) => {
        const cellA = a.querySelectorAll('td')[columnIndex].textContent.trim();
        const cellB = b.querySelectorAll('td')[columnIndex].textContent.trim();
        
        // Tenta ordenar como número se possível
        const numA = parseFloat(cellA.replace(/[^\d.-]/g, ''));
        const numB = parseFloat(cellB.replace(/[^\d.-]/g, ''));
        
        if (!isNaN(numA) && !isNaN(numB)) {
            return isAscending ? numA - numB : numB - numA;
        }
        
        // Ordena como texto
        return isAscending ? 
            cellA.localeCompare(cellB, 'pt-BR') : 
            cellB.localeCompare(cellA, 'pt-BR');
    });
    
    // Reinsere as linhas ordenadas
    rows.forEach(row => tbody.appendChild(row));
}

/**
 * Inicializa tooltips personalizados
 */
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('title');
        element.removeAttribute('title'); // Remove o title nativo
        
        // Cria o tooltip personalizado
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            // Posiciona o tooltip
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            // Exibe o tooltip
            setTimeout(() => tooltip.classList.add('visible'), 10);
            
            // Armazena referência ao tooltip
            element.tooltip = tooltip;
        });
        
        // Remove o tooltip ao sair do elemento
        element.addEventListener('mouseleave', function() {
            if (element.tooltip) {
                element.tooltip.classList.remove('visible');
                setTimeout(() => {
                    if (element.tooltip && element.tooltip.parentNode) {
                        element.tooltip.parentNode.removeChild(element.tooltip);
                    }
                    element.tooltip = null;
                }, 300);
            }
        });
    });
}

/**
 * Exibe notificações do sistema
 */
function showNotifications() {
    // Verifica se há notificações no localStorage
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    if (notifications.length > 0) {
        // Exibe cada notificação
        notifications.forEach(notification => {
            showToast(notification.message, notification.type);
        });
        
        // Limpa as notificações
        localStorage.setItem('notifications', '[]');
    }
}

/**
 * Exibe um toast de notificação
 * @param {string} message - A mensagem a ser exibida
 * @param {string} type - O tipo de notificação (success, warning, error, info)
 */
function showToast(message, type = 'info') {
    // Cria o elemento toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class='bx ${getIconForType(type)}'></i>
            <span>${message}</span>
        </div>
        <button class="toast-close">
            <i class='bx bx-x'></i>
        </button>
    `;
    
    // Adiciona o toast ao DOM
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    toastContainer.appendChild(toast);
    
    // Exibe o toast
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Adiciona evento para fechar o toast
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    // Remove o toast automaticamente após 5 segundos
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

/**
 * Cria o container para os toasts
 * @returns {HTMLElement} - O container de toasts
 */
function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

/**
 * Retorna o ícone para o tipo de notificação
 * @param {string} type - O tipo de notificação
 * @returns {string} - A classe do ícone
 */
function getIconForType(type) {
    switch (type) {
        case 'success': return 'bxs-check-circle';
        case 'warning': return 'bxs-error';
        case 'error': return 'bxs-x-circle';
        default: return 'bxs-info-circle';
    }
}
