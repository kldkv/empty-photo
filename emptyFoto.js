;function replaceImg() {
    var image = document.getElementsByTagName('img');
    for (var i = 0; i < image.length; i++) {
        re = new RegExp("ef\/.*");
        if (re.test(image[i].getAttribute('src')))
        {
            var rightNameImg = image[i].getAttribute('src').split('/')[1];
            rightNameImg = rightNameImg.split("*");
            var imgWeight = rightNameImg[0];
            var imgHeight = rightNameImg[1];
            var imgColor = rightNameImg[2].split('.')[0];
            image[i].src = createCanvas(imgWeight, imgHeight, imgColor);
        }
    }
    var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++){
            re = new RegExp("ef\/.*");
            if (re.test(links[i].getAttribute('href')))
            {
                var rightNameLinks = links[i].getAttribute('href').split('/')[1];
                rightNameLinks = rightNameLinks.split("*");
                var imgWeight = rightNameLinks[0];
                var imgHeight = rightNameLinks[1];
                var imgColor = rightNameLinks[2].split('.')[0];
                links[i].href = createCanvas(imgWeight, imgHeight, imgColor);
            }
        }
}
// init fn generate canvas
function createCanvas(imgWidth, imgHeight, imgColor) {
    var canvas = document.createElement('canvas');
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    genCanvas = canvas.getContext('2d');
    genCanvas.fillStyle = imgColor;
    genCanvas.fillRect(0, 0, imgWidth, imgHeight);
    genCanvas.font = (imgWidth / 10 + imgHeight / 10) + "px sans-serif";
    genCanvas.fillStyle = "#fff";
    genCanvas.textAlign = "center";
    genCanvas.fillText(imgWidth+ 'x' + imgHeight, canvas.width/2, canvas.height/2);
    var baseURL = canvas.toDataURL("image/png");
    return baseURL;
}
replaceImg();