

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
    
    mensagemExclusao.textContent = "✓ Cliente excluído com sucesso!";
    mensagemExclusao.style.display = "inline-block";

    setTimeout(() => {
    mensagemExclusao.textContent = "";
    mensagemExclusao.style.display = "none";
}, 3000);

}

botao.addEventListener("click", function() {

    // Verifica se algum campo esta vazio
    if (nome.value === "" || email.value === "" || telefone.value === "") {
        mensagemErro.textContent = "⚠ Preencha todos os campos!";
        mensagemErro.style.display = "inline-block";
        return;
}


    if (isNaN(telefone.value)) {
    mensagemErro.textContent = "⚠ Digite apenas números no telefone!";
    mensagemErro.style.display = "inline-block";
    return;
}

 if (!email.value.includes("@") || !email.value.includes(".")) {
    mensagemErro.textContent = "⚠ Digite um e-mail válido!";
    mensagemErro.style.display = "inline-block";
    return;
}
    mensagemErro.textContent = "";
    mensagemErro.style.display = "none";
    // Cria um cliente
    const cliente = {
        nome: nome.value,
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




