/**
 * Menu Lateral Padronizado
 * Este script injeta o mesmo menu lateral em todas as páginas
 */
document.addEventListener('DOMContentLoaded', function() {
// Garantir que o modo escuro esteja aplicado
document.body.classList.add('dark-mode');
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
'Configurações' },
{ url: 'ajuda.html', icon: 'bx-help-circle', text:
'Ajuda & Suporte' }
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
logo.innerHTML = '<h1 class="logo">VEX</h1>';
sidebar.appendChild(logo);
// Criar o menu
const menu = document.createElement('div');
menu.className = 'sidebar-menu';
// Obter o caminho atual para destacar o item ativo
const currentPath = window.location.pathname;
const currentPage = currentPath.split('/').pop() ||
'index.html';
// Adicionar os itens do menu
menuItems.forEach(item => {
const menuItem = document.createElement('a');
menuItem.href = item.url;
menuItem.className = 'sidebar-menu-item';
// Verificar se é o item ativo
if (currentPage === item.url) {
menuItem.classList.add('active');
}
menuItem.innerHTML = `
 <i class='bx ${item.icon}'></i>
 <span>${item.text}</span>
 `;
menu.appendChild(menuItem);
});
sidebar.appendChild(menu);
// Adicionar botão de toggle para mobile
const toggleBtn = document.createElement('button');
toggleBtn.className = 'sidebar-toggle';
toggleBtn.innerHTML = '<i class="bx bx-menu"></i>';
toggleBtn.style.display = 'none'; // Esconder por padrão
// Adicionar ao body
document.body.appendChild(toggleBtn);
// Adicionar evento de toggle
toggleBtn.addEventListener('click', function() {
sidebar.classList.toggle('open');
});
// Mostrar/esconder toggle button baseado no tamanho da tela
function handleResize() {
if (window.innerWidth <= 768) {
toggleBtn.style.display = 'block';
} else {
toggleBtn.style.display = 'none';
sidebar.classList.remove('open');
}
}
// Inicializar
handleResize();
// Adicionar listener para redimensionamento
window.addEventListener('resize', handleResize);
});
/**
 * Exibe mensagem de alerta
 */
function showAlert(message, type = 'info') {
const alertContainer = document.querySelector('.alertcontainer') || createAlertContainer();
const alert = document.createElement('div');
alert.className = `alert alert-${type}`;
alert.innerHTML = `
 <span>${message}</span>
 <button class="alert-close">&times;</button>
 `;
alertContainer.appendChild(alert);
// Auto-remover após 5 segundos
setTimeout(() => {
alert.classList.add('fade-out');
setTimeout(() => alert.remove(), 300);
}, 5000);
// Fechar ao clicar no botão
alert.querySelector('.alertclose').addEventListener('click', function() {
alert.classList.add('fade-out');
setTimeout(() => alert.remove(), 300);
});
}
/**
 * Cria container para alertas
 */
function createAlertContainer() {
const container = document.createElement('div');
container.className = 'alert-container';
document.body.appendChild(container);
return container;
}
