// Seleciona o botão "Enter", o campo de input e a área onde serão exibidas as despesas
const saveTextButton = document.querySelector('.enterButton');
const userText = document.querySelector('.inputText');
const listExpenses = document.getElementById("listExpenses");

// Retorna a data e hora formatadas no padrão brasileiro (dd/mm/aaaa hh:mm)
function getTime() {
    const date = new Date();
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

// Adiciona evento ao botão para salvar a despesa e exibi-la na tela
saveTextButton.addEventListener('click', () => {
    const savedText = userText.value.trim(); // Remove espaços extras

    if (savedText) {
        // Salva a despesa no localStorage
        localStorage.setItem('savedText', savedText);

        // Cria os elementos para exibir o gasto e a data
        let expense = document.createElement("p");
        expense.innerText = `Gasto: R$${savedText}`;
        let date = document.createElement("p");
        date.innerText = `Data: ${getTime()}`;

        // Adiciona os elementos na lista de despesas
        listExpenses.appendChild(expense);
        listExpenses.appendChild(date);

        // Limpa o campo de input após o envio
        userText.value = '';
    }
});

// Exibe a despesa salva no localStorage ao recarregar a página
window.addEventListener('load', () => {
    const savedText = localStorage.getItem('savedText');

    if (savedText) {
        let expense = document.createElement("p");
        expense.innerText = `Gasto: R$${savedText}`;
        let date = document.createElement("p");
        date.innerText = `Data: ${getTime()}`;

        listExpenses.appendChild(expense);
        listExpenses.appendChild(date);

         // Remove a despesa do localStorage
        localStorage.removeItem('savedText');
    }
});
