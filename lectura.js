const XLSX = require("xlsx");

function leerExcel(rutaArchivo, filaInicio, filaFin) {
    try {
        //Leer el archivo Excel
        const libro = XLSX.readFile(rutaArchivo);
        //Leer la primera hoja
        const hoja = libro.Sheets[libro.SheetNames[0]];

        //Validar lectura de la hoja
        if(!hoja){
            throw new Error("La hoja de excel está vacía o no existe");
        }

        //Convertir la hoja en un arreglo de filas (ej: ["23.456.789", "GÓMEZ Ana María", 102, 1, 56])
        let filas = XLSX.utils.sheet_to_json(hoja, {
            header: 1,
            defval: "",
        });

        //validar parámetros de fila
        if (filaInicio < 0 || (filaFin &&filaFin > filas.length)){
            throw new Error ("El rango de filas es inválido");
        }

        const filasACargar = filas.slice(filaInicio, filaFin);

        const objeto = filasACargar.map(fila=> ({

                dni: fila[0],
                nombreCompleto: fila[1],
                legajo: fila[2],
                libro: fila[3],
                folio: fila[4]

        }));


        //Devuelve los datos
        return objeto;

    
    } catch(error){
        console.error("Error al leer el Excel", error.message);
        return {
            valido: false,
            error: error.message
        };
    }
}

module.exports = { leerExcel };