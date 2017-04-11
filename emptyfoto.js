'use strict';

var setup = {
  typeImage: 'jpeg', // png, jpeg(faster), webp(slow)
  quality: 0.9, // A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp
  img: true, // replace img for src.img
  a: true, // replace img for a.href
  altTitle: true,
  fontSizeResolution: 5,
  fontSizeType: 'px', // em, px, rem, etc.
  fontFamily: 'Source Code Pro',
  colorScheme: 'bw'
  // inv - inverse text color
  // bw - black or white text color
  // gs - grayscale text color
};

function getWidth(source, type) {
  if (source.getAttribute('width') >= 1) {
    return source.getAttribute('width');
  }
  if (source.getAttribute(type).split('*')[1] >= 1) {
    return source.getAttribute(type).split('*')[1];
  }
}

function getHeight(source, type) {
  if (source.getAttribute('height') >= 1) {
    return source.getAttribute('height');
  }
  if (source.getAttribute(type).split('*')[2] >= 1) {
    return source.getAttribute(type).split('*')[2];
  }
}

function getColor(source, type) {
  return source.getAttribute(type).split('*')[0].slice(1);
}

function getAllLinks(type) {
  return document.getElementsByTagName(type);
}

function replaceImg() {

  var currentLink;
  for (var i = getAllLinks('img').length - 1; i >= 0; i--) {
    if ((currentLink = getAllLinks('img')[i]).getAttribute('src').charAt(0) == '#') {
      currentLink.src = createCanvas(getColor(currentLink, 'src'), getWidth(currentLink, 'src'), getHeight(currentLink, 'src'), getAlt(currentLink));
    }
  }
}

function replaceA() {
  var currentLink;
  for (var i = getAllLinks('a').length - 1; i >= 0; i--) {
    if ((currentLink = getAllLinks('a')[i]).getAttribute('href').charAt(0) == '#') {
      currentLink.href = createCanvas(getColor(currentLink, 'href'), getWidth(currentLink, 'href'), getHeight(currentLink, 'href'), getAlt(currentLink));
    }
  }
}

function getAlt(source) {
  if (typeof source.getAttribute('alt') == 'object') {
    return '';
  } else {
    return source.getAttribute('alt');
  }
}

// Create a typed color 6 characters
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

// If you use a short record of color, expanding it
function doubleHex(parseColor) {
  var doubleHex = [];
  for (var i = parseColor.length - 1; i >= 0; i--) {
    doubleHex[i] = +parseColor[i] + parseColor[i];
  }
  return doubleHex.join('');
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

function grayScaleHex(originColor) {
  var parseOriginHex = createStringColor(originColor).match(/.{2}/g); //split 2 simbol
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

function invertHex(originColor) {
  var parseOriginHex = createStringColor(originColor).split('');
  var transformHex = [];
  for (var i = 5; i >= 0; i--) {
    transformHex[i] = (0xF - parseInt(parseOriginHex[i], 16)).toString(16);
  }
  return transformHex.join('').toUpperCase();
}

function methodColor(imgColor) {
  switch (setup.colorScheme) {
    case 'inv':
      return invertHex(imgColor);
      break;
    case 'bw':
      return blackWhite(imgColor);
      break;
    case 'gs':
      return grayScaleHex(imgColor);
  }
}

function createCanvas(imgColor, imgWidth, imgHeight, imgAlt) {
  var canvas = document.createElement('canvas');
  canvas.width = imgWidth;
  canvas.height = imgHeight;
  var canvasProp = canvas.getContext('2d');
  canvasProp.fillStyle = '#' + imgColor;
  canvasProp.fillRect(0, 0, imgWidth, imgHeight);
  canvasProp.fillStyle = '#' + methodColor(imgColor);
  canvasProp.textAlign = "center";
  canvasProp.textBaseline = "middle";
  canvasProp.font = Math.min(imgHeight, imgWidth) / 10 + setup.fontSizeType + ' ' + setup.fontFamily + " sans-serif";
  canvasProp.fillText(imgWidth + 'x' + imgHeight, canvas.width / 2, canvas.height / 3);
  canvasProp.fillText(imgAlt, canvas.width / 2, canvas.height / 1.5);
  return canvas.toDataURL('image/' + setup.typeImage, setup.quality);
}

function emptyFoto() {
  if (setup.img == true) {
    replaceImg();
  }
  if (setup.a == true) {
    replaceA();
  }
}
emptyFoto();
