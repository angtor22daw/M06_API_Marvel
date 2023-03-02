var xhr;

function inici() {
    try {
        // Firefox, Opera 8.0+, Safari, Chrome
        xhr = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
            //ie6+
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
                //ie5
            } catch (e) {
                alert("El teu navegador no suporta AJAX!");
                return false;
            }
        }
    }

    const socket = io();

    // const container = document.querySelector('#comics');

    document.getElementById("cercar").onkeyup = function () {
        socket.emit('dadesDesDelClient', {
            dades: this.value
        });

        socket.on('dadesAPI', function (data) {
            console.log('CLIENT -> dades rebudes del servidor WEBSOCKET->' + data.dades);

            let contentHTML = '';

            for (const comic of data.dades.data.results) {
                if (comic.thumbnail.path == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
                    comic.thumbnail.path = "../public/imatges/marvelComics";
                    comic.thumbnail.extension = "jpg";
                }

                // Llista dels personatges del comic
                var comicPersonatges = comic.characters.items;
                var llistaPersonatges = [];
                for (var i = 0; i < comicPersonatges.length; i++) {
                    llistaPersonatges.push(comicPersonatges[i].name);
                }
                comic.characters = llistaPersonatges.join(", ");
                comic.characters = comic.characters ? comic.characters : "No s'ha trobat cap personatge.";

                // Descripció del comic
                var comicDescription = comic.description ? comic.description : "No s'ha trobat cap descripció.";
                
                // Portada del comic imatge + titol
                contentHTML += `
                <div class="divComic">
                    <img class="imgComic" src="${comic.thumbnail.path}.${comic.thumbnail.extension}"  alt="${comic.title}">
                    <div class="comicData">
                        <p class="comicTitulo">${comic.title}</p>
                        <p class="comicDescripcion">${comicDescription}</p>
                        <p class="comicPersonatges">${comic.characters}</p>
                    </div>
                </div>
            `;
            }
            document.querySelector('#comics').innerHTML = contentHTML;

        });
    };

    const vBody = document.querySelector('body');

    vBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('divComic')) {
            // document.querySelector('.hidden').style.display = 'block';
            // console.log('Haz hecho clic en el div comics');

            // obtener el título y la imagen del cómic seleccionado
            const comicTitulo = e.target.querySelector('.comicTitulo').innerHTML;
            const comicImagen = e.target.querySelector('.imgComic').src;
            const comicDescripcion = e.target.querySelector('.comicDescripcion').innerHTML;
            const comicPersonatges = e.target.querySelector('.comicPersonatges').innerHTML;

            // obtener el div oculto y establecer su estilo de visualización en "block"
            const hiddenDiv = document.querySelector('.hidden');
            hiddenDiv.style.display = 'block';

            // establecer el contenido del título y la imagen en el HTML del div oculto
            hiddenDiv.innerHTML = `
                <h2 class="comicTituloSELECT">${comicTitulo}</h2>
                <img class="comicImgSELECT" src="${comicImagen}" alt="${comicTitulo}">
                <p class="comicDescripcionSELECT"><b>Descripció: </b>${comicDescripcion}</p>
                <p class="comicPersonatgesSELECT"><b>Personatges: </b>${comicPersonatges}</p>
                
            `;
        } else {
            document.querySelector('.hidden').style.display = 'none';
        }
    });
}

// NECESAARIO AL FINAL
window.addEventListener("load", inici, true);