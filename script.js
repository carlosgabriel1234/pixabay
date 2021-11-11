"use strict";
const limparElementos = elemento =>{
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}

const carregarStatus = (status,pesquisa) =>{
    const container = document.querySelector(".status");
    const newStatus = document.createElement("p");
    newStatus.classList = ".txt-padrao";
    newStatus.innerHTML = `${status.totalHits} fotos grátis para ${pesquisa}`;
    container.appendChild(newStatus);
}

const pesquisarImagens = async(evento) =>{
    console.log(evento)
    if(evento.key == "Enter"|| evento.type=="click"){
        //recebendo value do select
        const tipoImagem = document.querySelector(".categorias").value;
        //recebendo value do input
        const pesquisa = document.querySelector("#pesquisa").value;
        //url json pixabay
        const url = `https://pixabay.com/api/?key=23670717-85b5103b3d880933d4e67c566&q=${pesquisa}&image_type=${tipoImagem}`;
        //fazendo requisição
        const response = await fetch(url);
        //Extraindo json
        const imagens = await response.json();
        console.log(imagens);

        limparElementos(document.querySelector("#container-galeria"));
        limparElementos(document.querySelector(".status"));

        carregarGaleria(imagens.hits);
        carregarStatus(imagens,pesquisa);
    }
}
const criarItem = item =>{
    const container = document.querySelector("#container-galeria");
    const newCard =document.createElement("div");
//    newCard.href = `${item.pageURL}`;
    const tags = item.tags.replace(/,+/g, '');
    newCard.innerHTML = `
                <a class="img-perfil" href="https://pixabay.com/users/${item.user}-${item.user_id}/">
                    <img class="img-perfil" src="${item.userImageURL}">
                </a>
                <div class="options">
                    <div class="info">${tags}</div>
                        <div class="info"><img src="img/like.png">${item.likes}</div>
                        <div class="row info"><img src="img/comentarios.png">${item.comments}</div>
                        <div class="row info"><img src="img/favorito.png"></div>
                </div>
                <a class="card-image"href="${item.pageURL}">
                <img class="card-image" src="${item.webformatURL}">
                </a>
            
            `;
    container.appendChild(newCard);
}


const carregarGaleria = imagens => imagens.forEach(criarItem);

document.querySelector("#pesquisa").addEventListener("keypress", pesquisarImagens);
document.querySelector(".categorias").addEventListener("selected", pesquisarImagens);
const search  = document.querySelector("#searchName").addEventListener("click", pesquisarImagens);
const pesquisa = document.getElementById('searchName')

const lupa = document.getElementById('searchName')

lupa.onclick = () =>pesquisarImagens;