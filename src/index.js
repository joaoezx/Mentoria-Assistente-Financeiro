// Seleciona o botão enter, o campo de input e a área onde serão exibidas as despesas
const saveTextButton = document.querySelector('.enterButton');
const userText = document.querySelector('.inputText');
const listExpenses = document.getElementById('listExpenses');
const database = [];

// Retorna a data e hora formatadas (dd/mm/aaaa hh:mm)
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

// Função para atualizar a lista de despesas na tela
function renderExpenses() {
  listExpenses.innerHTML = '';

  database.forEach(({ text, date }) => {
    let expense = document.createElement('p');
    expense.innerText = `Gasto: R$${text}`;
    let dateElement = document.createElement('p');
    dateElement.innerText = `Data: ${date}`;

    // Adiciona os elementos
    listExpenses.appendChild(expense);
    listExpenses.appendChild(dateElement);
  });
}

saveTextButton.addEventListener('click', () => {
  const savedText = userText.value.trim();
  if (savedText) {
    // Salva a despesa no banco de dados
    const expenseData = { text: savedText, date: getTime() };
    database.push(expenseData);

    renderExpenses(); // Atualiza a lista na tela
    userText.value = ''; // Limpa o campo de input
  }
});
