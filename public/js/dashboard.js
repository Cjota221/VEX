/**
 * Dashboard do Appvex
 * Script para inicializar gráficos e funcionalidades
interativas
 */
document.addEventListener('DOMContentLoaded', function() {
// Configuração de cores
const colors = {
primary: '#3a86ff',
success: '#38b000',
danger: '#e5383b',
warning: '#ffbe0b',
info: '#4cc9f0',
text: '#e9ecef',
textSecondary: '#ced4da',
background: '#121a2b',
backgroundSecondary: '#1a2438'
};
// Configuração comum para gráficos
const commonOptions = {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: {
display: false
},
tooltip: {
mode: 'index',
intersect: false,
backgroundColor: colors.backgroundSecondary,
titleColor: colors.text,
bodyColor: colors.textSecondary,
borderColor: colors.primary,
borderWidth: 1
}
},
scales: {
x: {
display: false
},
y: {
display: false
}
},
elements: {
line: {
tension: 0.4,
borderWidth: 2
},
point: {
radius: 0
}
}
};
// Dados para os minigráficos
const generateSparklineData = (count, min, max, trend =
'up') => {
const data = [];
let value = Math.floor(Math.random() * (max - min + 1))
+ min;
for (let i = 0; i < count; i++) {
// Tendência para cima ou para baixo
const change = Math.random() * 10;
if (trend === 'up') {
value += Math.random() > 0.3 ? change : -change/
2;
} else {
value -= Math.random() > 0.3 ? change : -change/
2;
}
// Manter dentro dos limites
value = Math.max(min, Math.min(max, value));
data.push(value);
}
return data;
};
// Gerar labels para os últimos 30 dias
const generateDailyLabels = (days) => {
const labels = [];
const today = new Date();
for (let i = days - 1; i >= 0; i--) {
const date = new Date();
date.setDate(today.getDate() - i);
labels.push(date.toLocaleDateString('pt-BR', { day:
'2-digit', month: '2-digit' }));
}
return labels;
};
// Inicializar minigráficos nos cards
const initSparklines = () => {
// Gráfico de produção
if (document.getElementById('productionChart')) {
new
Chart(document.getElementById('productionChart'), {
type: 'line',
data: {
labels: Array(14).fill(''),
datasets: [{
data: generateSparklineData(14, 150,
300, 'up'),
borderColor: colors.primary,
backgroundColor:
hexToRgba(colors.primary, 0.2),
fill: true
}]
},
options: commonOptions
});
}
// Gráfico de lucro
if (document.getElementById('profitChart')) {
new Chart(document.getElementById('profitChart'), {
type: 'line',
data: {
labels: Array(14).fill(''),
datasets: [{
data: generateSparklineData(14, 8000,
15000, 'up'),
borderColor: colors.success,
backgroundColor:
hexToRgba(colors.success, 0.2),
fill: true
}]
},
options: commonOptions
});
}
// Gráfico de eficiência
if (document.getElementById('efficiencyChart')) {
new
Chart(document.getElementById('efficiencyChart'), {
type: 'line',
data: {
labels: Array(14).fill(''),
datasets: [{
data: generateSparklineData(14, 80,
100, 'up'),
borderColor: colors.info,
backgroundColor: hexToRgba(colors.info,
0.2),
fill: true
}]
},
options: commonOptions
});
}
};
// Inicializar gráfico principal
const initMainChart = () => {
if (document.getElementById('mainProductionChart')) {
const labels = generateDailyLabels(30);
new
Chart(document.getElementById('mainProductionChart'), {
type: 'line',
data: {
labels: labels,
datasets: [
{
label: 'Produção Real',
data: generateSparklineData(30, 5,
20, 'up'),
borderColor: colors.primary,
backgroundColor:
hexToRgba(colors.primary, 0.1),
fill: true
},
{
label: 'Meta',
data: Array(30).fill(15),
borderColor: colors.warning,
borderDash: [5, 5],
backgroundColor: 'transparent',
fill: false
}
]
},
options: {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: {
display: true,
position: 'top',
labels: {
color: colors.text,
font: {
family: "'Poppins', sansserif",
size: 12
}
}
},
tooltip: {
mode: 'index',
intersect: false,
backgroundColor:
colors.backgroundSecondary,
titleColor: colors.text,
bodyColor: colors.textSecondary,
borderColor: colors.primary,
borderWidth: 1
}
},
scales: {
x: {
display: true,
grid: {
color: hexToRgba(colors.text,
0.1)
},
ticks: {
color: colors.textSecondary,
maxRotation: 0,
callback: function(value,
index, values) {
// Mostrar apenas alguns
labels para evitar sobreposição
return index % 5 === 0 ?
this.getLabelForValue(value) : '';
}
}
},
y: {
display: true,
grid: {
color: hexToRgba(colors.text,
0.1)
},
ticks: {
color: colors.textSecondary
}
}
},
elements: {
line: {
tension: 0.4,
borderWidth: 2
},
point: {
radius: 0,
hoverRadius: 6
}
},
interaction: {
mode: 'nearest',
axis: 'x',
intersect: false
}
}
});
}
};
// Função auxiliar para converter hex para rgba
function hexToRgba(hex, alpha) {
const r = parseInt(hex.slice(1, 3), 16);
const g = parseInt(hex.slice(3, 5), 16);
const b = parseInt(hex.slice(5, 7), 16);
return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
// Inicializar todos os gráficos
initSparklines();
initMainChart();
// Adicionar interatividade aos botões de período do gráfico
const periodButtons = document.querySelectorAll('.btngroup .btn');
periodButtons.forEach(button => {
button.addEventListener('click', function() {
// Remover classe active de todos os botões
periodButtons.forEach(btn =>
btn.classList.remove('active'));
// Adicionar classe active ao botão clicado
this.classList.add('active');
// Aqui você implementaria a lógica para atualizar o
gráfico
// com base no período selecionado
});
});
// Adicionar animação de hover aos cards
const cards = document.querySelectorAll('.dashboard-card');
cards.forEach(card => {
card.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-5px)';
this.style.boxShadow = '0 20px 25px -5px rgba(0, 0,
0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
});
card.addEventListener('mouseleave', function() {
this.style.transform = 'translateY(0)';
this.style.boxShadow = '0 10px 15px -3px rgba(0, 0,
0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
});
});
});
