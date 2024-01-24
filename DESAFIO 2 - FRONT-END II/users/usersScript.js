class User {
    constructor(id, firstName, lastName, email, age, image) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.image = image;
    }
}

const pageUsers = []

function displayUsers() { }
function fetchUsers() { }
function addUser() { }
function removeUser(userId) { }

document.addEventListener("DOMContentLoaded", function () {
    // Cria lista de usuários a partir da chamada da API
    fetchUsers();
});

function displayUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    pageUsers.forEach(user => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card");
        const thumbnailSrc = user.image ? user.image : '../img/user_blank.jpg';
        // Adiciona todos os campos disponíveis e o botão de remoção
        listItem.innerHTML = `<div class="space"><strong>Nome:</strong> ${user.firstName}</div>
    <div class="space"><strong>Sobrenome:</strong> ${user.lastName}</div>
    <div class="space"><strong>Email:</strong> ${user.email}</div>
    <div class="space"><strong>Idade:</strong> ${user.age}</div>
    <div class="space"><strong>Foto:</strong></div>
    <img id="userImage" src="${thumbnailSrc}">
    <button onclick="removeUser(${user.id})" class="remove-btn">
    <i class="bi bi-trash"></i>
    </button>`;
        userList.appendChild(listItem);
    });
}

function fetchUsers() {
    // Substitua a URL pela API desejada
    const apiUrl = "https://dummyjson.com/users";
    // Fazendo uma requisição à API
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            const userArray = users.users;
            // Itera sobre a lista de usuários e cria elementos HTML
            userArray.forEach(user => {
                pageUsers.push(new User(user.id, user.firstName, user.lastName, user.email, user.age, user.image));
            });
            console.log(pageUsers);
            // Mostra lista de usuários
            displayUsers();
        })
        .catch(error => console.error("Erro ao obter dados da API:", error));
}

function addUser() {
    const addUserForm = document.getElementById("add-user-form");
    // Obtem os valores do formulário
    const id = pageUsers[pageUsers.length - 1].id + 1;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const image = document.getElementById("photo").value;
    // Verifica se o campo de nome não está vazio
    if (firstName.trim() !== "") {
        pageUsers.push(new User(id, firstName, lastName, email, age, image));
        // Limpa o formulário
        addUserForm.reset();
        // Mostra lista de usuários
        displayUsers();
    }
}

function removeUser(userId) {
    // Apenas checando se é o usuário correto
    console.log("Removendo usuário com ID:", userId);
    // Encontrando índice do usuário que vai ser removido
    const userIndexToRemove = pageUsers.findIndex((user) => user.id === userId);
    // Removendo usuário da lista
    pageUsers.splice(userIndexToRemove, 1);
    // Atualizando lista na tela
    displayUsers();
}

const nome = document.getElementById("firstName");
const sobrenome = document.getElementById("lastName");
const email = document.getElementById("email");
const idade = document.getElementById("age");
const url = document.getElementById("photo");
const form = document.getElementById("add-user-form");

//Mostra mensagem de erro
const showsError = (input, message) => {
    // Obtem o elemento campo-formulario
    const formField = input.parentElement;
    // Adiciona a class de erro
    formField.classList.remove('success');
    formField.classList.add('error');
    // Mostra a mensagem de erro
    const error = formField.querySelector('small');
    error.textContent = message;
};

//Mostra mensagem de sucesso
const showsSuccess = (input) => {
    // Obtem o elemento do campo-formulario
    const formField = input.parentElement;
    // Remove a class de erro
    formField.classList.remove('error');
    formField.classList.add('success');
    // Oculta a mensagem de erro
    const error = formField.querySelector('small');
    error.textContent = '';
};

// Checa entrada obrigatória
const isRequired = value => value === '' ? false : true;
// Checa tamanho da entrada
const isBetween = (length, min, max) => length < min || length > max ? false : true;
// Checa intervalo de idade
const ageBetween = (value, min, max) => value > min && value < max;
// Checa se URL é válida
const validateURL = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (url == "") {
        return true
    } else {
        return urlRegex.test(url)
    }
}
// Checa se e-mail é válido
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// Valida o campo do nome
const checkName = () => {
    let valid = false;
    const min = 3, max = 50;
    const nomeVal = nome.value.trim();
    if (!isRequired(nomeVal)) {
        showsError(nome, 'Nome não pode ficar em branco.');
    } else if (!isBetween(nomeVal.length, min, max)) {
        showsError(nome, `Nome deve ter no mínimo ${min} e no máximo ${max} caracteres.`)
    } else {
        showsSuccess(nome);
        valid = true;
    }
    return valid;
};

// Valida o campo do sobrenome
const checkSurname = () => {
    let valid = false;
    const min = 3, max = 50;
    const sobrenomeVal = sobrenome.value.trim();
    if (!isRequired(sobrenomeVal)) {
        showsError(sobrenome, 'Sobrenome não pode ficar em branco.');
    } else if (!isBetween(sobrenomeVal.length, min, max)) {
        showsError(sobrenome, `Sobrenome deve ter no mínimo ${min} e no máximo ${max} caracteres.`)
    } else {
        showsSuccess(sobrenome);
        valid = true;
    }
    return valid;
};

// Valida o campo de e-mail
const checkEmail = () => {
    let valid = false;
    const emailVal = email.value.trim();
    if (!isRequired(emailVal)) {
        showsError(email, 'E-mail não pode ficar em branco.');
    } else if (!isEmailValid(emailVal)) {
        showsError(email, 'E-mail inválido.')
    } else {
        showsSuccess(email);
        valid = true;
    }
    return valid;
};

// Valida o campo da idade
const checkAge = () => {
    let valid = false;
    const min = 0, max = 120;
    const idadeVal = idade.value;
    if (!isRequired(idadeVal)) {
        showsError(idade, 'Idade não pode ficar em branco.');
    } else if (!ageBetween(idadeVal, min, max)) {
        showsError(idade, `Idade deve ser maior que zero e menor do que 120.`)
    } else {
        showsSuccess(idade);
        valid = true;
    }
    return valid;
};

// Valida o campo de URL
const checkURL = () => {
    let valid = false;
    const urlVal = url.value.trim();
    if (!validateURL(urlVal)) {
        showsError(url, 'URL inválida.')
    } else {
        showsSuccess(url);
        valid = true;
    }
    return valid;
};

form.addEventListener('submit', (e) => {
    // Previne a submissão do formulário
    e.preventDefault();
    const isNameValid = checkName();
    const isSurnameValid = checkSurname();
    const isAgeValid = checkAge();
    const isEmailValid = checkEmail();
    const isURLValid = checkURL();

    // Submete o formulário, se válido
    if (isNameValid &&
        isSurnameValid &&
        isEmailValid &&
        isAgeValid &&
        isURLValid) {

        addUser();
    }
});