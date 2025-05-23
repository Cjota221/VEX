// updateData.js - Funções para atualização dinâmica de dados na interface

console.log("updateData.js loaded.");

// --- Funções de Atualização da UI --- //

/**
 * Atualiza o conteúdo de um elemento HTML específico.
 * @param {string} selector - Seletor CSS do elemento a ser atualizado.
 * @param {string} content - Novo conteúdo HTML ou texto.
 */
const updateElementContent = (selector, content) => {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = content;
        console.log(`Element ${selector} updated.`);
    } else {
        console.warn(`Element ${selector} not found for updating.`);
    }
};

/**
 * Atualiza os valores nos cards do Dashboard.
 * (Função Placeholder - precisará de dados reais do backend)
 * @param {object} dashboardData - Objeto com os dados do dashboard.
 *                                Ex: { totalProduzidoMes: 250, lucroEstimado: 12450, estoqueCritico: 3, ultimaProducao: { modelo: 'XYZ', qtd: 50, data: '20/05/2025' } }
 */
const updateDashboardCards = (dashboardData) => {
    console.log("Attempting to update dashboard cards with data:", dashboardData);
    if (!dashboardData) return;

    // Exemplo: Atualizar card "Total Produzido no Mês"
    updateElementContent("#dashboardCardProduzido h2", dashboardData.totalProduzidoMes || "-");
    // updateElementContent("#dashboardCardProduzido p", dashboardData.variacaoProduzido || ""); // Atualizar variação percentual

    // Exemplo: Atualizar card "Lucro Estimado"
    updateElementContent("#dashboardCardLucro h2", `R$ ${dashboardData.lucroEstimado?.toFixed(2).replace('.', ',') || "-"}`);
    // updateElementContent("#dashboardCardLucro p", dashboardData.variacaoLucro || "");

    // Exemplo: Atualizar card "Insumos em Estoque Crítico"
    updateElementContent("#dashboardCardCritico h2", dashboardData.estoqueCritico || "0");

    // Exemplo: Atualizar card "Última Produção"
    if (dashboardData.ultimaProducao) {
        updateElementContent("#dashboardCardUltimaProducao h2", dashboardData.ultimaProducao.modelo || "-");
        updateElementContent("#dashboardCardUltimaProducao p:nth-of-type(1)", `Quantidade: ${dashboardData.ultimaProducao.qtd || '-'} unidades`);
        updateElementContent("#dashboardCardUltimaProducao p:nth-of-type(2)", `Data: ${dashboardData.ultimaProducao.data || '-'}`);
    }

    // Adicionar IDs aos cards no HTML para seletores mais robustos (ex: id="dashboardCardProduzido")
    console.warn("updateDashboardCards is a placeholder. Ensure HTML elements have appropriate IDs for robust selection.");
};

/**
 * Adiciona uma nova linha a uma tabela HTML.
 * (Função Placeholder - precisará de dados reais e estrutura da tabela)
 * @param {string} tableSelector - Seletor CSS da tabela (ex: '#insumosTable tbody').
 * @param {object} rowData - Objeto com os dados da nova linha.
 * @param {Function} createRowElement - Função que recebe rowData e retorna um elemento TR (linha da tabela).
 */
const addRowToTable = (tableSelector, rowData, createRowElement) => {
    const tableBody = document.querySelector(tableSelector);
    if (!tableBody || !rowData || !createRowElement) {
        console.error("Table body, row data, or createRowElement function not provided.");
        return;
    }

    const newRow = createRowElement(rowData);
    if (newRow instanceof HTMLTableRowElement) {
        tableBody.appendChild(newRow); // Ou prepend para adicionar no início
        console.log(`New row added to table ${tableSelector}.`);
        // Opcional: Atualizar contagem de resultados
        // updateResultCount(tableBody.closest('table'), 'tr');
    } else {
        console.error("createRowElement did not return a valid table row element (TR).");
    }
};

/**
 * Atualiza uma linha existente em uma tabela HTML.
 * (Função Placeholder - precisará identificar a linha a ser atualizada)
 * @param {string} rowSelector - Seletor CSS para encontrar a linha específica (ex: `tr[data-id='${rowData.id}']`).
 * @param {object} rowData - Objeto com os novos dados da linha.
 * @param {Function} updateRowElement - Função que recebe o elemento TR existente e rowData, e atualiza as células.
 */
const updateTableRow = (rowSelector, rowData, updateRowElement) => {
    const rowElement = document.querySelector(rowSelector);
    if (!rowElement || !rowData || !updateRowElement) {
        console.error("Row element, row data, or updateRowElement function not provided.");
        return;
    }

    updateRowElement(rowElement, rowData);
    console.log(`Row ${rowSelector} updated.`);
};

/**
 * Remove uma linha de uma tabela HTML.
 * @param {string} rowSelector - Seletor CSS para encontrar a linha específica a ser removida.
 */
const removeTableRow = (rowSelector) => {
    const rowElement = document.querySelector(rowSelector);
    if (rowElement) {
        rowElement.remove();
        console.log(`Row ${rowSelector} removed.`);
        // Opcional: Atualizar contagem de resultados
    } else {
        console.warn(`Row ${rowSelector} not found for removal.`);
    }
};

/**
 * Atualiza os dados de um gráfico.
 * (Função Placeholder - dependerá da biblioteca de gráficos utilizada, ex: Chart.js)
 * @param {string} chartId - ID do canvas ou container do gráfico.
 * @param {object} chartData - Novos dados para o gráfico.
 */
const updateChartData = (chartId, chartData) => {
    console.log(`Placeholder: Updating chart ${chartId} with data:`, chartData);
    // Exemplo com Chart.js (requer instância do gráfico)
    // const chartInstance = Chart.getChart(chartId);
    // if (chartInstance) {
    //     chartInstance.data = chartData; // Atualiza os dados
    //     chartInstance.update(); // Redesenha o gráfico
    //     console.log(`Chart ${chartId} updated.`);
    // } else {
    //     console.warn(`Chart instance ${chartId} not found.`);
    // }
    console.warn("updateChartData is a placeholder. Implementation depends on the charting library.");
};

// --- Exemplo de Uso (Simulado) --- //

// Esta função seria chamada após uma operação bem-sucedida no backend (ex: salvar um novo insumo)
const handleInsumoSaved = (newInsumoData) => {
    // 1. Fechar o modal de adição/edição (se aplicável - pode estar no main.js)
    // closeModal(document.getElementById('addInsumoModal'));

    // 2. Adicionar a nova linha na tabela de insumos
    addRowToTable("#insumosTable tbody", newInsumoData, (data) => {
        // Função para criar o elemento TR da linha do insumo
        const tr = document.createElement('tr');
        // Preencher as células (td) com base nos dados (data.nome, data.unidade, etc.)
        // Adicionar botões de ação (editar, excluir)
        // Exemplo simplificado:
        tr.innerHTML = `
            <td>${data.nome || '-'}</td>
            <td>${data.unidade || '-'}</td>
            <td>R$ ${parseFloat(data.preco_unitario || 0).toFixed(2).replace('.', ',')}</td>
            <td>${data.estoque_atual || 0}</td>
            <td>${data.estoque_minimo || 0}</td>
            <td><!-- Status/Progress Bar --></td>
            <td><!-- Action Buttons --></td>
        `;
        // Adicionar data-id='data.id' ao TR para futuras atualizações/remoções
        tr.dataset.id = data.id;
        return tr;
    });

    // 3. Opcional: Atualizar algum card no dashboard se relevante
    // fetchDashboardData().then(updateDashboardCards); // Exemplo de como buscar e atualizar
};

// Esta função seria chamada para buscar e atualizar dados periodicamente ou sob demanda
const refreshDashboard = async () => {
    console.log("Placeholder: Fetching and updating dashboard data...");
    // const data = await fetchDataFromBackend('/api/dashboard'); // Exemplo
    const mockData = {
        totalProduzidoMes: 300,
        lucroEstimado: 15000,
        estoqueCritico: 2,
        ultimaProducao: { modelo: 'ABC', qtd: 40, data: '22/05/2025' }
    };
    updateDashboardCards(mockData);
    // updateChartData('productionChart', await fetchDataFromBackend('/api/charts/production')); // Exemplo
};

console.log("updateData.js setup complete with placeholder functions.");

