Общее описание:

Оффлайн генератор изображений-заглушек для прототипирования сайтов.
В какой-то степени альтернатива dummyimage.com 

Использование:

Всё что нужно это написать в атрибут href(a) или в src(img) строку вида #цветHex\*ширина\*высота
На выходе будет вставлено inline base64 image.

Пример:
```html
<a href="#000*400*355"><img src="#FFFFFF*125*125" alt="emptyfoto"></a>
```

Сгенерирует черный прямоугольник со сторонами 400px и 355px. По клику будет открыт белый квадрат со стороной 125px.
```html
<a href="data:image/png;base64,iVBORw...CC"><img src="data:image/png;base64,iVBORw0K...YII=" alt=""></a>
```
Настройка:

С 1 по 10 строчку настройка. 
```javascript
var setup = {
  typeImage: 'jpeg', // png, jpeg(faster), webp(slow)
  quality: 0.9, // A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp
  img: true, // replace img for img.src
  a: true, // replace img for a.href
  colorScheme: 'bw',
  // inv - inverse text color
  // bw - black or white text color
  // gs - grayscale text color
};
```
