var setup = {
    img: true, // replace img for src.img
    a: true, // replace img for a.href
    colorScheme: 'bw'
    // inv - inverse text color
    // bw - black or white text color
    // gs - grayscale text color
};

function replaceImg() {
    var source = document.getElementsByTagName('img');
    var regExpFilterSrc = new RegExp(/\d+\*\d+\*#([A-Fa-f0-9]+)+.*/);
    for (var i = source.length - 1; i >= 0; i--) {
        if (regExpFilterSrc.test(source[i].getAttribute('src'))) {
            var rightNameSource = source[i].getAttribute('src').split('*');
            var imgWight = rightNameSource[0];
            var imgHeight = rightNameSource[1];
            var imgColor = (rightNameSource[2].split('.')[0]).split('#')[1];
            source[i].src = createCanvas(imgWight, imgHeight, imgColor);
        }
    }
}

function replaceA() {
    var source = document.getElementsByTagName('a');
    var regExpFilterSrc = new RegExp(/\d+\*\d+\*#([A-Fa-f0-9]+)+.*/);
    for (var i = source.length - 1; i >= 0; i--) {
        if (regExpFilterSrc.test(source[i].getAttribute('href'))) {
            var rightNameSource = source[i].getAttribute('href').split('*');
            var imgWight = rightNameSource[0];
            var imgHeight = rightNameSource[1];
            var imgColor = (rightNameSource[2].split('.')[0]).split('#')[1];
            source[i].href = createCanvas(imgWight, imgHeight, imgColor);
        }
    }
}

function createCanvas(imgWidth, imgHeight, imgColor) {
    var canvas = document.createElement('canvas');
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    var canvasProp = canvas.getContext('2d');
    canvasProp.fillStyle = '#' + imgColor;
    canvasProp.fillRect(0, 0, imgWidth, imgHeight);
    canvasProp.font = Math.min(imgHeight, imgWidth) / 4 + "px sans-serif";
    canvasProp.fillStyle = '#' + methodColor(imgColor);
    canvasProp.textAlign = "center";
    canvasProp.textBaseline = "middle";
    canvasProp.fillText(imgWidth + 'x' + imgHeight, canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL("image/png");
}

function doubleHex(parseColor) {
    var doubleHex = [];
    for (var i = parseColor.length - 1; i >= 0; i--) {
        doubleHex[i] = parseColor[i] + parseColor[i];
    }

  return doubleHex.join('');
}

function createStringColor(stringColor) {
    var parseOriginHex;
    if (stringColor.length == 6) {
        parseOriginHex = stringColor;
    }
    if (stringColor.length == 3) {
        parseOriginHex = doubleHex(stringColor);
    }
    return parseOriginHex.toUpperCase();
}

function invertHex(originColor) {
    var parseOriginHex = createStringColor(originColor).split('');
    var transformHex = [];
    for (var i = 5; i >= 0; i--) {
        transformHex[i] = (0xF - parseInt(parseOriginHex[i], 16)).toString(16);
    }
    return transformHex.join('').toUpperCase();
}

function grayScaleHex(originColor) {
    var parseOriginHex = splitToRGB(createStringColor(originColor));
    var transformHex = [];
    for (var i = parseOriginHex.length - 1; i >= 0; i--) {
        transformHex[i] = (parseOriginHex[i]).toString(16);
    }
    var sum = 0;
    for (var i = transformHex.length - 1; i >= 0; i--) {
        sum = sum + parseInt(transformHex[i], 16);
    }
    sum = ((sum / 3) >> 0).toString(16);
    var rightColor = [];
    for (var i = 3 - 1; i >= 0; i--) {
        rightColor[i] = sum;
    }

    return invertHex(rightColor.join('').toUpperCase());
}

function splitToRGB(stringColor) {
    return stringColor.split(/(?=(?:.{2})+(?!.))/);
}

function blackWhite(originColor) {
    var test = parseInt(grayScaleHex(originColor), 16);
    var pointGray = 0x777777;
    switch (test >= pointGray) {
        case false:
            return '000000';
            break;
        case true:
            return 'FFFFFF';
            break;
        default:
            return 'FFFFFF';
    }
}

function methodColor(imgColor) {
    switch (setup.colorScheme){
        case 'inv' : return invertHex(imgColor);
        case 'bw' : return blackWhite(imgColor);
        case 'gs' : return grayScaleHex(imgColor);
    }
}

function emptyFoto() {
    if (setup.img == true) {
        replaceImg();
    }
    if (setup.a == true) {
        replaceA();
    }}
emptyFoto();
