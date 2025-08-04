// lectura.js
const fs = require('fs');
const XLSX = require('xlsx');

function leerExcel(rutaArchivo) {

    const libro = XLSX.readFile(rutaArchivo);
    const hoja = libro.Sheets[libro.SheetNames[0]];

    //Estraer encabezados manualmente desde la primera fila.
    const encabeazdos = XLSX.utils.sheet_to_json(hoja, {
        header:1,
        range: 0,
    })[0]; //Nos quedamos solo con la primera fila.

    //Leer los datos desde la fila 3 y usar los encabezados manualmente
    const datos = XLSX.utils.sheet_to_json(hoja, {
        header: encabeazdos,
        range: 2,   //Empieza a leer desde la fila 3
        defval: '', //Para que no devuelva undefinied
    });

    return datos;

}

module.exports = leerExcel;