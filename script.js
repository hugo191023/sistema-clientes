

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const mensagemSucesso = document.getElementById("mensagemSucesso");
const mensagemErro = document.getElementById("mensagemErro");
const mensagemExclusao = document.getElementById("mensagemExclusao");
const telefone = document.getElementById("telefone");
const botao = document.getElementById("botao");
const listaClientes = document.getElementById("listaClientes");
const pesquisa = document.getElementById("pesquisa");
const contador = document.getElementById("contador");
const mensagemPesquisa = document.getElementById("mensagemPesquisa");
const modalExclusao = document.getElementById("modalExclusao");
const textoModal = document.getElementById("textoModal");
const cancelarExclusao = document.getElementById("cancelarExclusao");
const confirmarExclusao = document.getElementById("confirmarExclusao");

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

let indiceEditando = null;
let indiceParaExcluir = null;

function mostrarClientes() {

    listaClientes.innerHTML = "";

    contador.textContent = clientes.length;

    clientes.forEach(function(cliente, indice) {

       const iniciais = cliente.nome
    .split(" ")
    .map(parte => parte.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();

listaClientes.innerHTML +=
    '<div class="cliente-card">' +
        '<div class="cliente-topo">' +
            '<div class="cliente-avatar">' + iniciais + '</div>' +
            '<div class="cliente-info">' +
                '<h3>' + cliente.nome + '</h3>' +
                '<p>' + cliente.email + '</p>' +
                '<p>' + cliente.telefone + '</p>' +
           '</div>' +
           '<div class="acoes">' +
                '<button onclick="editarCliente(' + indice + ')">Editar</button>' +
                '<button onclick="excluirCliente(' + indice + ')">Excluir</button>' +
            '</div>' +
            '</div>' +
            '</div>';

    });
}

function editarCliente(indice) {

    nome.value = clientes[indice].nome;
    email.value = clientes[indice].email;
    telefone.value = clientes[indice].telefone;

    indiceEditando = indice;

    botao.textContent = "Salvar alteração";
    window.scrollTo({
        top: 0,
        behavior: "smooth"
});

}

mostrarClientes();


function excluirCliente(indice) {
    indiceParaExcluir = indice;

    textoModal.textContent = `Tem certeza que deseja excluir ${clientes[indice].nome}?`;

    modalExclusao.style.display = "flex";
}
botao.addEventListener("click", function() {

    // Verifica se algum campo esta vazio
    if (nome.value === "" || email.value === "" || telefone.value === "") {
        mensagemErro.textContent = "⚠ Preencha todos os campos!";
        mensagemErro.style.display = "inline-block";
        return;
}
const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nome.value.trim());

if (!nomeValido || nome.value.trim().length < 3) {
    mensagemErro.textContent = "⚠ Digite um nome válido!";
    mensagemErro.style.display = "inline-block";
    return;
}

  const numeroTelefone = telefone.value.replace(/\D/g, "");

if (numeroTelefone.length !== 11) {
    mensagemErro.textContent = "⚠ Digite um telefone válido com 11 números!";
    mensagemErro.style.display = "inline-block";
    return;
}

 if (!email.value.includes("@") || !email.value.includes(".")) {
    mensagemErro.textContent = "⚠ Digite um e-mail válido!";
    mensagemErro.style.display = "inline-block";
    return;
}
    const emailDuplicado = clientes.some(function(cliente, indice) {
        return cliente.email.toLowerCase() === email.value.toLowerCase()
            && indice !== indiceEditando;
});

if (emailDuplicado) {
    mensagemErro.textContent = "⚠ Este e-mail já está cadastrado!";
    mensagemErro.style.display = "inline-block";
    return;
}
    mensagemErro.textContent = "";
    mensagemErro.style.display = "none";
    
    // Cria um cliente
    const cliente = {
        nome: nome.value
        .trim()
        .toLowerCase()
        .split(" ")
        .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1))
        .join(" "),
    email: email.value,
    telefone: telefone.value
    };

    // Adiciona o cliente na lista
    let mensagemOperacao = "";
    
    if (indiceEditando === null) {

    clientes.push(cliente);
    mensagemOperacao = "✓ Cliente cadastrado com sucesso!";

} else {

    clientes[indiceEditando] = cliente;
    mensagemOperacao = "✓ Cliente atualizado com sucesso!";

    indiceEditando = null;

    botao.textContent = "Cadastrar";
}

    // Salva a lista no navegador
    localStorage.setItem("clientes", JSON.stringify(clientes));

   mostrarClientes();

    // Limpa os campos
    nome.value = "";
    email.value = "";
    telefone.value = "";
    
    mensagemSucesso.textContent = mensagemOperacao;
    mensagemSucesso.style.display = "inline-block";

setTimeout(() => {
    mensagemSucesso.textContent = "";
    mensagemSucesso.style.display = "none";
}, 3000);

});

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    const cards = document.querySelectorAll(".cliente-card");

    let encontrados = 0;

    cards.forEach(function(card) {

        const nomeCliente = card.textContent.toLowerCase();

        if (nomeCliente.includes(texto)) {
            card.style.display = "block";
            encontrados++;
        } else {
            card.style.display = "none";
        }

    });

    if (encontrados === 0 && texto !== "") {
        mensagemPesquisa.textContent = "Nenhum cliente encontrado.";
    } else {
        mensagemPesquisa.textContent = "";
    }

});
telefone.addEventListener("input", function () {

    let numero = telefone.value.replace(/\D/g, "");

    numero = numero.slice(0, 11);

    if (numero.length > 10) {
        numero = numero.replace(
            /(\d{2})(\d{5})(\d{4})/,
            "($1) $2-$3"
        );
    }

    telefone.value = numero;
});
cancelarExclusao.addEventListener("click", function() {
    modalExclusao.style.display = "none";
    indiceParaExcluir = null;
});



