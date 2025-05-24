![header](https://github.com/senior-kapitoshka/Simple-QR-Code-Generator-Web-App/blob/main/qr1.jpg)
Проект QR-code generator, пользовательским интерфейсом для которого служит веб-страница.
Проект был вдохновлен [codewars kata](https://www.codewars.com/kata/5fa50a5def5ecf0014debd73),
создает QR код 1 версии из фразы длиной не более 7 символов на латинице, чисел или знаков препинания.
Позволяет скачать сгенерированное SVG-изображение QR кода и сохранить в буфер обмена 
ASCII-изображение в виде строки.

Проект представлен в двух экземплярах: в папке qr_code_js находится проект, создающий
QR код посредством скрипта, написанного на языке Javascript, в папке qr_code_webassembly -
расположен похожий проект, но для генерации QR кода используется модуль WebAssembly,
скомпилированный из исполняемого .c-файла компилятором emcc, который предоставляется 
вместе с набором инструментов EMSDK.

![code](https://github.com/senior-kapitoshka/Simple-QR-Code-Generator-Web-App/blob/main/qr2.jpg)

## Демо

Тестировать можно [здесь](https://senior-kapitoshka.github.io/Simple-QR-Code-Generator-Web-App/).

