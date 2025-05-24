/**
 * Script de Verificação de Integridade do Deploy
 * Verifica se todos os arquivos necessários estão presentes
 */
const requiredFiles = [
'index.html',
'login.html',
'insumos.html',
'modelos.html',
'producao.html',
'estoque.html',
'financeiro.html',
'relatorios.html',
'calculadora.html',
'configuracoes.html',
'css/layout.css',
'css/variables.css',
'css/reset.css',
'css/utilities.css',
'css/components/forms.css',
'css/components/cards.css',
'css/components/buttons.css',
'css/components/tables.css',
'css/components/modals.css',
'js/main.js',
'js/menu.js',
'assets/images/logo.png'
];
function checkFiles() {
console.log('Verificando integridade do deploy...');
const missing = [];
let checked = 0;
requiredFiles.forEach(file => {
fetch(file)
.then(response => {
checked++;
if (!response.ok) {
missing.push(file);
console.error(` Arquivo não encontrado: $
{file}`);
} else {
console.log(` Arquivo encontrado: ${file}
`);
}
// Quando todos os arquivos forem verificados
if (checked === requiredFiles.length) {
reportResults(missing);
}
})
.catch(error => {
checked++;
missing.push(file);
console.error(` Erro ao verificar arquivo $
{file}: ${error}`);
// Quando todos os arquivos forem verificados
if (checked === requiredFiles.length) {
reportResults(missing);
}
});
});
}
function reportResults(missing) {
if (missing.length > 0) {
console.error(' ALERTA: Arquivos ausentes no
deploy:', missing);
// Adicionar alerta visual na página
const alert = document.createElement('div');
alert.style.cssText = `
 position: fixed;
 bottom: 20px;
 right: 20px;
 background-color: #ff4444;
 color: white;
 padding: 15px;
 border-radius: 5px;
 box-shadow: 0 4px 8px rgba(0,0,0,0.2);
 z-index: 9999;
 max-width: 300px;
 `;
alert.innerHTML = `
 <h3 style="margin-top: 0;">Problemas no Deploy</h3>
 <p>Foram encontrados ${missing.length} arquivos
ausentes.</p>
 <button
onclick="this.parentNode.style.display='none'"
style="background: white; color: #ff4444; border: none; padding:
5px 10px; border-radius: 3px; cursor: pointer; margin-top:
10px;">Fechar</button>
 `;
document.body.appendChild(alert);
} else {
console.log(' Todos os arquivos necessários estão
presentes!');
}
}
// Executar verificação quando a página carregar completamente
window.addEventListener('load', checkFiles);
