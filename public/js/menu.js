/**
 * Menu Lateral Padronizado
 * Este script injeta o mesmo menu lateral em todas as páginas
 */
document.addEventListener('DOMContentLoaded', function() {
    // Definição dos itens do menu
    const menuItems = [
        { url: 'index.html', icon: 'bxs-dashboard', text: 'Dashboard' },
        { url: 'insumos.html', icon: 'bx-package', text: 'Insumos' },
        { url: 'modelos.html', icon: 'bx-cube', text: 'Modelos' },
        { url: 'producao.html', icon: 'bx-factory', text: 'Produção' },
        { url: 'estoque.html', icon: 'bx-store', text: 'Estoque' },
        { url: 'financeiro.html', icon: 'bx-money', text: 'Financeiro' },
        { url: 'relatorios.html', icon: 'bx-file', text: 'Relatórios' },
        { url: 'calculadora.html', icon: 'bx-calculator', text: 'Calculadora' },
        { url: 'configuracoes.html', icon: 'bx-cog', text: 'Configurações' }
    ];
    
    // Encontrar o elemento sidebar
    const sidebar = document.querySelector('.sidebar');
    
    // Se não existir sidebar, não fazer nada
    if (!sidebar) return;
    
    // Limpar o conteúdo atual da sidebar
    sidebar.innerHTML = '';
    
    // Adicionar o logo VEX
    const logo = document.createElement('div');
    logo.className = 'sidebar-header';
    logo.innerHTML = '<h1 class="vex-logo">VEX</h1>';
    sidebar.appendChild(logo);
    
    // Criar o menu de navegação
    const nav = document.createElement('nav');
    nav.className = 'sidebar-menu';
    
    // Determinar a página atual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Adicionar cada item ao menu
    menuItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url;
        link.className = 'sidebar-menu-item';
        
        // Marcar o item ativo
        if (currentPage === item.url || 
            (currentPage.includes(item.url.replace('.html', '')) && item.url !== 'index.html')) {
            link.classList.add('active');
        }
        
        link.innerHTML = `
            <i class='bx ${item.icon}'></i>
            <span>${item.text}</span>
        `;
        
        nav.appendChild(link);
    });
    
    sidebar.appendChild(nav);
    
    // Adicionar link de ajuda no final
    const helpLink = document.createElement('div');
    helpLink.className = 'sidebar-footer';
    helpLink.innerHTML = `
        <a href="#" class="sidebar-menu-item">
            <i class='bx bx-help-circle'></i>
            <span>Ajuda & Suporte</span>
        </a>
    `;
    
    sidebar.appendChild(helpLink);
});
