$(document).ready(function() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Mostrar los productos en el carrito
    function displayCartItems() {
        const itemsList = $('#cart-items-list');
        const totalPriceElement = $('#total-price');
        itemsList.empty(); // Limpiar la lista actual
        let total = 0;

        cartItems.forEach(item => {
            const li = $('<li></li>').text(`${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`);
            itemsList.append(li);
            total += parseFloat(item.price) * item.quantity;
        });

        totalPriceElement.text(`$${total.toFixed(2)}`);
    }

    // Cargar productos
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }

    // agregar al carrito 
    window.addToCart = function(productName, productPrice, quantityId) {
        const itemQuantity = parseInt($(`#${quantityId}`).val());
        if (itemQuantity > 0) {
            const item = {
                name: productName,
                quantity: itemQuantity,
                price: productPrice
            };
            cartItems.push(item);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert(`El producto "${productName}" (Cantidad: ${itemQuantity}) ha sido agregado al carrito.`);
        } else {
            alert('Por favor, ingresa una cantidad válida.');
        }
    }

    // contacto
    $('#contact-form').on('submit', function(event) {
        event.preventDefault();
        alert('Gracias por tu mensaje. Te responderemos pronto.');
    });
});

