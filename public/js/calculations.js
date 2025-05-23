// calculations.js - Lógica de Cálculos do Sistema VEX

console.log("calculations.js loaded.");

/**
 * Calcula o custo total dos insumos para um determinado modelo e quantidade.
 * @param {object} modelo - Objeto contendo a estrutura de insumos do modelo.
 *                          Ex: { dados_estrutura: [{insumo_id: 1, quantidade: 0.5}, {insumo_id: 2, quantidade: 3}] }
 * @param {Array} insumosList - Lista completa de insumos com seus preços.
 *                             Ex: [{id: 1, preco_unitario: 25.00}, {id: 2, preco_unitario: 0.50}]
 * @param {number} quantidadeProduzir - Quantidade de modelos a serem produzidos (default: 1).
 * @returns {number} - Custo total dos insumos para a quantidade especificada.
 */
const calcularCustoInsumos = (modelo, insumosList, quantidadeProduzir = 1) => {
    if (!modelo || !modelo.dados_estrutura || !insumosList) {
        console.error("Dados insuficientes para calcular custo de insumos.");
        return 0;
    }

    let custoTotalInsumos = 0;
    modelo.dados_estrutura.forEach(itemEstrutura => {
        const insumoDetalhe = insumosList.find(ins => ins.id === itemEstrutura.insumo_id);
        if (insumoDetalhe && insumoDetalhe.preco_unitario) {
            custoTotalInsumos += itemEstrutura.quantidade * parseFloat(insumoDetalhe.preco_unitario);
        } else {
            console.warn(`Insumo ID ${itemEstrutura.insumo_id} não encontrado ou sem preço na lista.`);
        }
    });

    return custoTotalInsumos * quantidadeProduzir;
};

/**
 * Calcula o custo fixo por unidade produzida.
 * @param {Array} custosFixosList - Lista de custos fixos mensais. Ex: [{valor_mensal: 1500}, {valor_mensal: 800}]
 * @param {number} producaoMediaMensal - Média de unidades produzidas por mês.
 * @returns {number} - Custo fixo alocado por unidade.
 */
const calcularCustoFixoUnitario = (custosFixosList, producaoMediaMensal) => {
    if (!custosFixosList || !producaoMediaMensal || producaoMediaMensal <= 0) {
        console.error("Dados insuficientes ou inválidos para calcular custo fixo unitário.");
        return 0;
    }

    const custoFixoTotalMensal = custosFixosList.reduce((acc, custo) => acc + parseFloat(custo.valor_mensal || 0), 0);
    return custoFixoTotalMensal / producaoMediaMensal;
};

/**
 * Calcula o custo variável total por unidade (excluindo insumos).
 * @param {Array} custosVariaveisList - Lista de custos variáveis padrão por unidade. Ex: [{valor_unitario: 0.10}, {valor_unitario: 0.05}]
 * @returns {number} - Custo variável total por unidade.
 */
const calcularCustoVariavelUnitario = (custosVariaveisList) => {
    if (!custosVariaveisList) {
        console.warn("Lista de custos variáveis não fornecida.");
        return 0;
    }
    return custosVariaveisList.reduce((acc, custo) => acc + parseFloat(custo.valor_unitario || 0), 0);
};

/**
 * Calcula o valor do imposto por unidade.
 * @param {number} precoVenda - Preço de venda da unidade.
 * @param {number} percentualImposto - Percentual de imposto configurado (ex: 10 para 10%).
 * @returns {number} - Valor do imposto por unidade.
 */
const calcularImpostoUnitario = (precoVenda, percentualImposto) => {
    if (precoVenda === undefined || percentualImposto === undefined || percentualImposto < 0) {
        console.error("Dados inválidos para calcular imposto unitário.");
        return 0;
    }
    return precoVenda * (percentualImposto / 100);
};

/**
 * Calcula o custo total de produção de uma unidade de um modelo.
 * Depende de dados do backend (insumos, custos fixos, variáveis, produção média).
 * @param {object} modelo - Objeto do modelo.
 * @param {Array} insumosList - Lista completa de insumos.
 * @param {Array} custosFixosList - Lista de custos fixos.
 * @param {Array} custosVariaveisList - Lista de custos variáveis.
 * @param {number} producaoMediaMensal - Produção média mensal.
 * @returns {number} - Custo total por unidade.
 */
const calcularCustoTotalModeloUnitario = (modelo, insumosList, custosFixosList, custosVariaveisList, producaoMediaMensal) => {
    const custoInsumos = calcularCustoInsumos(modelo, insumosList, 1); // Custo para 1 unidade
    const custoFixoUnit = calcularCustoFixoUnitario(custosFixosList, producaoMediaMensal);
    const custoVariavelUnit = calcularCustoVariavelUnitario(custosVariaveisList);

    // Impostos geralmente incidem sobre o preço de venda, não entram no custo de produção direto
    // mas podem ser considerados dependendo da metodologia.

    const custoTotal = custoInsumos + custoFixoUnit + custoVariavelUnit;
    console.log(`Custo Unitário Calculado: Insumos=${custoInsumos.toFixed(2)}, Fixo=${custoFixoUnit.toFixed(2)}, Variável=${custoVariavelUnit.toFixed(2)}, Total=${custoTotal.toFixed(2)}`);
    return custoTotal;
};

/**
 * Calcula o preço de venda sugerido com base no custo e margem de lucro desejada.
 * @param {number} custoTotalUnitario - Custo total de produção da unidade.
 * @param {number} margemLucroPercentual - Margem de lucro desejada (ex: 50 para 50%).
 * @returns {number} - Preço de venda sugerido.
 */
const calcularPrecoSugerido = (custoTotalUnitario, margemLucroPercentual) => {
    if (custoTotalUnitario === undefined || margemLucroPercentual === undefined || margemLucroPercentual < 0) {
        console.error("Dados inválidos para calcular preço sugerido.");
        return 0;
    }
    // Fórmula: Preço = Custo / (1 - Margem)
    if (margemLucroPercentual >= 100) {
        console.warn("Margem de lucro deve ser menor que 100%.");
        // Pode retornar um erro ou um valor alto, dependendo da regra de negócio
        return custoTotalUnitario * 10; // Exemplo: multiplicar por 10
    }
    const preco = custoTotalUnitario / (1 - (margemLucroPercentual / 100));
    return preco;
};

/**
 * Calcula o lucro bruto por unidade.
 * @param {number} precoVenda - Preço de venda da unidade.
 * @param {number} custoTotalUnitario - Custo total de produção da unidade.
 * @returns {number} - Lucro bruto por unidade.
 */
const calcularLucroBrutoUnitario = (precoVenda, custoTotalUnitario) => {
    return precoVenda - custoTotalUnitario;
};

/**
 * Calcula o lucro líquido por unidade (considerando impostos sobre a venda).
 * @param {number} lucroBrutoUnitario - Lucro bruto por unidade.
 * @param {number} impostoUnitario - Valor do imposto por unidade.
 * @returns {number} - Lucro líquido por unidade.
 */
const calcularLucroLiquidoUnitario = (lucroBrutoUnitario, impostoUnitario) => {
    return lucroBrutoUnitario - impostoUnitario;
};

/**
 * Calcula o ponto de equilíbrio em unidades.
 * Ponto de Equilíbrio (Unidades) = Custos Fixos Totais / (Preço de Venda Unitário - Custos Variáveis Unitários Totais)
 * Custos Variáveis Unitários Totais = Custo Insumos Unitário + Custo Variável Padrão Unitário
 * @param {Array} custosFixosList - Lista de custos fixos mensais.
 * @param {number} precoVendaMedio - Preço médio de venda dos produtos.
 * @param {number} custoInsumoMedioUnitario - Custo médio de insumos por unidade.
 * @param {Array} custosVariaveisList - Lista de custos variáveis padrão por unidade.
 * @returns {number} - Quantidade de unidades para atingir o ponto de equilíbrio.
 */
const calcularPontoEquilibrioUnidades = (custosFixosList, precoVendaMedio, custoInsumoMedioUnitario, custosVariaveisList) => {
    const custoFixoTotalMensal = custosFixosList.reduce((acc, custo) => acc + parseFloat(custo.valor_mensal || 0), 0);
    const custoVariavelPadraoUnit = calcularCustoVariavelUnitario(custosVariaveisList);
    const custoVariavelTotalUnitario = custoInsumoMedioUnitario + custoVariavelPadraoUnit;
    const margemContribuicaoUnit = precoVendaMedio - custoVariavelTotalUnitario;

    if (margemContribuicaoUnit <= 0) {
        console.error("Margem de contribuição unitária é negativa ou zero. Ponto de equilíbrio não pode ser calculado ou é infinito.");
        return Infinity;
    }

    return custoFixoTotalMensal / margemContribuicaoUnit;
};

/**
 * Calcula a quantidade de um modelo que pode ser produzida com o estoque atual de insumos.
 * @param {object} modelo - Objeto do modelo com sua estrutura de insumos.
 * @param {Array} insumosList - Lista completa de insumos com estoque_atual.
 * @returns {number} - Quantidade máxima que pode ser produzida.
 */
const calcularProducaoPossivelComEstoque = (modelo, insumosList) => {
    if (!modelo || !modelo.dados_estrutura || !insumosList) {
        console.error("Dados insuficientes para calcular produção possível.");
        return 0;
    }

    let maxProducaoPossivel = Infinity;

    modelo.dados_estrutura.forEach(itemEstrutura => {
        const insumoDetalhe = insumosList.find(ins => ins.id === itemEstrutura.insumo_id);
        if (insumoDetalhe && itemEstrutura.quantidade > 0) {
            const estoqueDisponivel = parseFloat(insumoDetalhe.estoque_atual || 0);
            const necessarioPorUnidade = itemEstrutura.quantidade;
            const podeProduzirComEsteInsumo = Math.floor(estoqueDisponivel / necessarioPorUnidade);
            if (podeProduzirComEsteInsumo < maxProducaoPossivel) {
                maxProducaoPossivel = podeProduzirComEsteInsumo;
            }
        } else if (itemEstrutura.quantidade > 0) {
            console.warn(`Insumo ID ${itemEstrutura.insumo_id} não encontrado na lista de estoque.`);
            maxProducaoPossivel = 0; // Se um insumo necessário não existe, não pode produzir nada.
        }
    });

    return maxProducaoPossivel === Infinity ? 0 : maxProducaoPossivel; // Retorna 0 se nenhum insumo for necessário ou se algum faltar
};

/**
 * Calcula a quantidade total de cada insumo necessária para produzir uma certa quantidade de um modelo.
 * @param {object} modelo - Objeto do modelo com sua estrutura de insumos.
 * @param {number} quantidadeProduzir - Quantidade do modelo a ser produzida.
 * @returns {object} - Objeto com { insumo_id: quantidade_necessaria, ... }.
 */
const calcularInsumosNecessariosParaProducao = (modelo, quantidadeProduzir) => {
    const insumosNecessarios = {};
    if (!modelo || !modelo.dados_estrutura || quantidadeProduzir <= 0) {
        console.error("Dados insuficientes para calcular insumos necessários.");
        return insumosNecessarios;
    }

    modelo.dados_estrutura.forEach(itemEstrutura => {
        insumosNecessarios[itemEstrutura.insumo_id] = itemEstrutura.quantidade * quantidadeProduzir;
    });

    return insumosNecessarios;
};


// --- Funções da Aba Calculadora --- //

// Calculadora: Se tenho X de insumo -> quantos produtos faço?
const calcularProdutosPorInsumo = (insumoId, quantidadeInsumoDisponivel, modelo, insumosList) => {
    // Reutiliza a lógica, mas focado em um insumo?
    // Precisa encontrar quanto desse insumo específico é usado por unidade do modelo.
    if (!modelo || !modelo.dados_estrutura) return 0;
    const itemEstrutura = modelo.dados_estrutura.find(item => item.insumo_id === insumoId);
    if (!itemEstrutura || itemEstrutura.quantidade <= 0) {
        console.warn(`Insumo ID ${insumoId} não é usado ou quantidade é zero no modelo ${modelo.nome_modelo}.`);
        return Infinity; // Ou 0, dependendo da interpretação
    }
    return Math.floor(quantidadeInsumoDisponivel / itemEstrutura.quantidade);
};

// Calculadora: Se quero produzir X -> quanto de insumo preciso?
const calcularInsumoParaProduzirX = (insumoId, quantidadeProdutos, modelo) => {
    // Reutiliza a lógica
    if (!modelo || !modelo.dados_estrutura) return 0;
    const itemEstrutura = modelo.dados_estrutura.find(item => item.insumo_id === insumoId);
    if (!itemEstrutura) {
        return 0; // Insumo não usado no modelo
    }
    return itemEstrutura.quantidade * quantidadeProdutos;
};

// Calculadora de Custo Fixo Unitário (já implementada como calcularCustoFixoUnitario)

// Calculadora de Ponto de Equilíbrio (já implementada como calcularPontoEquilibrioUnidades)

// Calculadora de Projeção de Lucro
const calcularProjecaoLucro = (quantidadeVendida, precoMedioVenda, custoTotalUnitarioMedio, percentualImposto) => {
    const faturamentoBruto = quantidadeVendida * precoMedioVenda;
    const custoTotalProducao = quantidadeVendida * custoTotalUnitarioMedio;
    const lucroBrutoTotal = faturamentoBruto - custoTotalProducao;
    const impostoTotal = faturamentoBruto * (percentualImposto / 100);
    const lucroLiquidoTotal = lucroBrutoTotal - impostoTotal;
    const margemLiquidaPercentual = (lucroLiquidoTotal / faturamentoBruto) * 100;

    return {
        faturamentoBruto,
        custoTotalProducao,
        lucroBrutoTotal,
        impostoTotal,
        lucroLiquidoTotal,
        margemLiquidaPercentual: isNaN(margemLiquidaPercentual) ? 0 : margemLiquidaPercentual
    };
};


console.log("calculations.js setup complete with function structures.");

// Exemplo de uso (requer dados mockados ou do backend)
/*
const mockModelo = {
    id: 1,
    nome_modelo: "Camiseta Básica",
    dados_estrutura: [
        { insumo_id: 1, quantidade: 0.2 }, // 0.2 kg de Tecido Algodão
        { insumo_id: 2, quantidade: 5 }    // 5 unidades de Linha Poliéster
    ]
};
const mockInsumos = [
    { id: 1, nome: "Tecido Algodão", unidade: "kg", preco_unitario: "30.00", estoque_atual: "100.000" },
    { id: 2, nome: "Linha Poliéster", unidade: "unid", preco_unitario: "5.00", estoque_atual: "500.000" }
];
const mockCustosFixos = [
    { id: 1, nome: "Aluguel", valor_mensal: "2000.00" },
    { id: 2, nome: "Salários Adm", valor_mensal: "5000.00" }
];
const mockCustosVariaveis = [
    { id: 1, nome: "Embalagem", valor_unitario: "0.50" },
    { id: 2, nome: "Etiqueta", valor_unitario: "0.20" }
];
const mockProducaoMedia = 500;
const mockPrecoVenda = 50.00;
const mockMargem = 40; // 40%
const mockImposto = 10; // 10%

const custoUnit = calcularCustoTotalModeloUnitario(mockModelo, mockInsumos, mockCustosFixos, mockCustosVariaveis, mockProducaoMedia);
console.log(`Custo Unitário Exemplo: R$ ${custoUnit.toFixed(2)}`);

const precoSugerido = calcularPrecoSugerido(custoUnit, mockMargem);
console.log(`Preço Sugerido Exemplo: R$ ${precoSugerido.toFixed(2)}`);

const producaoPossivel = calcularProducaoPossivelComEstoque(mockModelo, mockInsumos);
console.log(`Produção Possível Exemplo: ${producaoPossivel} unidades`);

const insumosNecessarios = calcularInsumosNecessariosParaProducao(mockModelo, 100);
console.log("Insumos Necessários para 100 unidades:", insumosNecessarios);
*/

