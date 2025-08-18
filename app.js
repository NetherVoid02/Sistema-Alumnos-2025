const { leerExcel } = require('./lectura');
const validarDatos = require('./validacion');
const { cargarAlumnos } = require('./carga');

// Archivo Excel
const archivo = './buscador-matriz-02-1.xlsx';

// Rango de filas desde la terminal: node app.js 2 50
const filaInicio = parseInt(process.argv[2]) || 2;
const filaFin = parseInt(process.argv[3]);

async function ejecutarProceso() {
    try {
        console.log('📥 Leyendo archivo Excel...');
        const datos = leerExcel(archivo, filaInicio, filaFin);

        if (!datos || datos.length === 0) {
            console.error('❌ No se encontraron datos en el archivo Excel.');
            return;
        }

        console.log('🔍 Validando datos...');
        const resultado = validarDatos(datos);

        if (!resultado.valido) {
            console.error('❌ Error en validación:');
            if (resultado.tipo === 'filas' && resultado.errores) {
                resultado.errores.forEach(e => {
                    console.error(`Fila ${e.fila}: ${e.error || e.errores.join(', ')}`);
                });
            } else {
                console.error(resultado);
            }
            return;
        }

        const datosValidados = resultado.datos;
        if (!datosValidados || datosValidados.length === 0) {
            console.error('❌ Ningún dato válido para insertar.');
            return;
        }

        console.log(`📤 Cargando ${datosValidados.length} alumnos a la base de datos...`);
        await cargarAlumnos(datosValidados);

        console.log('✅ Proceso completado correctamente.');

    } catch (error) {
        console.error('💥 Error general en el proceso:', error.message);
    }
}

// Ejecutar proceso
ejecutarProceso();
