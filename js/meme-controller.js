'use-strict'

var gElCanvas;
var gCtx;

let CANVAS_HEIGHT = 400;
let CANVAS_WIDTH = 400;


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
    line.txtFont = font;
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
}

function renderGalery() {
    var imges = getFilterdImages();
    var id = 0;
    var strHTMLs = imges.map(function(img) {
        return `<img id="${id + 1}" class="galery-img" src="${img.url}" alt="img + ${id++}">`
    })
    document.querySelector('.imges-container').innerHTML = strHTMLs.join('')
}



function onClickImg(ev) {
    var imgId = +ev.toElement.id;
    firstUpdatOfeGmeme(imgId);
    addTxt('<Enter Your Text>', CANVAS_HEIGHT, CANVAS_WIDTH);
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

    gCtx.drawImage(imgObj, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 0; i < gMeme.lines.length; i++) {
        let line = gMeme.lines[i];
        let txtSize = line.size;
        gCtx.lineWidth = 2
        gCtx.strokeStyle = `${line.strokeColor}`;
        var selectedFont = line.txtFont;
        gCtx.font = `${txtSize}px ${selectedFont}`;
        let txt = line.txt;

        gCtx.fillStyle = `${line.color}`;
        gCtx.fillText(txt, line.x, line.y);
        gCtx.strokeText(txt, line.x, line.y);
        if (gMeme.selectedLineIndx === i) {
            const text = line.txt;
            let width = gCtx.measureText(text).width + 3;
            const height = txtSize;
            let x = line.x;
            let y = line.y - height + 5;
            const align = line.align;
            drawRect(x, y, width, height);
        }
    }
}


function onAddTxt() {
    addTxt('<Enter Your Text>', CANVAS_HEIGHT, CANVAS_WIDTH);
    updateInputTextToSelected();
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
    updateInputTextToSelected();
    updateInputTextColorToSelected();
    updateInputStrokeColorToSelected();
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
}

function updateInputTextToSelected() {
    var elTxt = document.querySelector('input[name=txt-on-meme]');
    elTxt.value = getTxtOfSelectedLine();
}

function updateInputTextColorToSelected() {
    var elTextColorInput = document.querySelector('.color-input');
    const selectedLine = getSelectedLine();
    elTextColorInput.value = selectedLine.color;
}

function updateInputStrokeColorToSelected() {
    var elTextColorInput = document.querySelector('.stroke-color-input');
    const selectedLine = getSelectedLine();
    elTextColorInput.value = selectedLine.strokeColor;
}

function onDeleteTxt() {
    deleteLine(CANVAS_HEIGHT);
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
}

function moveTxt(ev) {
    if (ev.key === 'Enter') return;
    var imgUrl = getImgUrl();
    var meme = getGmeme();
    if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        meme.lines[meme.selectedLineIndx].y -= 5;
    } else if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        meme.lines[meme.selectedLineIndx].y += 5;
    } else if (ev.key === 'ArrowRight') {
        ev.preventDefault();
        meme.lines[meme.selectedLineIndx].x += 5;
    } else if (ev.key === 'ArrowLeft') {
        ev.preventDefault();
        meme.lines[meme.selectedLineIndx].x -= 5;
    }
    renderCanvas(imgUrl);
}

function onMoveTxt(txtMoveAction) {
    var imgUrl = getImgUrl();
    var meme = getGmeme();
    if (txtMoveAction === 'up') {
        meme.lines[meme.selectedLineIndx].y -= 5;
    } else if (txtMoveAction === 'down') {
        meme.lines[meme.selectedLineIndx].y += 5;
    } else if (txtMoveAction === 'right') {
        meme.lines[meme.selectedLineIndx].x += 5;
    } else if (txtMoveAction === 'left') {
        meme.lines[meme.selectedLineIndx].x -= 5;
    }
    renderCanvas(imgUrl);
}

function onAlignTxt(txtAlignAction) {
    var imgUrl = getImgUrl();
    var meme = getGmeme();
    var selectedMeme = meme.lines[meme.selectedLineIndx];
    selectedMeme.align = txtAlignAction;
    var txtWidth = gCtx.measureText(selectedMeme.txt).width;
    if (txtAlignAction === 'left') {
        selectedMeme.x = 10;
    } else if (txtAlignAction === 'right') {
        selectedMeme.x = CANVAS_WIDTH - (txtWidth + 10);
    } else {
        selectedMeme.x = (CANVAS_WIDTH / 2) - (txtWidth / 2);
    }
    renderCanvas(imgUrl);
}

function onPickTxtColor(color) {
    updateGmemeTxtColor(color);
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
}

function onClickStrokeColor() {
    var colorInputEl = document.querySelector(".stroke-color-input");
    colorInputEl.click();
}

function onPickStrokeColor(color) {
    updateGmemeStrokeColor(color);
    var imgUrl = getImgUrl();
    renderCanvas(imgUrl);
}

function onClickColorInput(ev) {
    ev.stopPropagation();
}

function onClickTxtColorButton(ev) {
    var colorInputEl = document.querySelector(".color-input");
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

function drawRect(x, y, width, height) {
    gCtx.beginPath()
    gCtx.rect(x, y, width, height)
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'yellow'
    gCtx.stroke()
}

function onSearchInGalery(ev, searchValue) {
    console.log(ev);
    if (ev.key === 'Enter') return;
    ev.stopPropagation();
    filterSearchResults(searchValue);
    filterSearchResultByFullWord(searchValue);
    renderGalery();
    renderMostFrequentWordsSearch();
}

function renderMostFrequentWordsSearch() {
    var elMostFrequentWordsBox = document.querySelector('.words-wrapper');
    var strHTMLs = '';
    var wordsMap = getMostFrequentSearchWordsMpa();
    wordsMap.forEach((value, key) => {
        strHTMLs += `<h5 class="frequent-word" style="font-size:${1.25 +value}rem;">${key}</h5>`;
    })
    elMostFrequentWordsBox.innerHTML = strHTMLs;
}