document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const producto = document.getElementById('producto').value;
        const cantidad = document.getElementById('cantidad').value;
        const mensaje = document.getElementById('mensaje').value;

        if (nombre && telefono && email && producto && cantidad) {
            console.log('Formulario completo');
            form.submit();
        } else {
            console.log('Por favor, completa todos los campos');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const producto = document.getElementById('producto').value;
        const cantidad = document.getElementById('cantidad').value;
        const mensaje = document.getElementById('mensaje').value;

        if (nombre && telefono && email && producto && cantidad) {
            console.log('Formulario completo');
            form.submit();
        } else {
            console.log('Por favor, completa todos los campos');
        }
    });
});
