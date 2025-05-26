/* 
 * microinteractions.js - Microinterações para melhorar a experiência do usuário
 * Este arquivo implementa efeitos visuais e interações sutis para tornar a interface mais responsiva e agradável
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as microinterações
    initRippleEffect();
    initHoverEffects();
    initFocusEffects();
    initScrollEffects();
    initCardInteractions();
    initButtonFeedback();
});

/**
 * Inicializa o efeito ripple (ondulação) em botões e elementos clicáveis
 */
function initRippleEffect() {
    // Seleciona todos os botões e elementos clicáveis
    const clickableElements = document.querySelectorAll('.btn, .card-actions button, .sidebar-menu a, .view-toggle button');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            // Cria o elemento de ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Posiciona o ripple no ponto de clique
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            
            // Remove o ripple após a animação
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Inicializa efeitos de hover em cards e elementos interativos
 */
function initHoverEffects() {
    // Efeito de hover em cards
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Efeito de hover em botões
    const buttons = document.querySelectorAll('.btn:not(.btn-icon)');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Inicializa efeitos de foco em campos de formulário
 */
function initFocusEffects() {
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Inicializa efeitos de scroll
 */
function initScrollEffects() {
    // Efeito de fade-in em elementos ao scrollar
    const fadeElements = document.querySelectorAll('.card');
    
    // Verifica se o IntersectionObserver é suportado
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            element.classList.add('fade-element');
            fadeObserver.observe(element);
        });
    } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        fadeElements.forEach(element => {
            element.classList.add('fade-in');
        });
    }
}

/**
 * Inicializa interações específicas para cards
 */
function initCardInteractions() {
    // Expande/colapsa conteúdo de cards ao clicar no cabeçalho
    const cardHeaders = document.querySelectorAll('.card-header');
    
    cardHeaders.forEach(header => {
        // Verifica se o card tem a classe collapsible
        if (header.parentElement.classList.contains('collapsible')) {
            header.style.cursor = 'pointer';
            
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const card = this.parentElement;
                
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    card.classList.remove('expanded');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    card.classList.add('expanded');
                }
            });
        }
    });
    
    // Adiciona efeito de destaque ao clicar em linhas de tabela dentro de cards
    const tableRows = document.querySelectorAll('.card table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove a classe selected de todas as linhas
            tableRows.forEach(r => r.classList.remove('selected'));
            
            // Adiciona a classe selected à linha clicada
            this.classList.add('selected');
        });
    });
}

/**
 * Inicializa feedback visual para botões
 */
function initButtonFeedback() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Adiciona classe de feedback
            this.classList.add('btn-clicked');
            
            // Remove a classe após a animação
            setTimeout(() => {
                this.classList.remove('btn-clicked');
            }, 300);
        });
    });
}

/**
 * Adiciona animação de carregamento a um elemento
 * @param {HTMLElement} element - O elemento a receber a animação de carregamento
 */
function addLoadingAnimation(element) {
    // Salva o conteúdo original
    const originalContent = element.innerHTML;
    element.dataset.originalContent = originalContent;
    
    // Adiciona a animação de carregamento
    element.innerHTML = '<span class="loading-spinner"></span>';
    element.classList.add('loading');
    element.disabled = true;
    
    return {
        // Função para remover a animação
        remove: function() {
            element.innerHTML = element.dataset.originalContent;
            element.classList.remove('loading');
            element.disabled = false;
        }
    };
}

/**
 * Exibe uma notificação toast
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
    
    // Exibe o toast com animação
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
