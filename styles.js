function addToFavorites(productName) {
    alert(`El producto "${productName}" ha sido agregado a tus favoritos.`);
}

function addToCart(productName) {
    alert(`El producto "${productName}" ha sido agregado al carrito.`);
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío del formulario para demostración
    alert('Gracias por tu mensaje. Te responderemos pronto.');
});

$(document).ready(function() {
    $('#womenProducts').DataTable({
        "searching": true, // Activa la búsqueda
        "paging": true, // Activa la paginación
        "info": false // Desactiva la información de la tabla
    });
    
    $('#menProducts').DataTable({
        "searching": true,
        "paging": true,
        "info": false
    });
});

