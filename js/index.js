const APIKEY = 'hM1BBT7R3dCJxLggrbB8WqyCRsi1Py9E';

//Menú Hamburguesa
let navBar = document.getElementById('navBar');
navBar.addEventListener('click', () => {

    navBarClose.classList.remove('hidden');
    navBar.classList.add('hidden');
    document.getElementById('ulNavBar').classList.toggle('active')
});

let navBarClose = document.getElementById('navBarClose');
navBarClose.addEventListener('click', () => {

    navBarClose.classList.add('hidden');
    navBar.classList.remove('hidden');
    document.getElementById('ulNavBar').classList.toggle('active')
});

/* Cambiar tema Nocturno */
const btnTheme = document.querySelector('#theme');
var modeTheme = 0;
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('changeTheme');
    if (btnTheme.innerText == "MODO NOCTURNO") {
        btnTheme.innerText = "MODO DIURNO";
        modeTheme = 1;
        /* debugger */
        ImgDarkTheme();
    } else {
        btnTheme.innerText = "MODO NOCTURNO";
        modeTheme = 0;
        ImgLightTheme();
    }
    /* Enviar información del cambio de modo */
    localStorage.setItem('sendTheme', JSON.stringify(modeTheme));
});

let logo = document.getElementById('logo');
let burger = document.getElementById('navBar');
let closeNav = document.getElementById('navBarClose');
let camara = document.getElementById('camara');
let movie = document.getElementById('movie');
let btnSearch = document.getElementById('imgBtnSearch');
let imgCloseSearch = document.getElementById('imgCloseSearch');

function ImgDarkTheme() {
    logo.src = "./img/Logo-modo-noc.svg";
    burger.src = "./img/burger-modo-noct.svg";
    closeNav.src = "./img/close-modo-noct.svg";
    if (camara != null && movie != null) {
        camara.src = "./img/camara-modo-noc.svg";
        movie.src = "./img/pelicula-modo-noc.svg";
    }
    if (btnSearch != null) {
        btnSearch.src = "./img/icon-search-mod-noc.svg";
        imgCloseSearch.src = "./img/close-modo-noct.svg";
    }
}

function ImgLightTheme() {
    logo.src = "./img/logo-desktop.svg";
    burger.src = "./img/burger.svg";
    closeNav.src = "./img/button-close.svg";
    if (camara != null && movie != null) {
        camara.src = "./img/camara.svg";
        movie.src = "./img/pelicula.svg";
    }
    if (btnSearch != null) {
        btnSearch.src = "./img/icon-search.svg";
        imgCloseSearch.src = "./img/button-close.svg";
    }
}


//traer información del tema actual
var modeThemeResponse = JSON.parse(localStorage.getItem('sendTheme'));

//Mantener Tema al cambiar de páginas index
if (modeThemeResponse == 1) {
    document.body.classList.toggle('changeTheme');
    btnTheme.innerText = "Modo  Diurno";
    ImgDarkTheme();
} else {
    ImgLightTheme();
}

async function downloadFullScreen(e) {

    let imgFullScreen = document.getElementById('imgFullScreen').src;

    let a = document.createElement('a');
    let response = await fetch(imgFullScreen);
    let file = await response.blob();
    a.download = e.id;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}
var arrayFavorites = [];

var arrFav = JSON.parse(localStorage.getItem("sendFavorites"));
if (arrFav != null) {
    arrayFavorites = arrFav;
}

function addFavoritesFullScreen(iconFavorite) {

    let imgFullScreen = document.getElementById('imgFullScreen').src;

    arrayFavorites.push(imgFullScreen);
    localStorage.setItem('sendFavorites', JSON.stringify(arrayFavorites));
}

function fullScreen(iconFullScreen) {


    let idImgFullScreen = iconFullScreen.id;
    let extractLastDigit = idImgFullScreen.slice(6, idImgFullScreen.length);
    let imgFullScreenSrc = document.getElementById(`imgGIF${extractLastDigit}`).src;

    let imgClose = document.createElement('img');
    imgClose.src = '..img/close.svg';
    imgClose.classList.add('styleClose');
    imgClose.setAttribute('onclick', 'closeFullScreen()');


    /* CONTENEDOR CON IMAGEN Y FLECHAS - SIGUIENTE ANTERIOR ***********/

    let imgFullScreen = document.createElement('img');
    imgFullScreen.src = imgFullScreenSrc;
    imgFullScreen.classList.add('styleImgFullScreen');
    imgFullScreen.setAttribute('id', `imgFullScreen`);

    let divImgDirection = document.createElement('div');
    divImgDirection.classList.add('styleImgDirection');

    divImgDirection.appendChild(imgFullScreen);



    /* CONTENEDOR CON TITULOS Y ICONOS *******/
    let pUser = document.createElement('p');
    pUser.innerText = "User";

    let getTitle = document.getElementById(`divGif${extractLastDigit}`);
    let sendTitle = getTitle.getElementsByClassName('pTitle')[0].innerText;

    let pTitle = document.createElement('p');
    pTitle.innerText = sendTitle;

    let divText = document.createElement('div');
    divText.classList.add('styleDivText');

    divText.appendChild(pUser);
    divText.appendChild(pTitle);

    let imgFavorite = document.createElement('img');
    imgFavorite.src = "./img/icon-fav-hover.svg";
    imgFavorite.setAttribute('onclick', 'addFavoritesFullScreen(this)');
    imgFavorite.setAttribute('class', 'icon imgFavorite');


    let imgDownload = document.createElement('img');
    imgDownload.src = "./img/icon-download.svg";
    imgDownload.setAttribute('onclick', 'downloadFullScreen(this)');
    imgDownload.setAttribute('class', 'icon imgDownload');

    let divDescription = document.createElement('div');
    divDescription.classList.add('styleDivDescription');

    divDescription.appendChild(divText);
    divDescription.appendChild(imgFavorite);
    divDescription.appendChild(imgDownload);

    /* CONTENEDOR PRINCIPAL *******/
    let divFullScreen = document.getElementById('divFullScreen');
    divFullScreen.classList.add('styleFullScreen');
    divFullScreen.classList.remove('hidden');

    divFullScreen.appendChild(imgClose);
    divFullScreen.appendChild(divImgDirection);
    divFullScreen.appendChild(divDescription);
    document.querySelector('body').appendChild(divFullScreen);


}