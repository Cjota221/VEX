// validations.js - Funções para validação de formulários e máscaras

console.log("validations.js loaded.");

// --- Máscaras --- //

// Aplica máscara de CNPJ (XX.XXX.XXX/XXXX-XX)
const applyCNPJMask = (inputElement) => {
    if (!inputElement) return;
    inputElement.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
        value = value.slice(0, 14); // Limita a 14 dígitos

        if (value.length <= 2) {
            value = value;
        } else if (value.length <= 5) {
            value = value.replace(/^(\d{2})(\d{1,3})$/, "$1.$2");
        } else if (value.length <= 8) {
            value = value.replace(/^(\d{2})(\d{3})(\d{1,3})$/, "$1.$2.$3");
        } else if (value.length <= 12) {
            value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4})$/, "$1.$2.$3/$4");
        } else {
            value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})$/, "$1.$2.$3/$4-$5");
        }
        e.target.value = value;
    });
};

// Aplica máscara de Telefone (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
const applyPhoneMask = (inputElement) => {
    if (!inputElement) return;
    inputElement.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
        value = value.slice(0, 11); // Limita a 11 dígitos (DDD + 9 dígitos)

        if (value.length <= 2) {
            value = value.replace(/^(\d{1,2})$/, "($1");
        } else if (value.length <= 6) {
            value = value.replace(/^(\d{2})(\d{1,4})$/, "($1) $2");
        } else if (value.length <= 10) {
            value = value.replace(/^(\d{2})(\d{4})(\d{1,4})$/, "($1) $2-$3");
        } else {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"); // Celular com 9 dígitos
        }
        e.target.value = value;
    });
};

// Aplica máscara genérica para números (permitindo decimais com vírgula)
const applyNumberMask = (inputElement, decimalPlaces = 2) => {
    if (!inputElement) return;
    inputElement.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove não dígitos
        if (!value) {
            e.target.value = "";
            return;
        }

        // Remove zeros à esquerda
        value = value.replace(/^0+/, "");

        // Adiciona zeros à esquerda se necessário para ter casas decimais
        while (value.length <= decimalPlaces) {
            value = "0" + value;
        }

        let integerPart = value.slice(0, value.length - decimalPlaces);
        let decimalPart = value.slice(value.length - decimalPlaces);

        // Formata parte inteira com pontos como separador de milhar (opcional, pode ser complexo)
        // integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        e.target.value = integerPart + "," + decimalPart;
    });

    // Converte vírgula para ponto ao submeter ou perder foco (para backend)
    inputElement.addEventListener("blur", (e) => {
        // Opcional: converter para formato numérico padrão ao perder foco
        // let value = e.target.value.replace(".", "").replace(",", ".");
        // if (!isNaN(parseFloat(value))) {
        //     e.target.value = parseFloat(value).toFixed(decimalPlaces);
        // }
    });
};


// --- Funções de Validação --- //

// Verifica se um valor é um email válido
const isValidEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
};

// Verifica se um campo obrigatório está preenchido
const isRequired = (value) => {
    return value !== null && value !== undefined && String(value).trim() !== "";
};

// Verifica se um CNPJ tem o formato válido (não valida os dígitos verificadores ainda)
const isValidCNPJFormat = (cnpj) => {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return cnpjRegex.test(String(cnpj));
};

// --- Validação de Formulário --- //

// Função genérica para validar um formulário
// Espera que os inputs tenham atributos como 'data-validate="required email"'
const validateForm = (formElement) => {
    let isValid = true;
    const errors = {};

    if (!formElement) {
        console.error("Form element not provided for validation.");
        return { isValid: false, errors: { general: "Formulário não encontrado." } };
    }

    const inputsToValidate = formElement.querySelectorAll("[data-validate]");

    inputsToValidate.forEach(input => {
        const validations = input.getAttribute("data-validate").split(" ");
        const value = input.value;
        const fieldName = input.name || input.id || "unknown_field";
        let fieldErrors = [];

        // Limpa erros anteriores (visual)
        clearError(input);

        validations.forEach(validationType => {
            let valid = true;
            let errorMessage = "";

            switch (validationType) {
                case "required":
                    valid = isRequired(value);
                    errorMessage = "Este campo é obrigatório.";
                    break;
                case "email":
                    valid = isValidEmail(value);
                    errorMessage = "Por favor, insira um e-mail válido.";
                    break;
                case "cnpj":
                    valid = isValidCNPJFormat(value);
                    errorMessage = "Formato de CNPJ inválido (use XX.XXX.XXX/XXXX-XX).";
                    break;
                // Adicionar mais casos conforme necessário (telefone, número, etc.)
            }

            if (!valid) {
                fieldErrors.push(errorMessage);
                isValid = false;
            }
        });

        if (fieldErrors.length > 0) {
            errors[fieldName] = fieldErrors;
            // Exibe o erro (visual)
            showError(input, fieldErrors[0]); // Mostra o primeiro erro encontrado para o campo
        }
    });

    console.log("Validation result:", { isValid, errors });
    return { isValid, errors };
};

// Funções auxiliares para mostrar/limpar erros (exemplo simples)
const showError = (inputElement, message) => {
    const formGroup = inputElement.closest(".form-group"); // Assume que cada input está dentro de um .form-group
    if (!formGroup) return;

    // Remove erro existente se houver
    clearError(inputElement);

    // Adiciona classe de erro ao input (opcional)
    inputElement.classList.add("is-invalid");

    // Cria e adiciona mensagem de erro
    const errorElement = document.createElement("div");
    errorElement.className = "invalid-feedback"; // Classe para estilização do erro
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
};

const clearError = (inputElement) => {
    const formGroup = inputElement.closest(".form-group");
    if (!formGroup) return;

    inputElement.classList.remove("is-invalid");

    const errorElement = formGroup.querySelector(".invalid-feedback");
    if (errorElement) {
        errorElement.remove();
    }
};

// --- Inicialização --- //

// Exemplo de como aplicar as máscaras e validações:
document.addEventListener("DOMContentLoaded", () => {
    // Aplica máscaras aos inputs relevantes (exemplo)
    const cnpjInputs = document.querySelectorAll("input[data-mask='cnpj']");
    cnpjInputs.forEach(applyCNPJMask);

    const phoneInputs = document.querySelectorAll("input[data-mask='phone']");
    phoneInputs.forEach(applyPhoneMask);

    const numberInputs = document.querySelectorAll("input[data-mask='number']");
    numberInputs.forEach(input => applyNumberMask(input)); // Usar applyNumberMask

    // Adiciona listener de submit aos formulários para validação (exemplo)
    const formsToValidate = document.querySelectorAll("form[data-validate-form]");
    formsToValidate.forEach(form => {
        form.addEventListener("submit", (event) => {
            const { isValid, errors } = validateForm(form);
            if (!isValid) {
                event.preventDefault(); // Impede o envio do formulário se inválido
                console.warn("Form submission prevented due to validation errors:", errors);
                // Opcional: Focar no primeiro campo inválido ou mostrar um resumo dos erros
            } else {
                console.log("Form is valid. Submitting...");
                // Aqui iria a lógica de envio para o backend (Supabase)
            }
        });
    });
});

console.log("validations.js setup complete.");

