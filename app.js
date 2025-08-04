// Requiere los modulos necesarios
const leerExcel = require('./lectura');
const validarDatos = require('./validacion');
const cargarAlumnos = require('./carga');

// Ruta del archivo a leer
const archivo = './buscador-matriz-02-1.xlsx';

async function ejecutarProceso() {
    try {
        console.log('📥 Leyendo archivo Excel...');
        const datos = await leerExcel(archivo);
        if (!datos || datos.length === 0) {
            console.error('❌ No se encontraron datos en el archivo Excel.');
            return;
        }

        console.log('🔍 Validando datos...');
        const resultadoValidacion = validarDatos(datos);

        if (!resultadoValidacion.valido) {
            console.error('❌ Error en validación:');
            if (resultadoValidacion.tipo === 'filas' && resultadoValidacion.errores) {
                resultadoValidacion.errores.forEach(errorFila => {
                    console.error(`Fila ${errorFila.fila}: ${errorFila.errores.join(', ')}`);
                });
            } else {
                console.error(resultadoValidacion);
            }
            return;
        }

        const datosValidados = resultadoValidacion.datos;

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

// Ejecutamos el proceso
ejecutarProceso();
