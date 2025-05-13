import { Serie } from "./serie.js";

class Modelo {
    Series;
    constructor() {
    }
}

class Vista {
    constructor() {
        this.elementos = {
            series : document.getElementById("series"),
            btn_anterior : document.getElementById("anterior"),
            btn_siguiente : document.getElementById("siguiente")
        }
    }

    limpiarSeries() {
        this.elementos.series.innerHTML = "";
    }

}

class Controlador {
    Vista;
    Modelo;
    indiceSeries;
    constructor(p_vista, p_modelo) {
        this.Vista = p_vista;
        this.Modelo = p_modelo;
        this.indiceSeries = 1;
        this.cargarSeries(this.indiceSeries);
        this.registrarEventos();
    }

    cargarSeries(indice) {
        const nuevasSeries = [];
        const urls = [];

        for (let i = indice; i < (indice + 6); i++) {
            urls.push("https://api.tvmaze.com/shows/" + i);
        }

        const promesas = urls.map((url) => 
            fetch(url)
                .then(res => res.json())
                .then(response => new Serie(
                    response.id,
                    response.url,
                    response.name,
                    response.language,
                    response.genres,
                    response.image.medium
                )
            )
            );
        
        Promise.all(promesas)
            .then((series) => {
                nuevasSeries.push(...series);
                this.Modelo.Series = nuevasSeries;
                console.log(this.Modelo.Series);
                this.Vista.limpiarSeries();
                this.insertarSeries();
            })
            .catch(error => console.error("Error al cargar las series:", error));
    }

    insertarSeries() {
            this.Modelo.Series.forEach((serie) => {
            const elemento = serie.createHtmlElement();
            this.Vista.elementos.series.appendChild(elemento);
        });
    }

    paginaAnterior() {
        if (this.indiceSeries > 1) {
            this.indiceSeries -= 6;
            this.cargarSeries(this.indiceSeries);
        }
    }

    paginaSiguiente() {
        this.indiceSeries += 6;
        this.cargarSeries(this.indiceSeries);
    }

    registrarEventos() {
        this.Vista.elementos.btn_anterior.addEventListener("click", () => {
            this.paginaAnterior();
        });

        this.Vista.elementos.btn_siguiente.addEventListener("click", () => {
            this.paginaSiguiente();
        });
    }
}

var modelo = new Modelo();
var vista = new Vista();
var controlador = new Controlador(vista, modelo);

