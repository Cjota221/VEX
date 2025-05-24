/**
 * Gerenciamento de Modais
 * Controla a abertura e fechamento de modais em todo o
aplicativo
 */
document.addEventListener('DOMContentLoaded', function() {
// Selecionar todos os botões que abrem modais
const modalTriggers = document.querySelectorAll('[datamodal]');
// Selecionar todos os botões que fecham modais
const modalClosers = document.querySelectorAll('.modalclose');
// Adicionar evento de clique para abrir modais
modalTriggers.forEach(trigger => {
trigger.addEventListener('click', function() {
const modalId = this.getAttribute('data-modal');
const modal = document.getElementById(modalId);
if (modal) {
modal.classList.add('active');
document.body.style.overflow = 'hidden'; //
Impedir rolagem do body
}
});
});
// Adicionar evento de clique para fechar modais
modalClosers.forEach(closer => {
closer.addEventListener('click', function() {
const modal = this.closest('.modal');
if (modal) {
modal.classList.remove('active');
document.body.style.overflow = ''; // Restaurar
rolagem do body
}
});
});
// Fechar modal ao clicar fora do conteúdo
document.addEventListener('click', function(event) {
if (event.target.classList.contains('modal')) {
event.target.classList.remove('active');
document.body.style.overflow = ''; // Restaurar
rolagem do body
}
});
// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
if (event.key === 'Escape') {
const activeModal =
document.querySelector('.modal.active');
if (activeModal) {
activeModal.classList.remove('active');
document.body.style.overflow = ''; // Restaurar
rolagem do body
}
}
});
});
