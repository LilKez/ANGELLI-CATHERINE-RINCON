// Cafetería "El Rincón del Sabor"

// 1 El menú, con const para que no se modifique
const Menu = { // Objeto con las bebidas y sus precios
    "Café americano": 3.500,
    "Capuchino": 4.500, 
    "Té aromático": 2.500,
    "Jugo natural": 5.000,
}

// 2 Función para obtener precio de las bebidas
function obtenerPrecio(bebida) {
    return Menu[bebida] || 0; // Retorna 0 si la bebida no está en el menú
}   

// 3 Funcion para calcular subtotal
function calcularSubtotal(precio_unidad, cantidad) { // Recibe precio por unidad y cantidad
    let subtotal = 0;  // Inicializa subtotal
    for (let i = 0; i < cantidad; i++) { // Itera por la cantidad
        subtotal += precio_unidad; // Suma el precio por la cantidad
    }
    return subtotal; // Retorna el subtotal
}

// Calcular descuentos, devuelve objeto con monto y detalle de qué descuentos aplicaron
function calcularDescuentos(subtotal, cantidad, edad) {
    let descuentos = 0; // Inicializa descuentos
    let detalles = []; // Inicializa array para detalles de descuentos

    // Descuento por cantidad (>5)
    if (cantidad > 5) { // Si la cantidad es mayor a 5
        let descuento_cantidad = subtotal * 0.10; // 10% de descuento
        descuentos += descuento_cantidad; // Suma al total de descuentos
        detalles.push("Descuento por cantidad (10%): -$${descuento_cantidad.toFixed(2)}"); // Agrega detalle        
    }
    
    // Descuento por edad (<14)
    if (edad < 14) { // Si la edad es menor a 14
        let descuento_edad = subtotal * 0.20; // 20% de descuento
        descuentos += descuento_edad; // Suma al total de descuentos
        detalles.push("Descuento por edad (20%): -$${descuento_edad.toFixed(2)}"); // Agrega detalle
    }   

    return {descuentoTotal: descuentos, detalles: detalles}; // Retorna objeto con total de descuentos y detalles
}

// 5 Función principal que procesa el pedido
function procesarPedido(bebida, cantidad, edad) { // Recibe bebida, cantidad y edad
    if (!bebida || typeof bebida !== 'string' ) { // Valida que la bebida sea una cadena no vacía
        console.log("Error: La bebida debe ser una cadena no vacía.");  // Mensaje de error
        return; // Sale de la función
    }

    if (!Number.isFinite(cantidad) || cantidad <= 0) { // Valida que la cantidad sea un número positivo
        console.log("Error: La cantidad debe ser un número mayor a 0."); // Mensaje de error
        return; // Sale de la función
    }

    if (!Number.isFinite(edad) || edad < 0) { // Valida que la edad sea un entero no negativo
        console.log("Error: La edad debe ser un número mayor o igual a 0."); // Mensaje de error
        return; // Sale de la función
    }

    // Obtener precio unitario (switch/objeto)
    const precio_unidad = obtenerPrecio(bebida); // Llama a la función para obtener el precio
    if (precio_unidad === null) { // Si la bebida no está en el menú
        console.log("Error: La bebida seleccionada no está en el menú."); // Mensaje de error
        return; // Sale de la función
    }

     // Subtotal (puedes ver aquí el uso de una función que encapsula la lógica)
    const subtotal = calcularSubtotal(precio_unidad, cantidad); // Llama a la función para calcular el subtotal

    // Calcular descuentos (se suman si aplican ambos)
    const {descuentoTotal, detalles} = calcularDescuentos(subtotal, cantidad, edad); // Llama a la función para calcular descuentos

    // Total a pagar
    const total = subtotal - descuentoTotal; // Resta descuentos al subtotal

    // Mostrar resumen del pedido (output)
    console.log("Resumen del pedido:");
    console.log("-------------------------------");
    console.log(" Cafetería 'El Rincón del Sabor'");
    console.log("-------------------------------");
    console.log("Bebida: " + bebida);
    console.log("Cantidad: " + cantidad);
    console.log("Precio unitario: $" + precio_unidad.toFixed(2)); // Muestra el precio unitario con un toFixed(2) que limita a 2 decimales
    console.log("Subtotal: $" + subtotal.toFixed(2)); // Muestra el subtotal con un toFixed(2) que limita a 2 decimales

    if (detalles.length > 0) { // Si hay detalles de descuentos
        console.log("No aplica descuentos") // Mensaje si no hay descuentos
    }   else { // Si hay descuentos
        console.log("Descuentos aplicados: "); // Muestra los detalles de los descuentos
        detalles.forEach(detalle => { // Itera por cada detalle
            console.log(" - " + detalle); // Muestra el detalle
        }); 
        console.log("Total descuentos: -$" + descuentoTotal.toFixed(2)); // Muestra el total de descuentos
    }

    console.log("-------------------------------");
    console.log("Total a pagar: $" + total.toFixed(2)); // Muestra el total a pagar
    console.log("-------------------------------");
    console.log("¡Gracias por su compra!"); // Mensaje de agradecimiento
    console.log("-------------------------------");
}

procesarPedido("Capuchino", 6, 10); // Ejemplo de uso
//procesarPedido("Té aromático", 3, 20); // Otro ejemplo de uso
//procesarPedido("Jugo natural", 2, 12); // Otro ejemplo de uso