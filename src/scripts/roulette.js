document.addEventListener('DOMContentLoaded', function(){

// console.log(buscaDePersonagens);
    // document.addEventListener('DOMContentLoaded', function(){


    document.getElementById('form-roulette').addEventListener('submit', function(evento){
        evento.preventDefault();
        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroAleatorio = Math.random() * numeroMaximo;
        numeroAleatorio = Math.round(numeroAleatorio + 1);
        // alert(numeroAleatorio);

        document.getElementById('resultado-valor').innerText = numeroAleatorio;
        // document.getElementById('resultado-valor-ceil').innerText = Math.ceil(numeroAleatorio);
        // document.getElementById('resultado-valor-floor').innerText = Math.floor(numeroAleatorio);
        // document.getElementById('resultado-valor-round').innerText = Math.round(numeroAleatorio);

        document.querySelector('.resultado').style.display = 'block';

            // ===============================================

        const API_URL = "https://rickandmortyapi.com/api/character/";
        fetch(API_URL)
        .then(response => response.text())
        .then(result => {   
            const data = JSON.parse(result);

            const listaDePersonagens = data.results;
            let id = listaDePersonagens[`${numeroAleatorio}`]; 
            console.log(id)



            const divResultado = document.querySelector('.resultado');

            let divImg =document.createElement('div');
                divImg.className = 'div-img';

            let imgP = document.createElement('img');
                imgP.className = "imgp";
                imgP.src = id.image.value;

            let p = document.createElement('p');
                p.className = 'pName';
                p.innerText = id.name.value;

            divResultado.appenchild(divImg);
                divImg.appendChild(imgP);
                    divImg.appendChild(p);



        });

    })
})

