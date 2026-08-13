

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const mensagemSucesso = document.getElementById("mensagemSucesso");
const mensagemExclusao = document.getElementById("mensagemExclusao");
const telefone = document.getElementById("telefone");
const botao = document.getElementById("botao");
const listaClientes = document.getElementById("listaClientes");
const pesquisa = document.getElementById("pesquisa");
const contador = document.getElementById("contador");
const mensagemPesquisa = document.getElementById("mensagemPesquisa");

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

let indiceEditando = null;

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
    const confirmar = confirm("Tem certeza que deseja excluir este cliente?");

if (!confirmar) {
    return;
}

    clientes.splice(indice, 1);

    localStorage.setItem("clientes", JSON.stringify(clientes));

    mostrarClientes();
}

botao.addEventListener("click", function() {

    // Verifica se algum campo esta vazio
    if (nome.value === "" || email.value === "" || telefone.value === "") {
        alert("Preencha todos os campos!");
        return;
}


    if (isNaN(telefone.value)) {
    alert("Digite apenas números no telefone!");
    return;
}

 if (!email.value.includes("@") || !email.value.includes(".")) {
    alert("Digite um e-mail válido!");
    return;
}

    // Cria um cliente
    const cliente = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value
    };

    // Adiciona o cliente na lista
    if (indiceEditando === null) {

    clientes.push(cliente);

} else {

    clientes[indiceEditando] = cliente;

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
    
    mensagemSucesso.textContent = "✓ Cliente salvo com sucesso!";

setTimeout(() => {
    mensagemSucesso.textContent = "";
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




