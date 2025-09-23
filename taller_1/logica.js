// Cafetería "El Rincón del Sabor"

// 1 El menú, con const para que no se modifique
const Menu = { // Objeto con las bebidas y sus precios
    "Café americano": 3500, // Precios en pesos colombianos
    "Capuchino": 4500, 
    "Té aromático": 2500,
    "Jugo natural": 5000,
}

// 2 Función para obtener precio de las bebidas
function obtenerPrecio(bebida) { // Retorna el precio de la bebida o 0 si no existe
    return Menu[bebida] || 0; // Retorna 0 si la bebida no está en el menú
}   

// 3 Funcion para calcular subtotal
function calcularSubtotal(precio_unidad, cantidad) { // Retorna subtotal sin descuentos
    let subtotal = 0; // Inicializa subtotal
    for (let i = 0; i < cantidad; i++) {// Suma el precio por la cantidad
        subtotal += precio_unidad;// Suma el precio por la cantidad
    }
    return subtotal;// Retorna subtotal
}

// 4 Calcular descuentos, devuelve objeto con monto y detalle de qué descuentos aplicaron
function calcularDescuentos(subtotal, cantidad, edad) {// Retorna objeto con total de descuentos y detalles
    let descuentos = 0;// Inicializa total de descuentos
    let detalles = [];// Inicializa los detalles de descuentos aplicados

    // Descuento por cantidad (>5)
    if (cantidad > 5) {// Si la cantidad es mayor a 5
        let descuento_cantidad = subtotal * 0.10;// 10% de descuento
        descuentos += descuento_cantidad; 
        detalles.push(`Descuento por cantidad (10%): -$${descuento_cantidad.toFixed(2)}`);        
    }
    
    // Descuento por edad (<14)
    if (edad < 14) {// Si la edad es menor a 14
        let descuento_edad = subtotal * 0.20;// recibe 20% de descuento
        descuentos += descuento_edad; // Suma al total de descuentos 
        detalles.push(`Descuento por edad (20%): -$${descuento_edad.toFixed(2)}`);// Agrega detalles del descuento con un formato de dos decimales
    }   

    return {descuentoTotal: descuentos, detalles: detalles};// Retorna objeto con total de descuentos y detalles
}

// 5 Función principal que procesa el pedido
function procesarPedido(bebida, cantidad, edad) {// Procesa el pedido y muestra el resumen
    // Validaciones de entrada
    if (!bebida || typeof bebida !== 'string' ) { // Verifica que bebida sea una cadena no vacía
        console.log("Error: La bebida debe ser una cadena no vacía."); // Muestra mensaje de error
        return;// Sale de la función
    }

    if (!Number.isFinite(cantidad) || cantidad <= 0) {// Verifica que cantidad sea un número mayor a 0
        console.log("Error: La cantidad debe ser un número mayor a 0.");// Muestra mensaje de error
        return;// Sale de la función
    }

    if (!Number.isFinite(edad) || edad < 0) {// Verifica que edad sea un número mayor o igual a 0
        console.log("Error: La edad debe ser un número mayor o igual a 0.");// Muestra mensaje de error
        return;// Sale de la función
    }

    const precio_unidad = obtenerPrecio(bebida);// Obtiene el precio de la bebida
    if (precio_unidad === null || precio_unidad === 0) {// Verifica que la bebida exista en el menú
        console.log("Error: La bebida seleccionada no está en el menú.");// Muestra mensaje de error
        return; 
    }

    const subtotal = calcularSubtotal(precio_unidad, cantidad);// Calcula subtotal
    // Calcula descuentos
    const {descuentoTotal, detalles} = calcularDescuentos(subtotal, cantidad, edad); // Desestructura el objeto retornado
    // Calcula total a pagar
    const total = subtotal - descuentoTotal; // Total después de descuentos 

    // Mostrar resumen
    console.log("-------------------------------");
    console.log("Resumen del pedido:");
    console.log("-------------------------------");
    console.log(" Cafetería 'El Rincón del Sabor'");
    console.log("-------------------------------");
    console.log("Bebida: " + bebida);
    console.log("Cantidad: " + cantidad);
    console.log("Precio unitario: $" + precio_unidad.toFixed(2)); 
    console.log("Subtotal: $" + subtotal.toFixed(2)); 

    if (detalles.length === 0) { // Si no hay descuentos
        console.log("No aplica descuentos");// Indica que no hay descuentos
    } else { // Si hay descuentos
        console.log("Descuentos aplicados: "); // Muestra detalles de descuentos
        detalles.forEach(detalle => { // Itera sobre cada detalle
            console.log(" - " + detalle);// Muestra cada detalle
        }); 
        console.log("Total descuentos: -$" + descuentoTotal.toFixed(2));// Muestra total de descuentos
    }

    console.log("-------------------------------");
    console.log("Total a pagar: $" + total.toFixed(2)); 
    console.log("-------------------------------");
    console.log("¡Gracias por su compra!"); 
    console.log("-------------------------------");
}

// Ejemplos de uso
procesarPedido("Capuchino", 6, 10); 
// procesarPedido("Té aromático", 3, 20); 
// procesarPedido("Jugo natural", 2, 12); 
