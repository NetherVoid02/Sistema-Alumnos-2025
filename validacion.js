function separarNombreCompleto(texto) {
    const regex = /^(?<apellido>[A-ZÁÉÍÓÚÑ\s]+)\s(?<nombre>[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)$/;
    const match = texto.trim().match(regex);

    if (match && match.groups) {
        return {
            apellido: match.groups.apellido.trim(),
            nombre: match.groups.nombre.trim()
        };
    } else {
        return {
            error: "Formato inválido. Asegurate de que los apellidos estén en MAYÚSCULAS y los nombres Capitalizados."
        };
    }
}

function validarDNI(dni) {
    const dniRegex = /^(\d{7,8}|\d{1,2}\.\d{3}\.\d{3})$/;
    if (!dniRegex.test(dni)) {
        return { error: "El DNI no es válido" };
    }
    return dni.replace(/\./g, '');
}

function validarLegajo(legajo) {
    const legajoRegex = /^\d+$/;
    if (!legajoRegex.test(legajo)) {
        return {
            error: "El legajo no es válido, contiene letras, símbolos o está vacío"
        };
    }
    return legajo;
}

function validarDatosExcel(datos) {
    const columnasEsperadas = ["D.N.I.", "Apellido y Nombres", "leg."];

    const encabezados = datos[0];         // Fila con encabezados
    const filas = datos.slice(2);         // Saltea fila 1 y 2

    const obtenidas = Object.keys(encabezados);  // Obtené los nombres de las columnas

    const columnasDeseadas = ['D.N.I.', 'Apellido y Nombres', 'leg.'];

    // Mostramos solo los encabezados deseados
    const encabezadosFiltrados = {};
    for (const columna of columnasDeseadas) {
    encabezadosFiltrados[columna] = encabezados[columna];
    }
    console.log('Encabezados:', encabezadosFiltrados);

    const filasFiltradas = filas.map(fila => {
    const nuevaFila = {};
    for (const columna of columnasDeseadas) {
        nuevaFila[columna] = fila[columna];
    }
    return nuevaFila;
    });

    console.log('Filas:', filasFiltradas);


    console.log("Encabezados:", encabezados);
    console.log("Tipo de encabezados:", typeof encabezados);

    // Verifica columnas faltantes y extra
    const faltantes = columnasEsperadas.filter(col => !obtenidas.includes(col));
    const extras = obtenidas.filter(col => !columnasEsperadas.includes(col));

    if (faltantes.length > 0) {
        return {
            valido: false,
            tipo: "columnas",
            faltantes,
            extras
        };
    }

    const errores = [];
    const datosLimpios = [];

    filas.forEach((fila, i) => {
        const nrofila = i + 3; // porque se saltean dos filas

        const dni = fila["D.N.I."]?.toString().trim() ?? "";
        const nombreCompleto = fila["Apellido y Nombres"]?.toString().trim() ?? "";
        const legajo = fila["leg."]?.toString().trim() ?? "";

        const filaErrores = [];

        // Validación de DNI
        const dniValidado = validarDNI(dni);
        if (typeof dniValidado === "object" && dniValidado.error) {
            filaErrores.push(dniValidado.error);
        }

        // Validación de nombre y apellido
        const nombreValidado = separarNombreCompleto(nombreCompleto);
        if (nombreValidado.error) {
            filaErrores.push(nombreValidado.error);
        }

        // Validación de legajo
        const legajoValidado = validarLegajo(legajo);
        if (typeof legajoValidado === "object" && legajoValidado.error) {
            filaErrores.push(legajoValidado.error);
        }

        if (filaErrores.length > 0) {
            errores.push({ fila: nrofila, errores: filaErrores });
        } else {
            datosLimpios.push({
                dni: Number(dniValidado),
                apellido: nombreValidado.apellido,
                nombre: nombreValidado.nombre,
                legajo: Number(legajoValidado)
            });
        }
    });

    if (errores.length > 0) {
        return {
            valido: false,
            tipo: "filas",
            errores
        };
    }

    return {
        valido: true,
        datos: datosLimpios
    };
}

module.exports = validarDatosExcel;
