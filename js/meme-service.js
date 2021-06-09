'use-strict'
var gMeme;

var gImges = [
    { id: 1, url: './meme-imgs (square)/1.jpg', Keywords: ['trump'] },
    { id: 2, url: './meme-imgs (square)/2.jpg', Keywords: ['dogs'] },
    { id: 3, url: './meme-imgs (square)/3.jpg', Keywords: ['dog', 'baby'] },
    { id: 4, url: './meme-imgs (square)/4.jpg', Keywords: [''] },
    { id: 5, url: './meme-imgs (square)/5.jpg', Keywords: [''] },
    { id: 6, url: './meme-imgs (square)/6.jpg', Keywords: [''] },
    { id: 7, url: './meme-imgs (square)/7.jpg', Keywords: [''] },

];


function creategMeme(imgId, indx = null, txt = '') {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIndx: indx,
        lines: []
    }

    return gMeme;
}


function getImges() {
    return gImges;
}

function firstUpdatOfeGmeme(imgId) {
    gMeme = creategMeme(imgId);
}

function updateGmemeTxtSize(txtResizeAction) {
    var currTextSize = gMeme.lines[gMeme.selectedLineIndx].size;
    if (txtResizeAction === 'increase') {
        gMeme.lines[gMeme.selectedLineIndx].size = currTextSize + 10;
    } else {
        gMeme.lines[gMeme.selectedLineIndx].size = currTextSize - 10;
    }

}

function getTxtSize() {
    var txtIndx = gMeme.selectedLineIndx;
    return gMeme.lines[txtIndx].size;
}

function getImgUrl() {
    if (gMeme === undefined) return;
    var imgId = gMeme.selectedImgId;
    var img = getImgById(imgId);
    return imgUrl = img.url;
}

function getImgById(imgId) {
    var imgIdx = gImges.findIndex(function(img) {
        return imgId === img.id
    })
    return gImges[imgIdx];
}

function getTxtOfSelectedLine() {
    if (gMeme.selectedLineIndx == null) {
        return null;
    }
    var txt = gMeme.lines[gMeme.selectedLineIndx].txt;
    return txt;
}


function addTxt(txt, canvasHeight) {
    var line = createNewLine(txt, canvasHeight);
    gMeme.lines.push(line);
    gMeme.selectedLineIndx = gMeme.lines.length - 1;
}

function createNewLine(txt, canvasHeight) {
    let y;
    if (gMeme.lines.length === 0) {
        y = 80;
    } else if (gMeme.lines.length === 1) {
        y = canvasHeight - 40;
    } else {
        y = canvasHeight / 2;
    }

    return {
        txt: txt,
        size: 50,
        align: 'left',
        color: 'red',
        x: 225,
        y: y,
    }
}

function updateSelectedLineIndx() {
    gMeme.selectedLineIndx = (gMeme.selectedLineIndx + 1) % gMeme.lines.length;
}

function deleteLine() {
    var lineIndx = gMeme.selectedLineIndx;
    gMeme.lines.splice(lineIndx, 1);
    gMeme.selectedLineIndx = 0;
}

function getGmeme() {
    return gMeme;
}