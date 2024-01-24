class Product {
    constructor(id, title, description, price, brand, category, thumbnail) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.category = category;
        this.thumbnail = thumbnail;
    }
}

const pageProducts = []

function displayProducts() { }
function fetchProducts() { }
function addProduct() { }
function removeProduct(productId) { }

document.addEventListener("DOMContentLoaded", function () {
    // Cria lista de usuários a partir da chamada da API
    fetchProducts();
});

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    pageProducts.forEach(product => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card");
        const thumbnailSrc = product.thumbnail ? product.thumbnail : '../img/product_blank.jpg';
        // Adiciona todos os campos disponíveis e o botão de remoção
        listItem.innerHTML = `<div class="space"><strong>Título:</strong> ${product.title}</div>
    <div class="space"><strong>Descrição:</strong> ${product.description}</div>
    <div class="space"><strong>Preço:</strong> ${product.price}</div>
    <div class="space"><strong>Marca:</strong> ${product.brand}</div>
    <div class="space"><strong>Categoria:</strong> ${product.category}</div>
    <div class="space"><strong>Foto:</strong></div>
    <img id="thumb" src="${thumbnailSrc}">
    <button onclick="removeProduct(${product.id})" class="remove-btn">
    <i class="bi bi-trash"></i>
    </button>`;
        productList.appendChild(listItem);
    });
}

function fetchProducts() {
    const apiUrl = "https://dummyjson.com/products";
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            const productArray = products.products;
            productArray.forEach(product => {
                pageProducts.push(new Product(product.id, product.title, product.description, product.price, product.brand, product.category, product.thumbnail));
            });
            console.log(pageProducts);
            displayProducts();
        })
        .catch(error => console.error("Erro ao obter dados da API:", error));
}

function addProduct() {
    const addProductForm = document.getElementById("add-product-form");
    // Obtem os valores do formulário
    const id = pageProducts[pageProducts.length - 1].id + 1;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").value;
    if (title.trim() !== "") {
        pageProducts.push(new Product(id, title, description, price, brand, category, thumbnail));
        // Limpa o formulário
        addProductForm.reset();
        // Mostra lista de usuários
        displayProducts();
    }
}

function removeProduct(productId) {
    // Apenas checando se é o usuário correto
    console.log("Removendo produto com ID:", productId);
    // Encontrando índice do usuário que vai ser removido
    const productIndexToRemove = pageProducts.findIndex((product) => product.id === productId);
    // Removendo usuário da lista
    pageProducts.splice(productIndexToRemove, 1);
    // Atualizando lista na tela
    displayProducts();
}

const titulo = document.getElementById("title");
const descricao = document.getElementById("description");
const preco = document.getElementById("price");
const marca = document.getElementById("brand");
const categoria = document.getElementById("category");
const url = document.getElementById("thumbnail");
const form = document.getElementById("add-product-form");

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
const priceBetween = (value, min, max) => value > min && value < max;
// Checa se a URL é válida
const validateURL = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (url == "") {
        return true
    } else {
        return urlRegex.test(url)
    }
}


// Valida o campo do título
const checkTitle = () => {
    let valid = false;
    const min = 3, max = 50;
    const titleVal = titulo.value.trim();
    if (!isRequired(titleVal)) {
        showsError(titulo, 'Título não pode ficar em branco.');
    } else if (!isBetween(titleVal.length, min, max)) {
        showsError(titulo, `Título deve ter no mínimo ${min} e no máximo ${max} caracteres.`)
    } else {
        showsSuccess(titulo);
        valid = true;
    }
    return valid;
};

// Valida o campo da descrição
const checkDescription = () => {
    let valid = false;
    const min = 3, max = 50;
    const descriptionVal = descricao.value.trim();
    if (!isRequired(descriptionVal)) {
        showsError(descricao, 'Descrição não pode ficar em branco.');
    } else if (!isBetween(descriptionVal.length, min, max)) {
        showsError(descricao, `Descrição deve ter no mínimo ${min} e no máximo ${max} caracteres.`)
    } else {
        showsSuccess(descricao);
        valid = true;
    }
    return valid;
};

// Valida o campo do preço
const checkPrice = () => {
    let valid = false;
    const min = 0, max = 120;
    const priceVal = preco.value;
    if (!isRequired(priceVal)) {
        showsError(preco, 'Preço não pode ficar em branco.');
    } else if (!priceBetween(priceVal, min, max)) {
        showsError(preco, `Preço deve ser maior que zero e menor do que R$120`)
    } else {
        showsSuccess(preco);
        valid = true;
    }
    return valid;
};

// Valida o campo da marca
const checkBrand = () => {
    let valid = false;
    const min = 3, max = 50;
    const brandVal = marca.value.trim();
    if (!isRequired(brandVal)) {
        showsError(marca, 'Marca não pode ficar em branco.');
    } else if (!isBetween(brandVal.length, min, max)) {
        showsError(marca, `Marca deve ter no mínimo ${min} e no máximo ${max} caracteres.`)
    } else {
        showsSuccess(marca);
        valid = true;
    }
    return valid;
};

// Valida o campo da categoria
const checkCategory = () => {
    let valid = false;
    const min = 3, max = 50;
    const categoryVal = categoria.value.trim();
    if (!isRequired(categoryVal)) {
        showsError(categoria, 'Categoria não pode ficar em branco.');
    } else if (!isBetween(categoryVal.length, min, max)) {
        showsError(categoria, `Categoria deve ter no mínimo ${min} e no máximo ${max} caracteres.`)
    } else {
        showsSuccess(categoria);
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
    const isTitleValid = checkTitle();
    const isDescriptionValid = checkDescription();
    const isPriceValid = checkPrice();
    const isBrandValid = checkBrand();
    const isCategoryValid = checkCategory();
    const isURLValid = checkURL();

    // Submete o formulário, se válido
    if (isTitleValid &&
        isDescriptionValid &&
        isPriceValid &&
        isBrandValid &&
        isCategoryValid &&
        isURLValid) {

        addProduct();
    }
});