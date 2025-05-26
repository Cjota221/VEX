/**
 * calculator.js - Funcionalidades da calculadora de custos e preços
 * Este arquivo implementa as funcionalidades específicas da página de calculadora,
 * incluindo cálculos de custos, preços e margens.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const modelSelect = document.getElementById('modelSelect');
    const quantity = document.getElementById('quantity');
    const laborCost = document.getElementById('laborCost');
    const overheadCost = document.getElementById('overheadCost');
    const totalCost = document.getElementById('totalCost');
    const unitCost = document.getElementById('unitCost');
    const marginPercent = document.getElementById('marginPercent');
    const taxPercent = document.getElementById('taxPercent');
    const suggestedPrice = document.getElementById('suggestedPrice');
    const finalPrice = document.getElementById('finalPrice');
    const actualMargin = document.getElementById('actualMargin');
    const profitAmount = document.getElementById('profitAmount');
    const calculateButton = document.getElementById('calculateButton');
    const resetButton = document.getElementById('resetButton');
    const saveCalculation = document.getElementById('saveCalculation');
    
    // Inicializa a calculadora
    initCalculator();
    
    /**
     * Inicializa a calculadora e seus eventos
     */
    function initCalculator() {
        // Carrega os dados dos modelos
        loadModels();
        
        // Adiciona eventos aos elementos
        if (modelSelect) {
            modelSelect.addEventListener('change', function() {
                loadModelDetails(this.value);
            });
        }
        
        if (quantity) {
            quantity.addEventListener('input', updateCalculations);
        }
        
        if (laborCost) {
            laborCost.addEventListener('input', updateCalculations);
        }
        
        if (overheadCost) {
            overheadCost.addEventListener('input', updateCalculations);
        }
        
        if (marginPercent) {
            marginPercent.addEventListener('input', updateCalculations);
        }
        
        if (taxPercent) {
            taxPercent.addEventListener('input', updateCalculations);
        }
        
        if (finalPrice) {
            finalPrice.addEventListener('input', updateMarginFromPrice);
        }
        
        if (calculateButton) {
            calculateButton.addEventListener('click', performCalculation);
        }
        
        if (resetButton) {
            resetButton.addEventListener('click', resetCalculator);
        }
        
        if (saveCalculation) {
            saveCalculation.addEventListener('click', saveCurrentCalculation);
        }
        
        // Inicializa os cálculos
        updateCalculations();
    }
    
    /**
     * Carrega os modelos disponíveis
     */
    function loadModels() {
        // Simulação de carregamento de modelos
        // Em um ambiente real, isso seria uma chamada AJAX para o backend
        console.log('Modelos carregados');
    }
    
    /**
     * Carrega os detalhes de um modelo específico
     * @param {string} modelId - O ID do modelo selecionado
     */
    function loadModelDetails(modelId) {
        if (!modelId) return;
        
        // Simulação de carregamento de detalhes do modelo
        // Em um ambiente real, isso seria uma chamada AJAX para o backend
        console.log(`Carregando detalhes do modelo ${modelId}`);
        
        // Atualiza a tabela de insumos com base no modelo selecionado
        updateInsumos(modelId);
        
        // Atualiza os cálculos
        updateCalculations();
    }
    
    /**
     * Atualiza a tabela de insumos com base no modelo selecionado
     * @param {string} modelId - O ID do modelo selecionado
     */
    function updateInsumos(modelId) {
        const insumosTable = document.getElementById('insumosTable');
        if (!insumosTable) return;
        
        // Simulação de dados de insumos
        // Em um ambiente real, isso seria baseado nos dados retornados do backend
        let html = '';
        
        if (modelId === '1') { // Modelo XYZ
            html = `
                <tr>
                    <td>Tecido Algodão</td>
                    <td>2 m</td>
                    <td>R$ 25,00</td>
                    <td>R$ 50,00</td>
                </tr>
                <tr>
                    <td>Linha Poliéster</td>
                    <td>1 unid</td>
                    <td>R$ 5,50</td>
                    <td>R$ 5,50</td>
                </tr>
                <tr>
                    <td>Botões Plásticos</td>
                    <td>8 unid</td>
                    <td>R$ 0,25</td>
                    <td>R$ 2,00</td>
                </tr>
            `;
            document.getElementById('totalInsumos').innerHTML = '<strong>R$ 57,50</strong>';
        } else if (modelId === '2') { // Modelo ABC
            html = `
                <tr>
                    <td>Tecido Algodão</td>
                    <td>1 m</td>
                    <td>R$ 25,00</td>
                    <td>R$ 25,00</td>
                </tr>
                <tr>
                    <td>Linha Poliéster</td>
                    <td>0.5 unid</td>
                    <td>R$ 5,50</td>
                    <td>R$ 2,75</td>
                </tr>
                <tr>
                    <td>Zíper Metálico</td>
                    <td>1 unid</td>
                    <td>R$ 3,75</td>
                    <td>R$ 3,75</td>
                </tr>
            `;
            document.getElementById('totalInsumos').innerHTML = '<strong>R$ 31,50</strong>';
        } else if (modelId === '3') { // Modelo DEF
            html = `
                <tr>
                    <td>Tecido Algodão</td>
                    <td>1.5 m</td>
                    <td>R$ 25,00</td>
                    <td>R$ 37,50</td>
                </tr>
                <tr>
                    <td>Linha Poliéster</td>
                    <td>1 unid</td>
                    <td>R$ 5,50</td>
                    <td>R$ 5,50</td>
                </tr>
                <tr>
                    <td>Elástico</td>
                    <td>2 m</td>
                    <td>R$ 1,20</td>
                    <td>R$ 2,40</td>
                </tr>
            `;
            document.getElementById('totalInsumos').innerHTML = '<strong>R$ 45,40</strong>';
        }
        
        insumosTable.innerHTML = html;
    }
    
    /**
     * Atualiza todos os cálculos da calculadora
     */
    function updateCalculations() {
        // Obtém os valores dos inputs
        const qtd = parseFloat(quantity.value) || 1;
        const labor = parseFloat(laborCost.value) || 0;
        const overhead = parseFloat(overheadCost.value) || 0;
        
        // Obtém o valor total dos insumos
        let insumosValue = 0;
        const totalInsumosText = document.getElementById('totalInsumos').textContent;
        const match = totalInsumosText.match(/R\$\s*([\d,.]+)/);
        if (match) {
            insumosValue = parseFloat(match[1].replace('.', '').replace(',', '.'));
        }
        
        // Calcula o custo total
        const total = (insumosValue + labor + overhead) * qtd;
        const unit = total / qtd;
        
        // Atualiza os campos de custo
        totalCost.value = total.toFixed(2);
        unitCost.value = unit.toFixed(2);
        
        // Calcula o preço sugerido
        const margin = parseFloat(marginPercent.value) || 0;
        const tax = parseFloat(taxPercent.value) || 0;
        
        // Fórmula: Preço = Custo / (1 - (Margem + Impostos) / 100)
        const price = unit / (1 - (margin + tax) / 100);
        
        // Atualiza o preço sugerido
        suggestedPrice.value = price.toFixed(2);
        
        // Se o preço final não foi alterado manualmente, atualize-o também
        if (!finalPrice.dataset.manual) {
            finalPrice.value = Math.ceil(price * 100) / 100; // Arredonda para cima com 2 casas decimais
        }
        
        // Atualiza a margem real e o lucro
        updateMarginFromPrice();
    }
    
    /**
     * Atualiza a margem real e o lucro com base no preço final
     */
    function updateMarginFromPrice() {
        const unit = parseFloat(unitCost.value) || 0;
        const price = parseFloat(finalPrice.value) || 0;
        const tax = parseFloat(taxPercent.value) || 0;
        
        // Marca o preço final como editado manualmente
        finalPrice.dataset.manual = 'true';
        
        // Calcula a margem real: (Preço - Custo - Impostos) / Preço * 100
        const taxAmount = price * (tax / 100);
        const profit = price - unit - taxAmount;
        const realMargin = (profit / price) * 100;
        
        // Atualiza os campos
        actualMargin.value = realMargin.toFixed(1) + '%';
        profitAmount.value = profit.toFixed(2);
    }
    
    /**
     * Realiza o cálculo completo
     */
    function performCalculation() {
        // Atualiza todos os cálculos
        updateCalculations();
        
        // Exibe uma notificação de sucesso
        showToast('Cálculo realizado com sucesso!', 'success');
    }
    
    /**
     * Reseta a calculadora para os valores padrão
     */
    function resetCalculator() {
        // Reseta os campos para os valores padrão
        modelSelect.value = '';
        quantity.value = '1';
        laborCost.value = '30.00';
        overheadCost.value = '15.00';
        marginPercent.value = '50';
        taxPercent.value = '12';
        finalPrice.value = '';
        finalPrice.dataset.manual = '';
        
        // Limpa a tabela de insumos
        document.getElementById('insumosTable').innerHTML = '';
        document.getElementById('totalInsumos').innerHTML = '<strong>R$ 0,00</strong>';
        
        // Atualiza os cálculos
        updateCalculations();
        
        // Exibe uma notificação
        showToast('Calculadora reiniciada', 'info');
    }
    
    /**
     * Salva o cálculo atual no histórico
     */
    function saveCurrentCalculation() {
        // Verifica se um modelo foi selecionado
        if (!modelSelect.value) {
            showToast('Selecione um modelo para salvar o cálculo', 'warning');
            return;
        }
        
        // Obtém os dados do cálculo atual
        const modelText = modelSelect.options[modelSelect.selectedIndex].text;
        const cost = unitCost.value;
        const price = finalPrice.value;
        const margin = actualMargin.value;
        
        // Cria uma nova linha na tabela de histórico
        const historyTable = document.querySelector('.card:last-child table tbody');
        if (historyTable) {
            const now = new Date();
            const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
            
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${dateStr}</td>
                <td>${modelText}</td>
                <td>R$ ${cost}</td>
                <td>R$ ${price}</td>
                <td>${margin}</td>
                <td>
                    <button class="btn btn-icon btn-sm" title="Carregar">
                        <i class='bx bx-upload'></i>
                    </button>
                    <button class="btn btn-icon btn-sm" title="Excluir">
                        <i class='bx bx-trash'></i>
                    </button>
                </td>
            `;
            
            // Adiciona a nova linha ao início da tabela
            historyTable.insertBefore(newRow, historyTable.firstChild);
            
            // Adiciona eventos aos botões da nova linha
            const loadButton = newRow.querySelector('button[title="Carregar"]');
            const deleteButton = newRow.querySelector('button[title="Excluir"]');
            
            loadButton.addEventListener('click', function() {
                // Carrega os dados deste cálculo
                modelSelect.value = modelSelect.value; // Mantém o mesmo modelo
                unitCost.value = cost;
                finalPrice.value = price;
                finalPrice.dataset.manual = 'true';
                updateMarginFromPrice();
                
                showToast('Cálculo carregado com sucesso', 'success');
            });
            
            deleteButton.addEventListener('click', function() {
                // Remove esta linha da tabela
                historyTable.removeChild(newRow);
                showToast('Cálculo removido do histórico', 'info');
            });
            
            // Exibe uma notificação de sucesso
            showToast('Cálculo salvo com sucesso!', 'success');
        }
    }
});
