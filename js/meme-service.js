'use-strict'
var gMeme;
var gFilteredImeges = null;
var gMostFrequentSearchWords = new Map();

var gImges = [
    { id: 1, url: './meme-imgs (square)/1.jpg', keywords: ['trump'] },
    { id: 2, url: './meme-imgs (square)/2.jpg', keywords: ['dogs'] },
    { id: 3, url: './meme-imgs (square)/3.jpg', keywords: ['dog', 'baby'] },
    { id: 4, url: './meme-imgs (square)/4.jpg', keywords: ['cat'] },
    { id: 5, url: './meme-imgs (square)/5.jpg', keywords: ['kid', 'baby'] },
    { id: 6, url: './meme-imgs (square)/6.jpg', keywords: ['smile'] },
    { id: 7, url: './meme-imgs (square)/7.jpg', keywords: [''] },
    { id: 8, url: './meme-imgs (square)/8.jpg', keywords: ['smile'] },
    { id: 9, url: './meme-imgs (square)/9.jpg', keywords: ['smile', 'kid'] },
    { id: 10, url: './meme-imgs (square)/10.jpg', keywords: ['smile'] },
    { id: 11, url: './meme-imgs (square)/11.jpg', keywords: ['kiss'] },
    { id: 12, url: './meme-imgs (square)/12.jpg', keywords: [''] },
    { id: 13, url: './meme-imgs (square)/13.jpg', keywords: ['smile'] },
    { id: 14, url: './meme-imgs (square)/14.jpg', keywords: [''] },
    { id: 14, url: './meme-imgs (square)/15.jpg', keywords: [''] },
    { id: 15, url: './meme-imgs (square)/15.jpg', keywords: [''] },
    { id: 16, url: './meme-imgs (square)/16.jpg', keywords: [''] },
    { id: 17, url: './meme-imgs (square)/17.jpg', keywords: [''] },
    { id: 18, url: './meme-imgs (square)/18.jpg', keywords: [''] },
];

gMemeFonts = [
    'impact',
    'Arial',
    'Verdana',
    'Helvetica',
    'Georgia',
    'Courier New',
    'Brush Script MT'
];


function creategMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIndx: null,
        lines: []
    }

    return gMeme;
}


function getImges() {
    return gImges;
}

function getFilterdImages() {
    return gFilteredImeges != null ? gFilteredImeges : gImges;
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


function addTxt(txt, canvasHeight, canvasWidth) {
    var line = createNewLine(txt, canvasHeight, canvasWidth);
    gMeme.lines.push(line);
    gMeme.selectedLineIndx = gMeme.lines.length - 1;
}

function getAvailableFonts() {
    return gMemeFonts;
}

function createNewLine(txt, canvasHeight, canvasWidth) {
    let y;
    if (gMeme.lines.length === 0) {
        y = 80;
    } else if (gMeme.lines.length === 1) {
        y = canvasHeight - 40;
    } else {
        y = canvasHeight / 2;
    }
    return {
        txtFont: 'impact',
        txt: txt,
        size: 40,
        selectedFontIndex: null,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        x: (canvasWidth / 2) - (350.9765625 / 2),
        y: y,
    }
}

function getFontByIndex(indx) {
    if (indx == null) {
        return gMemeFonts[0];
    }
    return gMemeFonts[indx];
}

function getFontsInputEl() {
    return document.querySelector('.fonts-input');
}

function getSelectedLine() {
    return gMeme.selectedLineIndx != null ? gMeme.lines[gMeme.selectedLineIndx] : null;
}

function updateSelectedLineIndx() {
    gMeme.selectedLineIndx = (gMeme.selectedLineIndx + 1) % gMeme.lines.length;
}

function deleteLine(canvasHeight) {
    var lineIndx = gMeme.selectedLineIndx;
    gMeme.lines.splice(lineIndx, 1);
    gMeme.selectedLineIndx = 0;
    // for (let i = 0; i < gMeme.lines.length; i++) {
    //     const curLine = gMeme.lines[i];
    //     if (i === 0) {
    //         curLine.y = 80;
    //     } else if (i === 1) {
    //         curLine.y = canvasHeight - 40;
    //     } else {
    //         curLine.y = canvasHeight / 2;
    //     }
    // }
}

function getGmeme() {
    return gMeme;
}

function updateGmemeTxtColor(color) {
    if (gMeme.selectedLineIndx === null) return;
    gMeme.lines[gMeme.selectedLineIndx].color = color;
}

function updateGmemeStrokeColor(color) {
    if (gMeme.selectedLineIndx === null) return;
    gMeme.lines[gMeme.selectedLineIndx].strokeColor = color;
};


function updateGmemeTxtWhileWriting(chars) {
    gMeme.lines[gMeme.selectedLineIndx].txt = chars;
}

function downloadCanvas(elDownloadBtn, gElCanvas) {
    const data = gElCanvas.toDataURL()
    elDownloadBtn.href = data
    elDownloadBtn.download = 'meme'
}

function filterSearchResults(searchValue) {
    if (searchValue === '') {
        gFilteredImeges = gImges;
        return;
    }
    gFilteredImeges = gImges.filter(img => {
        const indexOfKeyword = img.keywords.findIndex(keyword => keyword.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
        return indexOfKeyword > -1;
    });
}

function filterSearchResultByFullWord(searchValue) {
    let searchWord;
    var imgesOfsearchWord = gImges.filter(img => {
        return img.keywords.includes(searchValue.toLowerCase());
    })

    if (imgesOfsearchWord.length > 0) {
        searchWord = searchValue;
    }
    if (searchWord === undefined) return;
    if (searchWord === '') return;

    if (gMostFrequentSearchWords.has(searchWord)) {
        var value = gMostFrequentSearchWords.get(searchWord);
        gMostFrequentSearchWords.set(searchWord, value + 1)

    } else {
        gMostFrequentSearchWords.set(searchWord, 1);
    }
}

function getMostFrequentSearchWordsMpa() {
    return gMostFrequentSearchWords;
}