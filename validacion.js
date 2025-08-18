function validarDatos(datos) {

    const errores = [];
    const datosLimpios = [];

    const dniVistos = new Set();
    const legajosVistos = new Set();
    const foliosVistos = new Set();

    datos.forEach((fila, i) => {
        const filaNumero = i + 3; // Para mostrar el número de fila real
        let filaValida = true;

        // --- Validar y normalizar DNI ---
        const dniRegex = /^(\d{7,8}|\d{1,2}\.\d{3}\.\d{3})$/;
        if (!dniRegex.test(fila.dni)) {
            errores.push({ fila: filaNumero, error: "El DNI no es válido" });
            filaValida = false;
        } else {
            // Quitar los puntos
            const dniLimpio = fila.dni.toString().replace(/\./g, '');

            if(dniVistos.has(dniLimpio)) {
                errores.push({
                    fila: filaNumero,
                    error: "DNI duplicado"
                });
                filaValida = false;
            } else {
                fila.dni = dniLimpio;
                dniVistos.add(dniLimpio);
            }
        }

        // --- Validar y separar nombre completo ---
        fila.nombreCompleto = fila.nombreCompleto.trim().replace(/\s+/g, ' ');
        const nombreCompletoRegex = /^(?<apellido>[A-ZÁÉÍÓÚÑ\s]+)\s(?<nombre>[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s(?:[a-záéíóúñ]+|[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+))*)$/;
        const match = fila.nombreCompleto.match(nombreCompletoRegex);
        if (!match || !match.groups) {
            errores.push({ fila: filaNumero, error: "El nombre no es válido" });
            filaValida = false;
        } else {
            fila.apellido = match.groups.apellido.trim();
            fila.nombre = match.groups.nombre.trim();
        }

        // --- Validar legajo ---
        const numeroRegex = /^\d+$/;
        if (!numeroRegex.test(fila.legajo)) {
            errores.push({ 
                fila: filaNumero, 
                error: "El legajo no es un número válido" 
            });
            filaValida = false;
        } else if (legajosVistos.has(fila.legajo)) {
            errores.push({ fila: filaNumero, 
                error: "Legajo duplicado" 
            });
            filaValida = false;
        } else {
            legajosVistos.add(fila.legajo);
        }

        // --- Validar libro ---
        if (!numeroRegex.test(fila.libro)) {
            errores.push({ fila: filaNumero, error: "El libro no es un número válido" });
            filaValida = false;
        }

        // --- Validar folio ---
        if (!numeroRegex.test(fila.folio)) {
            errores.push({ fila: filaNumero, error: "El folio no es un número válido" });
            filaValida = false;
        } else if (foliosVistos.has(fila.folio)) {
            errores.push({ fila: filaNumero, error: "Folio duplicado" });
            filaValida = false;
        } else {
            foliosVistos.add(fila.folio);
        }

        // --- Guardar fila limpia ---
        if (filaValida) {
            datosLimpios.push({
                dni: fila.dni,
                nombre: fila.nombre,
                apellido: fila.apellido,
                legajo: Number(fila.legajo),
                libro: Number(fila.libro),
                folio: Number(fila.folio)
            });
        }
    });

    return{
        valido: errores.length === 0,
        errores,
        datos: datos.filter((_, i) => !errores.some(e => e.fila === i + 1))  //Devolver solo los datos válidos
    };
}

module.exports = validarDatos;

