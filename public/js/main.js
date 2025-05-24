/**
 * Script principal do Appvex
 * Contém funcionalidades comuns a todas as páginas
 */
document.addEventListener('DOMContentLoaded', function() {
// Adicionar toggle de menu para mobile
addMobileMenuToggle();
// Inicializar tooltips
initTooltips();
// Inicializar modais
initModals();
// Inicializar dropdowns
initDropdowns();
});
/**
 * Adiciona botão de toggle para o menu mobile
 */
function addMobileMenuToggle() {
// Verificar se já existe um toggle
if (document.querySelector('.menu-toggle')) return;
// Criar o botão de toggle
const toggle = document.createElement('div');
toggle.className = 'menu-toggle';
toggle.innerHTML = '<i class="bx bx-menu"></i>';
// Adicionar ao body
document.body.appendChild(toggle);
// Adicionar evento de click
toggle.addEventListener('click', function() {
const sidebar = document.querySelector('.sidebar');
if (sidebar) {
sidebar.classList.toggle('active');
// Alternar ícone
const icon = this.querySelector('i');
if (icon.classList.contains('bx-menu')) {
icon.classList.remove('bx-menu');
icon.classList.add('bx-x');
} else {
icon.classList.remove('bx-x');
icon.classList.add('bx-menu');
}
}
});
// Fechar menu ao clicar fora
document.addEventListener('click', function(event) {
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.menu-toggle');
if (sidebar && sidebar.classList.contains('active') &&
!sidebar.contains(event.target) &&
!toggle.contains(event.target)) {
sidebar.classList.remove('active');
// Restaurar ícone
const icon = toggle.querySelector('i');
icon.classList.remove('bx-x');
icon.classList.add('bx-menu');
}
});
}
/**
 * Inicializa tooltips
 */
function initTooltips() {
const tooltipTriggers = document.querySelectorAll('[datatooltip]');
tooltipTriggers.forEach(trigger => {
trigger.addEventListener('mouseenter', function() {
const tooltipText = this.getAttribute('datatooltip');
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
tooltip.textContent = tooltipText;
document.body.appendChild(tooltip);
const triggerRect = this.getBoundingClientRect();
const tooltipRect = tooltip.getBoundingClientRect();
tooltip.style.top = (triggerRect.top -
tooltipRect.height - 10) + 'px';
tooltip.style.left = (triggerRect.left +
(triggerRect.width / 2) - (tooltipRect.width / 2)) + 'px';
tooltip.classList.add('active');
});
trigger.addEventListener('mouseleave', function() {
const tooltip =
document.querySelector('.tooltip.active');
if (tooltip) {
tooltip.remove();
}
});
});
}
/**
 * Inicializa modais
 */
function initModals() {
const modalTriggers = document.querySelectorAll('[datamodal]');
const modalClosers = document.querySelectorAll('.modalclose');
modalTriggers.forEach(trigger => {
trigger.addEventListener('click', function() {
const modalId = this.getAttribute('data-modal');
const modal = document.getElementById(modalId);
if (modal) {
modal.classList.add('active');
document.body.style.overflow = 'hidden';
}
});
});
modalClosers.forEach(closer => {
closer.addEventListener('click', function() {
const modal = this.closest('.modal');
if (modal) {
modal.classList.remove('active');
document.body.style.overflow = '';
}
});
});
document.addEventListener('click', function(event) {
if (event.target.classList.contains('modal')) {
event.target.classList.remove('active');
document.body.style.overflow = '';
}
});
}
/**
 * Inicializa dropdowns
 */
function initDropdowns() {
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
const trigger = dropdown.querySelector('.dropdowntrigger');
const menu = dropdown.querySelector('.dropdown-menu');
if (trigger && menu) {
trigger.addEventListener('click', function(e) {
e.stopPropagation();
menu.classList.toggle('active');
});
}
});
document.addEventListener('click', function() {
const activeMenus =
document.querySelectorAll('.dropdown-menu.active');
activeMenus.forEach(menu =>
menu.classList.remove('active'));
});
}
/**
 * Formata valores monetários
 */
function formatCurrency(value) {
return new Intl.NumberFormat('pt-BR', {
style: 'currency',
currency: 'BRL'
}).format(value);
}
/**
 * Formata datas
 */
function formatDate(dateString) {
const date = new Date(dateString);
return date.toLocaleDateString('pt-BR');
}
