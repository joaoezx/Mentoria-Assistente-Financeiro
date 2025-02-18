// Seleciona o botão "Enter", o campo de input e a área onde serão exibidas as despesas
const saveTextButton = document.querySelector('.enterButton');
const userText = document.querySelector('.inputText');
const listExpenses = document.getElementById('listExpenses');
const counterDiv = document.getElementById('counterP');
const timeNow = document.getElementById('timeP');
const lastInputTimeP = document.getElementById('lastInputTimeP');
const userReceivedTexts = [];

//contador de despesas
let counter = 0;

// retornar a data e hora formatadas
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

// Retorna a somente as horas
function getTimeHour() {
  const date = new Date();
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

//funcão para mostra o tempo de agora
function timeNowFunction() {
  timeNow.innerText = `now: ${getTimeHour()}`;
}

//chamando a função com o intervalo de tempo
setTimeout(timeNowFunction, 10);
setInterval(timeNowFunction, 60000);

// obter a despesa salva do localStorage
function getExpenseItems() {
  const savedText = localStorage.getItem('savedText');

  // Se não houver nada salvo, retorna null
  if (savedText === 'nothing expenses') {
    return null;
  }

  return {
    item: savedText,
    date: getTime(),
  };
}

// mostrar as despesas na tela
function showExpenseItems(date, item) {
  let divBox = document.createElement('div');
  let itemElement = document.createElement('p');
  itemElement.innerText = `Expense: R$${item}`;
  let dateElement = document.createElement('p');
  dateElement.innerText = `Date: ${date}`;

  // elementos à divBox e exibe
  divBox.appendChild(itemElement);
  divBox.appendChild(dateElement);
  divBox.classList.add('boxOutput');
  listExpenses.appendChild(divBox);

  // Atualiza o contador de despesas
  counter++;
  counterDiv.innerText = `Number of expenses: ${counter}`;
  lastInputTimeP.innerText = `Last expense: ${getTime()}`;

  // Limpa o campo de input
  userText.value = '';
}

// adicionar uma nova despesa e salvar no localStorage
function addStorageItem() {
  const savedText = userText.value.trim();

  if (!savedText) {
    return;
  }

  // Salva a despesa no localStorage
  localStorage.setItem('savedText', savedText);

  // exibir a despesa na tela
  const expense = getExpenseItems();
  userReceivedTexts.push(`${expense.item} - ${expense.date}`);

  showExpenseItems(expense.date, expense.item);
}

// atualizar o localStorage com todas as despesas
function refreshStorage() {
  // Salva as despesas no localStorage
  localStorage.setItem('expenses', JSON.stringify(userReceivedTexts));
  // Limpa o array
  userReceivedTexts.length = 0;
  // Recarrega as despesas do localStorage
  userReceivedTexts.push(
    ...(JSON.parse(localStorage.getItem('expenses')) || []),
  );
}

// evento de clique no botão de salvar a despesa
saveTextButton.addEventListener('click', () => {
  addStorageItem(); // Adiciona a despesa
  refreshStorage(); // Atualiza o localStorage
});

// despesa salva no localStorage quando a página é carregada
window.addEventListener('load', () => {
  const savedText = localStorage.getItem('savedText');

  if (savedText) {
    const expense = getExpenseItems();
    showExpenseItems(expense.date, expense.item);

    localStorage.removeItem('savedText');
  }
});
