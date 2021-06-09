'use-strict'

var gElCanvas;
var gCtx;

const CANVAS_HEIGHT = 450;
const CANVAS_WIDTH = 450;



function init() {
    renderGalery()
}

function renderGalery() {
    var imges = getImges();
    var id = 0;
    var strHTMLs = imges.map(function(img) {
        return `<img id="${id + 1}" class="galery-img" src="${img.url}" alt="img + ${id++}">`
    })
    document.querySelector('.imges-container').innerHTML = strHTMLs.join('')
}


function onClickImg(ev) {
    var imgId = +ev.toElement.id;
    firstUpdatOfeGmeme(imgId);
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
};

function renderCanvas(imgUrl) {
    var strHTML = `<canvas width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" onclick="draw(event)" class="img-canvas"></canvas>`
    document.querySelector('.canvas-container').innerHTML = strHTML;
    gElCanvas = document.querySelector('.img-canvas');
    gCtx = gElCanvas.getContext('2d');
    var imgObj = new Image();
    imgObj.src = imgUrl;
    imgObj.onload = (imgId) => {
        gCtx.drawImage(imgObj, 0, 0);
        gCtx.lineWidth = 1
        gCtx.fillStyle = `blue`
        gCtx.textAlign = `center`

        for (let i = 0; i < gMeme.lines.length; i++) {
            if (gMeme.selectedLineIndx === i) {
                gCtx.strokeStyle = `yellow`
            } else {
                gCtx.strokeStyle = `red`
            }
            let line = gMeme.lines[i];
            let txt = line.txt;
            gCtx.font = `${line.size}px Arial`
            gCtx.fillText(txt, line.x, line.y)
            gCtx.strokeText(txt, line.x, line.y)
        }
    }
}

function draw(ev) {
    console.log(ev);
}

function onAddTxt() {
    var elTxt = document.querySelector('input[name=txt-on-meme]');
    if (elTxt.value === "") return;
    addTxt(elTxt.value, CANVAS_HEIGHT);
    elTxt.value = '';
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
}

function onResizeTxt(txtResizeAction) {
    updateGmemeTxtSize(txtResizeAction);
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
}

function onSwitchTxtLine() {
    updateSelectedLineIndx();
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);

}

function onDeleteTxt() {
    deleteLine()
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
}