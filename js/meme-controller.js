'use-strict'

var gElCanvas;
var gCtx;

let CANVAS_HEIGHT = 450;
let CANVAS_WIDTH = 450;



function init() {
    renderGalery();
    renderFontsList();
}

function renderFontsList() {
    const fontInputEl = getFontsInputEl();
    const fonts = getAvailableFonts();
    let optionsStr = '';
    for (const font of fonts) {
        optionsStr += `<option value="${font}">${font}</option>`;
    }
    fontInputEl.innerHTML = optionsStr;
}

function onFontChange(font) {
    const line = getSelectedLine();
    const fonts = getAvailableFonts();
    const fontIndex = fonts.indexOf(font);
    line.selectedFontIndex = fontIndex;
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
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
    addTxt('<Enter Your Text>', CANVAS_HEIGHT);
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

        for (let i = 0; i < gMeme.lines.length; i++) {
            if (gMeme.selectedLineIndx === i) {
                gCtx.lineWidth = 1
                gCtx.strokeStyle = `grey`;
            } else {
                gCtx.lineWidth = 3
                gCtx.strokeStyle = `black`;
            }
            let line = gMeme.lines[i];
            let txtSize = line.size;
            var selectedFont = getFontByIndex(line.selectedFontIndex);
            gCtx.font = `${txtSize}px ${selectedFont}`;
            let txt = line.txt;
            gCtx.textAlign = `${line.align}`;
            gCtx.fillStyle = `${line.color}`;
            gCtx.fillText(txt, line.x, line.y);
            gCtx.strokeText(txt, line.x, line.y);
        }
    }
}


function onAddTxt() {
    addTxt('<Enter Your Text>', CANVAS_HEIGHT);
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
    var elTxt = document.querySelector('input[name=txt-on-meme]');
    elTxt.value = getTxtOfSelectedLine();
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
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
}

function onClickTxtColorButton() {
    var colorInputEl = document.querySelector(".color-input");
    colorInputEl.focus();
    colorInputEl.click();
}

function onWritingTxt(chars) {
    if (gMeme.selectedLineIndx != null) {
        updateGmemeTxtWhileWriting(chars, CANVAS_HEIGHT);
        var imgUrl = getImgUrl();
        renderCanvas(imgUrl);
    }
}

function onDownloadCanvas(elDownloadBtn) {
    gMeme.selectedLineIndx = null;
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
    console.log(elDownloadBtn);
    setTimeout(() => {
        downloadCanvas(elDownloadBtn, gElCanvas);
    }, 100);
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