// filters.js - Funções para filtros dinâmicos e buscas

console.log("filters.js loaded.");

/**
 * Filtra as linhas de uma tabela com base no texto de busca.
 * @param {HTMLInputElement} searchInput - O campo de input da busca.
 * @param {HTMLTableElement} tableElement - A tabela a ser filtrada.
 * @param {string} rowSelector - Seletor CSS para as linhas de dados da tabela (ex: 'tbody tr').
 * @param {string} cellSelector - Seletor CSS para as células dentro das linhas a serem consideradas na busca (opcional, default: 'td').
 */
const filterTableBySearch = (searchInput, tableElement, rowSelector = 'tbody tr', cellSelector = 'td') => {
    if (!searchInput || !tableElement) {
        console.warn("Search input or table element not provided for filtering.");
        return;
    }

    const searchTerm = searchInput.value.toLowerCase().trim();
    const tableRows = tableElement.querySelectorAll(rowSelector);

    tableRows.forEach(row => {
        const cells = row.querySelectorAll(cellSelector);
        let rowText = '';
        cells.forEach(cell => {
            // Ignora colunas com botões ou elementos não textuais, se necessário
            if (!cell.querySelector('button') && !cell.querySelector('input') && !cell.querySelector('.progress')) {
                 rowText += cell.textContent.toLowerCase() + ' ';
            }
        });

        // Verifica se o texto da linha contém o termo de busca
        if (rowText.includes(searchTerm)) {
            row.style.display = ""; // Mostra a linha
        } else {
            row.style.display = "none"; // Esconde a linha
        }
    });

    // Opcional: Atualizar contador de resultados ou mensagem "nenhum resultado"
    updateResultCount(tableElement, rowSelector);
};

/**
 * Filtra as linhas de uma tabela com base em múltiplos critérios (selects, checkboxes, etc.).
 * @param {Array<HTMLElement>} filterControls - Array de elementos de controle de filtro (ex: selects).
 * @param {HTMLTableElement} tableElement - A tabela a ser filtrada.
 * @param {string} rowSelector - Seletor CSS para as linhas de dados da tabela.
 * @param {Function} criteriaMatcher - Função que recebe uma linha (row) e os valores dos filtros e retorna true se a linha corresponde aos critérios.
 */
const filterTableByCriteria = (filterControls, tableElement, rowSelector = 'tbody tr', criteriaMatcher) => {
    if (!filterControls || filterControls.length === 0 || !tableElement || !criteriaMatcher) {
        console.warn("Filter controls, table element, or criteria matcher not provided.");
        return;
    }

    const filterValues = {};
    filterControls.forEach(control => {
        // Assume que o ID ou NAME do controle corresponde à chave do critério
        const key = control.id || control.name;
        if (key) {
            filterValues[key] = control.value;
        }
    });

    const tableRows = tableElement.querySelectorAll(rowSelector);

    tableRows.forEach(row => {
        if (criteriaMatcher(row, filterValues)) {
            row.style.display = ""; // Mostra a linha
        } else {
            row.style.display = "none"; // Esconde a linha
        }
    });

    updateResultCount(tableElement, rowSelector);
};

/**
 * Atualiza a contagem de resultados visíveis em uma tabela (exemplo).
 * @param {HTMLTableElement} tableElement
 * @param {string} rowSelector
 */
const updateResultCount = (tableElement, rowSelector) => {
    const visibleRows = Array.from(tableElement.querySelectorAll(rowSelector)).filter(row => row.style.display !== 'none').length;
    const totalRows = tableElement.querySelectorAll(rowSelector).length;
    const footer = tableElement.closest('.card')?.querySelector('.card-footer'); // Encontra o rodapé do card

    if (footer) {
        const countElement = footer.querySelector('div:first-child'); // Assume que o primeiro div mostra a contagem
        if (countElement) {
            countElement.textContent = `Mostrando ${visibleRows} de ${totalRows} itens`;
        }
    }
    console.log(`Table ${tableElement.id || 'unidentified'} filtered. Visible rows: ${visibleRows}`);
};


// --- Inicialização e Aplicação dos Filtros --- //

document.addEventListener("DOMContentLoaded", () => {

    // Exemplo: Filtro de busca para a tabela de Insumos
    const insumosSearchInput = document.querySelector("#insumosPage input[placeholder*='Buscar insumos']"); // Precisa de um ID na página ou input
    const insumosTable = document.querySelector("#insumosPage table"); // Precisa de um ID na página ou tabela

    if (insumosSearchInput && insumosTable) {
        // Adiciona um ID para referência, se não houver
        if (!insumosTable.id) insumosTable.id = "insumosTable";
        if (!insumosSearchInput.closest("main").id) insumosSearchInput.closest("main").id = "insumosPage"; // Exemplo de ID na página

        insumosSearchInput.addEventListener("input", () => {
            filterTableBySearch(insumosSearchInput, insumosTable);
        });
        console.log("Search filter initialized for Insumos table.");
    } else {
        // console.warn("Could not initialize search filter for Insumos: elements not found.");
    }

    // Exemplo: Filtro de busca para a tabela de Produções
    // (Assumindo que haja uma busca na página de produção)
    const producaoSearchInput = document.querySelector("#producaoPage input[placeholder*='Buscar produções']"); // Adaptar seletor
    const producaoTable = document.querySelector("#producaoPage table"); // Adaptar seletor

    if (producaoSearchInput && producaoTable) {
         if (!producaoTable.id) producaoTable.id = "producaoTable";
         if (!producaoSearchInput.closest("main").id) producaoSearchInput.closest("main").id = "producaoPage";

        producaoSearchInput.addEventListener("input", () => {
            filterTableBySearch(producaoSearchInput, producaoTable);
        });
        console.log("Search filter initialized for Produção table.");
    }

    // Exemplo: Filtro por critérios (Select) para a tabela de Insumos
    const insumosFilterSelect = document.querySelector("#insumosPage select[class*='form-select']"); // Adaptar seletor
    const insumosFilterButton = document.querySelector("#insumosPage button:has(i.bx-filter)"); // Botão de filtrar

    if (insumosFilterSelect && insumosTable && insumosFilterButton) {
        insumosFilterButton.addEventListener("click", () => {
            filterTableByCriteria([insumosFilterSelect], insumosTable, 'tbody tr', (row, filterValues) => {
                const unidadeCellValue = row.querySelector('td:nth-child(2)')?.textContent.trim(); // Coluna da Unidade
                const selectedUnidade = filterValues[insumosFilterSelect.id || insumosFilterSelect.name];

                // Se "Todos os insumos" for selecionado, mostra a linha
                if (!selectedUnidade || selectedUnidade === "") {
                    return true;
                }
                // Compara a unidade da linha com a selecionada
                return unidadeCellValue === selectedUnidade;
            });
        });
        console.log("Criteria filter initialized for Insumos table.");
    }

    // Adicionar inicializações para outras tabelas e filtros (Modelos, Financeiro, Estoque, etc.)
    // Será necessário adaptar os seletores e a lógica da função criteriaMatcher para cada caso.

    console.log("filters.js setup complete.");
});

