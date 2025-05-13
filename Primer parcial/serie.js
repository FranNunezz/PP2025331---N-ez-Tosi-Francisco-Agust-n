export class Serie {
    constructor(id, url, name, language, generes, image) {  
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.generes = generes;
        this.image = image;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static fromJsonString(jsonString) {
        const jsonObject = JSON.parse(jsonString);
        return new Serie(
            jsonObject.id,
            jsonObject.url,
            jsonObject.name,
            jsonObject.language,
            jsonObject.generes,
            jsonObject.image
        );
    }

    static guardarSerie(serie) {
        let seriesGuardadas = JSON.parse(localStorage.getItem("series")) || [];
        
        if (serie in seriesGuardadas) {
            console.log("La serie ya está guardada");
            return;
        } else {
            seriesGuardadas.push(serie);
            localStorage.setItem("series", JSON.stringify(seriesGuardadas));
            console.log("Serie guardada");
        }
    }

    createHtmlElement() {
        const div = document.createElement("div");
        const generos = document.createElement("ul");
        div.className = "serie";
        
        this.generes.forEach((genero) => {
            const item = document.createElement("li");
            item.innerText = genero;    
            generos.appendChild(item); 
        });

        div.innerHTML = `
            <a href="${this.url}" target="_blank"><img src="${this.image}" alt="${this.name}"></a>
            <h2>${this.name}</h2>
            <p>Idioma:${this.language}</p>
            <p>Generos:</p>
        `;
        div.appendChild(generos);

        const btn = document.createElement("button");
        btn.innerText = "Guardar";
        div.appendChild(btn);

        return div;
    }
}