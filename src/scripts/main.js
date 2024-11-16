const API_URL = "https://rickandmortyapi.com/api/character/";

fetch(API_URL)
    .then(response => response.text())
    .then(result => {   
        const data = JSON.parse(result);

        const listaDePersonagens = data.results;
        
        console.log(listaDePersonagens);
    
        listaDePersonagens.map(element => {

            let thebox = document.getElementById("thebox");
            
            let div = document.createElement("div");
            div.className = "item";
            
            let h4 = document.createElement('h4');
            h4.className = 'h4-name';
            h4.innerText = element.name;
            
            let image = document.createElement("img");
            image.className = "card-img";
            image.src = element.image;                     

            thebox.appendChild(div);
            div.appendChild(image);
            div.appendChild(h4);          
            
        });
    });

