/**
 * Script principal do Appvex
 * Contém funcionalidades comuns a todas as páginas
 */
document.addEventListener('DOMContentLoaded', function() {
// Inicializar tooltips
initTooltips();
// Inicializar modais
initModals();
// Inicializar dropdowns
initDropdowns();
});
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
