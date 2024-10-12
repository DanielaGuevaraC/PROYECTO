$(document).ready(function() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Mostrar productos en el carrito
    function displayCartItems() {
        const itemsList = $('#cart-items-list');
        const totalPriceElement = $('#total-price');
        itemsList.empty(); // Limpiar la lista actual
        let total = 0;

        cartItems.forEach((item, index) => {
            const li = $('<li></li>').text(`${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`);
            
            // Entrada para modificar la cantidad
            const quantityInput = $('<input type="number" min="1" value="' + item.quantity + '">').on('change', function() {
                const newQuantity = parseInt($(this).val());
                updateQuantity(index, newQuantity);
            });

            const removeButton = $('<button>Eliminar</button>').on('click', function() {
                showConfirmDeleteMessage(item.name, index); // Muestra el mensaje de confirmación
            });
            
            li.append(quantityInput).append(removeButton);
            itemsList.append(li);
            total += parseFloat(item.price) * item.quantity;
        });

        totalPriceElement.text(`$${total.toFixed(2)}`);
    }

    // Función para mostrar mensajes temporales
    function showTemporaryMessage(message) {
        const messageBox = $('<div class="message-box"></div>').text(message);
        $('body').append(messageBox);
        
        // Estilo para el mensaje
        messageBox.css({
            position: 'fixed',
            top: '10px',
            right: '10px',
            padding: '10px',
            backgroundColor: '#f5f5dc', // Color beige
            color: 'black',
            zIndex: 1000,
            borderRadius: '5px',
        });

        // Ocultar el mensaje después de 3 segundos
        setTimeout(function() {
            messageBox.fadeOut(500, function() {
                $(this).remove();
            });
        }, 3000);
    }

    // Función para mostrar mensaje de confirmación al eliminar un producto
    function showConfirmDeleteMessage(productName, index) {
        const confirmBox = $('<div class="confirm-box"></div>');
        confirmBox.html(`¿Estás seguro de que deseas eliminar el producto "${productName}"? <br> 
                         <button id="confirm-delete">Aceptar</button> 
                         <button id="cancel-delete">Cancelar</button>`);
        $('body').append(confirmBox);

        // Estilo para el mensaje de confirmación
        confirmBox.css({
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            backgroundColor: '#f5f5dc', // Color beige
            color: 'black',
            zIndex: 1000,
            borderRadius: '5px',
            textAlign: 'center',
        });

        $('#confirm-delete').on('click', function() {
            removeFromCart(index); // Elimina el producto
            confirmBox.fadeOut(500, function() {
                $(this).remove();
            });
        });

        // Agregar evento para el botón de cancelar
        $('#cancel-delete').on('click', function() {
            confirmBox.fadeOut(500, function() {
                $(this).remove(); // Eliminar el cuadro de confirmación
            });
        });
    }

    // Función para actualizar la cantidad de un producto
    function updateQuantity(index, newQuantity) {
        if (newQuantity > 0) {
            cartItems[index].quantity = newQuantity; 
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
            displayCartItems(); 
            showTemporaryMessage('Cantidad actualizada.'); 
        } else {
            alert('La cantidad debe ser al menos 1.');
            displayCartItems(); 
        }
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(index) {
        const productName = cartItems[index].name; 
        cartItems.splice(index, 1); 
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
        displayCartItems();
        showTemporaryMessage(`El producto "${productName}" ha sido eliminado del carrito.`); 
    }

    // Cargar productos
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }

    // Agregar al carrito 
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
            showTemporaryMessage(`El producto "${productName}" (Cantidad: ${itemQuantity}) ha sido agregado al carrito.`); // Muestra el mensaje
        } else {
            alert('Por favor, ingresa una cantidad válida.');
        }
    }

    // Finalizar compra
    $('#checkout-button').on('click', function() {
        if (cartItems.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
            return;
        }
        // Aquí podrías agregar la lógica para procesar el pago
        if (confirm('¿Estás seguro de que deseas finalizar la compra?')) {
            alert('Gracias por tu compra. Procesando pago...');
            localStorage.removeItem('cartItems'); 
            cartItems = []; 
            displayCartItems(); 
        }
    });

    // Cancelar compra
    $('#cancel-button').on('click', function() {
        if (confirm('¿Estás seguro de que deseas cancelar la compra?')) {
            localStorage.removeItem('cartItems'); 
            cartItems = [];
            alert('La compra ha sido cancelada');
            displayCartItems(); 
        }
    });

    // contacto
    $('#contact-form').on('submit', function(event) {
        event.preventDefault();
        alert('Gracias por tu mensaje. Te responderemos pronto.');
    });
});
