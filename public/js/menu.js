/**
 * Menu Padronizado para todas as páginas
 * Este script injeta o menu lateral em todas as páginas
 */
document.addEventListener('DOMContentLoaded', function() {
// Definição dos itens do menu
const menuItems = [
{ url: 'index.html', icon: 'bxs-dashboard', text:
'Dashboard' },
{ url: 'insumos.html', icon: 'bx-package', text:
'Insumos' },
{ url: 'modelos.html', icon: 'bx-cube', text:
'Modelos' },
{ url: 'producao.html', icon: 'bx-factory', text:
'Produção' },
{ url: 'estoque.html', icon: 'bx-store', text:
'Estoque' },
{ url: 'financeiro.html', icon: 'bx-money', text:
'Financeiro' },
{ url: 'relatorios.html', icon: 'bx-file', text:
'Relatórios' },
{ url: 'calculadora.html', icon: 'bx-calculator', text:
'Calculadora' },
{ url: 'configuracoes.html', icon: 'bx-cog', text:
'Configurações' }
];
// Encontrar o elemento sidebar
const sidebar = document.querySelector('.sidebar');
// Se não existir sidebar, não fazer nada
if (!sidebar) return;
// Criar o cabeçalho da sidebar
const header = document.createElement('div');
header.className = 'sidebar-header';
header.innerHTML = '<img src="assets/images/logo.png"
alt="Appvex" class="logo">';
// Criar o menu de navegação
const nav = document.createElement('nav');
nav.className = 'sidebar-menu';
// Determinar a página atual
const currentPage =
window.location.pathname.split('/').pop() || 'index.html';
// Adicionar cada item ao menu
menuItems.forEach(item => {
const link = document.createElement('a');
link.href = item.url;
link.className = 'sidebar-menu-item';
// Marcar o item ativo
if (currentPage === item.url) {
link.classList.add('active');
}
link.innerHTML = `
 <i class='bx ${item.icon}'></i>
 <span>${item.text}</span>
 `;
nav.appendChild(link);
});
// Limpar e reconstruir a sidebar
sidebar.innerHTML = '';
sidebar.appendChild(header);
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
