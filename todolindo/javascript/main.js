import { cargarProductos, addToCart, removeFromCart, deleteFromCart, displayCart, showCheckoutModal, finalizePurchase, cancelPurchase } from './script.js';

window.cargarProductos = cargarProductos;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.deleteFromCart = deleteFromCart;
window.displayCart = displayCart;
window.showCheckoutModal = showCheckoutModal;
window.finalizePurchase = finalizePurchase;
window.cancelPurchase = cancelPurchase;

document.addEventListener('DOMContentLoaded', function () {
    cargarProductos('agendas');
    cargarProductos('navidad');
    cargarProductos('jugueteria');
    cargarProductos('mate');
    cargarProductos('maquillajes');
    actualizarContadorCarrito();

    document.getElementById('checkout-button').addEventListener('click', showCheckoutModal);
});
