
var menu = document.querySelector('.active')
var hidden = document.querySelector('.flex__left')
var hidden2 = document.querySelector('.flex__middle')
menu.style.display = 'none';
window.addEventListener('scroll', function () {

    // Если прокрутка больше 100px, показываем блок 2, иначе - блок 1
    if (window.scrollY > 100) {
        hidden.style.display = 'none';
        hidden2.style.display = 'none';
        menu.style.display = 'block';
    } else {
        hidden.style.display = 'block';
        menu.style.display = 'none';
        hidden2.style.display = 'block';
    }
}
)

