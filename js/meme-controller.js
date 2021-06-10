'use-strict'

var gElCanvas;
var gCtx;

const CANVAS_HEIGHT = 450;
const CANVAS_WIDTH = 450;



function init() {
    renderGalery();
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
    galeryToDisplayNone();
    memeEditorToDisplayBlock();
    renderCanvas(imgUrl);
};


function renderCanvas(imgUrl) {
    if (!gElCanvas) {
        gElCanvas = document.querySelector('.img-canvas');
        gCtx = gElCanvas.getContext('2d');
    }
    var imgObj = new Image();
    imgObj.src = imgUrl;
    imgObj.onload = () => {
        gCtx.drawImage(imgObj, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gCtx.lineWidth = 1
        for (let i = 0; i <= gMeme.lines.length; i++) {
            if (gMeme.selectedLineIndx === i) {
                gCtx.strokeStyle = `black`
            } else {
                gCtx.strokeStyle = `grey`
            }
            let line = gMeme.lines[i];
            let txtSize = line.size;
            gCtx.font = `${txtSize}px impact`
            let txt = line.txt;
            gCtx.textAlign = `${line.align}`
            gCtx.fillStyle = `${line.color}`
            gCtx.fillText(txt, line.x, line.y)
            gCtx.strokeText(txt, line.x, line.y)
        }
    }
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
    deleteLine(CANVAS_HEIGHT);
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
}

function moveTxt(ev) {
    var imgUrl = getImgUrl();
    var meme = getGmeme();
    if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        meme.lines[meme.selectedLineIndx].y -= 5;
        renderCanvas(imgUrl);
    } else if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        meme.lines[meme.selectedLineIndx].y += 5;
        renderCanvas(imgUrl);
    } else if (ev.key === 'ArrowRight') {
        ev.preventDefault();
        meme.lines[meme.selectedLineIndx].x += 5;
        renderCanvas(imgUrl);
    } else if (ev.key === 'ArrowLeft') {
        ev.preventDefault();
        meme.lines[meme.selectedLineIndx].x -= 5;
        renderCanvas(imgUrl);
    }
}

function onMoveTxt(txtMoveAction) {
    var imgUrl = getImgUrl();
    var meme = getGmeme();
    if (txtMoveAction === 'up') {
        meme.lines[meme.selectedLineIndx].y -= 5;
        renderCanvas(imgUrl);
    } else if (txtMoveAction === 'down') {
        meme.lines[meme.selectedLineIndx].y += 5;
        renderCanvas(imgUrl);
    } else if (txtMoveAction === 'right') {
        meme.lines[meme.selectedLineIndx].x += 5;
        renderCanvas(imgUrl);
    } else if (txtMoveAction === 'left') {
        meme.lines[meme.selectedLineIndx].x -= 5;
        renderCanvas(imgUrl);
    }
}

function onAlignTxt(txtAlignAction) {
    var imgUrl = getImgUrl();
    var meme = getGmeme();
    if (txtAlignAction === 'center') {
        meme.lines[meme.selectedLineIndx].align = txtAlignAction;
        renderCanvas(imgUrl);
    } else if (txtAlignAction === 'right') {
        meme.lines[meme.selectedLineIndx].align = txtAlignAction;
        renderCanvas(imgUrl);
    } else if (txtAlignAction === 'left') {
        meme.lines[meme.selectedLineIndx].align = txtAlignAction;
        renderCanvas(imgUrl);
    }
}

function onPickTxtColor(color) {
    console.log(color);
    updateGmemeTxtColor(color);
    renderCanvas();
}


function onWritingTxt(chars) {
    updateGmemeTxtWhileWriting(chars, CANVAS_HEIGHT);
    renderCanvas();
}

function onDownloadCanvas(elDownloadBtn) {
    console.log(elDownloadBtn);
    downloadCanvas(elDownloadBtn, gElCanvas);
}


function onReturnToGalery() {
    galeryToDisplayBlock();
    memeEditorToDisplayNone();
}


function galeryToDisplayNone() {
    var elGaleryWrapper = document.querySelector('.galery-wrapper');
    elGaleryWrapper.style.display = 'none';
}

function memeEditorToDisplayBlock() {
    var elMemeEditor = document.querySelector('.main-meme-editor-container');
    elMemeEditor.style.display = 'block';
}

function galeryToDisplayBlock() {
    var elGaleryWrapper = document.querySelector('.galery-wrapper');
    elGaleryWrapper.style.display = 'block';
}

function memeEditorToDisplayNone() {
    var elMemeEditor = document.querySelector('.main-meme-editor-container');
    elMemeEditor.style.display = 'none';
}

function onWritingTxt(chars) {
    console.log(chars);
}