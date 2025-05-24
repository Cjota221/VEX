/**
 * Funcionalidades da Calculadora
 */
document.addEventListener('DOMContentLoaded', function() {
    // Dados simulados para cálculos
    const dadosModelos = {
        'modelo1': {
            nome: 'Modelo XYZ',
            insumos: {
                'insumo1': 2.5, // 2.5 metros de tecido por unidade
                'insumo2': 10   // 10 unidades de linha por unidade
            }
        },
        'modelo2': {
            nome: 'Modelo ABC',
            insumos: {
                'insumo1': 1.8, // 1.8 metros de tecido por unidade
                'insumo2': 8    // 8 unidades de linha por unidade
            }
        }
    };
    
    const dadosInsumos = {
        'insumo1': {
            nome: 'Tecido Algodão',
            unidade: 'm',
            preco: 25.00
        },
        'insumo2': {
            nome: 'Linha Poliéster',
            unidade: 'unid',
            preco: 5.50
        }
    };
    
    // Calculadora 1: Quantos produtos faço com X de insumo
    const btnCalcProdutos = document.getElementById('btnCalcProdutos');
    if (btnCalcProdutos) {
        btnCalcProdutos.addEventListener('click', function() {
            const modelo = document.getElementById('modelo1').value;
            const insumo = document.getElementById('insumo1').value;
            const qtdInsumo = parseFloat(document.getElementById('qtdInsumo').value);
            
            if (!modelo || !insumo || isNaN(qtdInsumo) || qtdInsumo <= 0) {
                mostrarResultado('resultProdutos', 'Preencha todos os campos corretamente');
                return;
            }
            
            const consumoPorUnidade = dadosModelos[modelo].insumos[insumo];
            const qtdProdutos = Math.floor(qtdInsumo / consumoPorUnidade);
            
            mostrarResultado(
                'resultProdutos', 
                `${qtdProdutos} unidades de ${dadosModelos[modelo].nome}`,
                `Com ${qtdInsumo} ${dadosInsumos[insumo].unidade} de ${dadosInsumos[insumo].nome}`
            );
        });
    }
    
    // Calculadora 2: Quanto insumo preciso para produzir X produtos
    const btnCalcInsumos = document.getElementById('btnCalcInsumos');
    if (btnCalcInsumos) {
        btnCalcInsumos.addEventListener('click', function() {
            const modelo = document.getElementById('modelo2').value;
            const insumo = document.getElementById('insumo2').value;
            const qtdProdutos = parseInt(document.getElementById('qtdProdutos').value);
            
            if (!modelo || !insumo || isNaN(qtdProdutos) || qtdProdutos <= 0) {
                mostrarResultado('resultInsumos', 'Preencha todos os campos corretamente');
                return;
            }
            
            const consumoPorUnidade = dadosModelos[modelo].insumos[insumo];
            const qtdInsumoNecessaria = qtdProdutos * consumoPorUnidade;
            
            mostrarResultado(
                'resultInsumos', 
                `${qtdInsumoNecessaria.toFixed(2)} ${dadosInsumos[insumo].unidade} de ${dadosInsumos[insumo].nome}`,
                `Para produzir ${qtdProdutos} unidades de ${dadosModelos[modelo].nome}`
            );
        });
    }
    
    // Calculadora 3: Custo Fixo por Unidade
    const btnCalcCustoFixo = document.getElementById('btnCalcCustoFixo');
    if (btnCalcCustoFixo) {
        btnCalcCustoFixo.addEventListener('click', function() {
            const custoFixoTotal = parseFloat(document.getElementById('custoFixoTotal').value);
            const qtdUnidades = parseInt(document.getElementById('qtdUnidades').value);
            
            if (isNaN(custoFixoTotal) || custoFixoTotal < 0 || isNaN(qtdUnidades) || qtdUnidades <= 0) {
                mostrarResultado('resultCustoFixo', 'Preencha todos os campos corretamente');
                return;
            }
            
            const custoFixoPorUnidade = custoFixoTotal / qtdUnidades;
            
            mostrarResultado(
                'resultCustoFixo', 
                `R$ ${custoFixoPorUnidade.toFixed(2)} por unidade`
            );
        });
    }
    
    // Calculadora 4: Ponto de Equilíbrio
    const btnCalcPontoEquilibrio = document.getElementById('btnCalcPontoEquilibrio');
    if (btnCalcPontoEquilibrio) {
        btnCalcPontoEquilibrio.addEventListener('click', function() {
            const custoFixoMensal = parseFloat(document.getElementById('custoFixoMensal').value);
            const precoVenda = parseFloat(document.getElementById('precoVenda').value);
            const custoVariavel = parseFloat(document.getElementById('custoVariavel').value);
            
            if (isNaN(custoFixoMensal) || custoFixoMensal < 0 || 
                isNaN(precoVenda) || precoVenda <= 0 || 
                isNaN(custoVariavel) || custoVariavel < 0) {
                mostrarResultado('resultPontoEquilibrio', 'Preencha todos os campos corretamente');
                return;
            }
            
            const margemContribuicao = precoVenda - custoVariavel;
            
            if (margemContribuicao <= 0) {
                mostrarResultado('resultPontoEquilibrio', 'O preço de venda deve ser maior que o custo variável');
                return;
            }
            
            const pontoEquilibrio = Math.ceil(custoFixoMensal / margemContribuicao);
            
            mostrarResultado(
                'resultPontoEquilibrio', 
                `${pontoEquilibrio} unidades`,
                `Margem de contribuição: R$ ${margemContribuicao.toFixed(2)}`
            );
        });
    }
    
    // Calculadora 5: Projeção de Lucro
    const btnCalcProjecaoLucro = document.getElementById('btnCalcProjecaoLucro');
    if (btnCalcProjecaoLucro) {
        btnCalcProjecaoLucro.addEventListener('click', function() {
            const qtdVendas = parseInt(document.getElementById('qtdVendas').value);
            const precoVenda = parseFloat(document.getElementById('precoVendaProj').value);
            const custoTotal = parseFloat(document.getElementById('custoTotalProj').value);
            
            if (isNaN(qtdVendas) || qtdVendas <= 0 || 
                isNaN(precoVenda) || precoVenda <= 0 || 
                isNaN(custoTotal) || custoTotal < 0) {
                mostrarResultado('resultProjecaoLucro', 'Preencha todos os campos corretamente');
                return;
            }
            
            const lucroPorUnidade = precoVenda - custoTotal;
            const lucroTotal = qtdVendas * lucroPorUnidade;
            
            mostrarResultado(
                'resultProjecaoLucro', 
                `R$ ${lucroTotal.toFixed(2)}`,
                `Lucro por unidade: R$ ${lucroPorUnidade.toFixed(2)}`
            );
        });
    }
    
    // Função auxiliar para mostrar resultados
    function mostrarResultado(elementId, resultado, detalhes = '') {
        const resultElement = document.getElementById(elementId);
        if (resultElement) {
            const resultValue = resultElement.querySelector('.result-value');
            if (resultValue) {
                resultValue.innerHTML = resultado;
                
                if (detalhes) {
                    resultValue.innerHTML += `<div class="result-details">${detalhes}</div>`;
                }
            }
        }
    }
});
