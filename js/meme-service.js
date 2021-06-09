'use-strict'
var gMeme;

var gImges = [
    { id: 1, url: './meme-imgs (square)/1.jpg', Keywords: ['trump'] },
    { id: 2, url: './meme-imgs (square)/2.jpg', Keywords: ['dogs'] },
    { id: 3, url: './meme-imgs (square)/3.jpg', Keywords: ['dog', 'baby'] }

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
    var currTextSize = gMeme.lines[0].size;
    if (txtResizeAction === 'increase') {
        gMeme.lines[0].size = currTextSize + 1;
    } else {
        gMeme.lines[0].size = currTextSize - 1;
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


function addTxt(txt) {
    var line = createNewLine(txt);
    gMeme.lines.push(line);
    gMeme.selectedLineIndx = gMeme.lines.length - 1;
}

function createNewLine(txt) {
    let y = 50 + gMeme.lines.length * 70;
    return {
        txt: txt,
        size: 50,
        align: 'left',
        color: 'red',
        x: 225,
        y: y,
    }
}