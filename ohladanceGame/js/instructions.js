// settings.js

function printDiv() {
    var divContents = document.getElementById("credits").innerHTML;
    var a = window.open('', '', 'height=500, width=500');
    a.document.write('<html>');
    a.document.write('<body > <h1>Div contents are <br>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
}
function returnToMainPage() {
    // Здесь вы можете добавить код для возврата на главную страницу
    window.location.href = "index.html";
}
