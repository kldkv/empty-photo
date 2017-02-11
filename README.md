Общее описание:

Оффлайн генератор изображений-заглушек для прототипирования сайтов.
В какой-то степени альтернатива dummyimage.com 

Использование:

Всё что нужно это написать в атрибут href(a) или в src(img) строку вида ширина\*высота\*#цветHex
На выходе будет вставлено inline base64 image.

Пример:
```html
<a href="500*500*#FFFFFF"><img src="125*225*#000" alt=""></a>
```

Сгенерирует черный прямоугольник со сторонами 125px и 225px. По клику будет открыт белый квадрат со стороной 500px.
```html
<a href="data:image/png;base64,iVBORw...CC"><img src="data:image/png;base64,iVBORw0K...YII=" alt=""></a>
```
Настройка:

С 1 по 8 строчку настройка. 
```javascript
var setup = {
    img: true, // replace img for img.src
    a: true, // replace img for a.href
    colorScheme: 'bw'
    // inv - inverse text color
    // bw - black or white text color
    // gs - grayscale text color
};
```
