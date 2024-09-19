console.log("Conectado...")

const selectMenu = document.querySelector(".select-menu"),
    selectBtn = selectMenu.querySelector(".select-btn"),
    options = selectMenu.querySelectorAll(".option"),
    btnText = selectMenu.querySelector(".s-btn-text");


selectBtn.addEventListener("click", function(){
    selectMenu.classList.toggle("active")
})


const fechaActualizacion = document.getElementById("fechaActualizacion")

options.forEach(option =>{
    option.addEventListener("click", function(){
        let selectedOption = option.querySelector(".option-text").innerText;
        btnText.innerText = selectedOption
        selectMenu.classList.remove("active")

        if(btnText.innerText === "Dolar"){
            cargarDolares()
        }

        if(btnText.innerText === "Real"){
            cargarReal()
        }

        if(btnText.innerText === "Euro"){
            cargarEuro();
        }
        
        if(btnText.innerText === "Peso Chileno"){
            cargaPesoChileno()
        }
        
        if(btnText.innerText === "Peso Uruguayo"){
            cargarPesoUruguayo()
        }
        
    })
})


function cargarDolares(){

    const contenedorCotizaciones = document.getElementById("containerCoti")


    fetch("https://dolarapi.com/v1/dolares")
        .then(response => response.json())
        .then(data =>{
            contenedorCotizaciones.innerHTML = ""
            data.forEach(divisa =>{
                const fecha = divisa.fechaActualizacion
                const card = document.createElement("div")
                card.innerHTML = `
                <div class="cards">
                    <h3 class="tipoDiv">${divisa.nombre}</h3>
                    <div class="info">
                        <div class="compraventa">
                            <h5>COMPRA</h5>
                            <h5>VENTA</h5>
                        </div>
                        <div class="precios">
                            <span>$${divisa.compra}</span>
                            <span>$${divisa.venta}</span>
                        </div>
                    </div>
                    <div class="btnInfo">
                            <span>Ultima Actualizacion:${formatearFecha(fecha)}</span>
                    </div>
                 </div>
                `;
                contenedorCotizaciones.appendChild(card)
            })
            
        });
}

function cargarReal(){

    const contenedorCotizaciones = document.getElementById("containerCoti")


    fetch("https://dolarapi.com/v1/cotizaciones/brl")
        .then(response => response.json())
        .then(data =>{
                console.log(data)
                const card = document.createElement("div")
                contenedorCotizaciones.innerHTML = ""
                const fecha = data.fechaActualizacion
                card.innerHTML = `
                <div class="cards">
                    <h3 class="tipoDiv">${data.nombre}</h3>
                    <div class="info">
                        <div class="compraventa">
                            <h5>COMPRA</h5>
                            <h5>VENTA</h5>
                        </div>
                        <div class="precios">
                            <span>$${data.compra}</span>
                            <span>$${data.venta}</span>
                        </div>
                    </div>
                    <div class="btnInfo">
                            <span>Ultima Actualizacion:${formatearFecha(fecha)}</span>
                    </div>
                 </div>
                `;
                contenedorCotizaciones.appendChild(card)            
        });

}

function cargarEuro(){

    const contenedorCotizaciones = document.getElementById("containerCoti")


    fetch("https://dolarapi.com/v1/cotizaciones/eur")
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        const card = document.createElement("div")
        const fecha = data.fechaActualizacion
        contenedorCotizaciones.innerHTML = ""
        card.innerHTML = `
        <div class="cards">
            <h3 class="tipoDiv">${data.nombre}</h3>
            <div class="info">
                <div class="compraventa">
                    <h5>COMPRA</h5>
                    <h5>VENTA</h5>
                </div>
                <div class="precios">
                    <span>$${data.compra}</span>
                    <span>$${data.venta}</span>
                </div>
            </div>
            <div class="btnInfo">
                     <span>Ultima Actualizacion:${formatearFecha(fecha)}</span>
            </div>
         </div>
        `;
        contenedorCotizaciones.appendChild(card)            
    });
}

function cargaPesoChileno(){

    const contenedorCotizaciones = document.getElementById("containerCoti")

    fetch("https://dolarapi.com/v1/cotizaciones/clp")
        .then(response => response.json())
        .then(data => {
            const card = document.createElement("div")
            const fecha = data.fechaActualizacion
            contenedorCotizaciones.innerHTML = ""
            card.innerHTML = `
            <div class="cards">
                <h3 class="tipoDiv">${data.nombre}</h3>
                <div class="info">
                    <div class="compraventa">
                        <h5>COMPRA</h5>
                        <h5>VENTA</h5>
                    </div>
                    <div class="precios">
                        <span>$${data.compra}</span>
                        <span>$${data.venta}</span>
                    </div>
                </div>
                <div class="btnInfo">
                     <span>Ultima Actualizacion:${formatearFecha(fecha)}</span>
                </div>
             </div>
            `;
            contenedorCotizaciones.appendChild(card)         
        });
}

function cargarPesoUruguayo(){
    const contenedorCotizaciones = document.getElementById("containerCoti")

    fetch("https://dolarapi.com/v1/cotizaciones/uyu")
        .then(response => response.json())
        .then(data => {
            const fecha = data.fechaActualizacion

            const card = document.createElement("div")
            contenedorCotizaciones.innerHTML = ""
            card.innerHTML = `
            <div class="cards">
                <h3 class="tipoDiv">${data.nombre}</h3>
                <div class="info">
                    <div class="compraventa">
                        <h5>COMPRA</h5>
                        <h5>VENTA</h5>
                    </div>
                    <div class="precios">
                        <span>$${data.compra}</span>
                        <span>$${data.venta}</span>
                    </div>
                </div>
                <div class="btnInfo">
                     <span>Ultima Actualizacion:${formatearFecha(fecha)}</span>
                </div>
             </div>
            `;
            contenedorCotizaciones.appendChild(card)   
        });

}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);

    const dia = ("0" + fecha.getDate()).slice(-2);
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // Los meses en JavaScript van de 0 a 11
    const año = fecha.getFullYear();

    const horas = ("0" + fecha.getHours()).slice(-2);
    const minutos = ("0" + fecha.getMinutes()).slice(-2);

    return `${dia}/${mes}/${año} ${horas}:${minutos}`;
}

function activeList(){
    const element = document.querySelectorAll(".element-list")
    const title = document.getElementById("title-type")
    
    element.forEach(li =>{
        li.addEventListener("click", function(e){

            if(e.target === title){
                return;
            }

            element.forEach(el => el.classList.remove("active"));

            li.classList.add("active")
        })
    })

}


function loadPage(page){
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(data =>{
            document.getElementById("content").innerHTML = data;
        })
        .catch(error => console.error("Error al cargar la pagina: ", error));
}


function spa(){
    document.querySelectorAll(".element-list").forEach(item =>{
        item.addEventListener("click", e =>{
            const page = item.getAttribute('data-page');
            loadPage(page);
        })
    })

    window.addEventListener("popstate", function(){
        const page = location.pathname.substring(1);
        loadPage(page || "explicacion");
    })

}


document.addEventListener("DOMContentLoaded", function(){
    
    const page = location.pathname.substring(1);
    loadPage(page || "explicacion");

    spa();
    
    cargarDolares()

    activeList()
})