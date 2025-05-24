/**
 * Verificação de Compatibilidade do Navegador
 * Verifica se o navegador suporta todos os recursos necessários
 */
document.addEventListener('DOMContentLoaded', function() {
const requiredFeatures = [
{ name: 'Flexbox', test: () => CSS.supports('display',
'flex') },
{ name: 'Grid', test: () => CSS.supports('display',
'grid') },
{ name: 'Fetch API', test: () => 'fetch' in window },
{ name: 'ES6 Features', test: () => {
try {
eval('const test = () => {}; class Test {}; new
Promise(() => {});');
return true;
} catch (e) {
return false;
}
}},
{ name: 'LocalStorage', test: () => 'localStorage' in
window }
];
const incompatibleFeatures =
requiredFeatures.filter(feature => !feature.test());
if (incompatibleFeatures.length > 0) {
showCompatibilityWarning(incompatibleFeatures);
}
});
/**
 * Exibe aviso de compatibilidade
 */
function showCompatibilityWarning(incompatibleFeatures) {
const warning = document.createElement('div');
warning.className = 'compatibility-warning';
warning.style.cssText = `
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 background-color: #ef4444;
 color: white;
 padding: 10px 20px;
 text-align: center;
 z-index: 9999;
 font-size: 14px;
 `;
warning.innerHTML = `
 <strong>Atenção:</strong> Seu navegador pode não
suportar todos os recursos necessários para o funcionamento
correto deste aplicativo.
 Recursos não suportados: ${incompatibleFeatures.map(f
=> f.name).join(', ')}.
 <button id="dismiss-warning" style="background: white;
color: #ef4444; border: none; padding: 3px 8px; margin-left:
10px; border-radius: 3px; cursor: pointer;">Entendi</button>
 `;
document.body.appendChild(warning);
document.getElementById('dismisswarning').addEventListener('click', function() {
warning.style.display = 'none';
});
}
