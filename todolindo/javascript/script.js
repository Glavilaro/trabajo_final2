import { productos } from './productos.js';

document.addEventListener('DOMContentLoaded', function () {
    cargarProductos('agendas');
    cargarProductos('navidad');
    cargarProductos('jugueteria');
    cargarProductos('mate');
    cargarProductos('maquillajes');
    actualizarContadorCarrito();
});

export function cargarProductos(category) {
    const productosContainer = document.getElementById('productos-container');
    const productosCategoria = productos[category] || [];
    productosContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar productos

    productosCategoria.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'grid-item tarjeta';

        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        img.onerror = function () {
            img.src = 'imagenes/default.jpg'; // Ruta a una imagen predeterminada
            console.error(`No se pudo cargar la imagen: ${producto.imagen}`);
        };

        productoCard.innerHTML = `
            <p>${producto.descripcion} | Stock disponible | Precio: ${producto.precio} pesos</p>
            <button class="add-to-cart btn btn-success" data-product="${producto.nombre}" data-price="${producto.precio}">Agregar al carrito</button>
        `;

        productoCard.insertBefore(img, productoCard.firstChild); // Insertar la imagen al principio
        productosContainer.appendChild(productoCard);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const price = parseInt(button.getAttribute('data-price'), 10);
            if (product && price) {
                addToCart(product, price);
            } else {
                console.error('Producto o precio no válido:', product, price);
            }
        });
    });
}

export function addToCart(product, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.product === product);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ product, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    actualizarContadorCarrito();
}

export function removeFromCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(i => i.product === product);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    actualizarContadorCarrito();
}

export function deleteFromCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.product !== product);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    actualizarContadorCarrito();
}

export function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.product} - ${item.price} x ${item.quantity} unidades 
            <button class="increase-quantity btn btn-sm btn-secondary" data-product="${item.product}">+</button>
            <button class="decrease-quantity btn btn-sm btn-secondary" data-product="${item.product}">-</button>
            <button class="delete-item btn btn-sm btn-danger" data-product="${item.product}">Eliminar</button>
        `;
        cartItems.appendChild(li);
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotal.textContent = total;

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            addToCart(product, parseInt(button.getAttribute('data-price'), 10));
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            removeFromCart(product);
        });
    });

    document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            deleteFromCart(product);
        });
    });
}

export function actualizarContadorCarrito() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

export function showCheckoutModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');

    checkoutItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.product} - ${item.price} x ${item.quantity} unidades`;
        checkoutItems.appendChild(li);
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    checkoutTotal.textContent = total;

    $('#checkoutModal').modal('show');
}

export function finalizePurchase() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productsField = document.getElementById('productsField');
    const totalField = document.getElementById('totalField');

    let productDetails = cart.map(item => `${item.product} - ${item.price} x ${item.quantity}`).join(', ');
    let totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    productsField.value = productDetails;
    totalField.value = totalAmount;

    document.getElementById('checkoutForm').submit();

    alert('Compra finalizada con éxito!');
    localStorage.removeItem('cart');
    $('#checkoutModal').modal('hide');
    displayCart();
    actualizarContadorCarrito();
}

export function cancelPurchase() {
    alert('Compra cancelada!');
    localStorage.removeItem('cart');
    displayCart();
    actualizarContadorCarrito();
}
