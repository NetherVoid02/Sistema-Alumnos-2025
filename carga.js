const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'migracionPrueba',
    password: '1234',
});

async function cargarAlumnos(alumnos) {
    for (const alumno of alumnos) {
        const { dni, nombre, apellido, legajo, libro, folio } = alumno;

        try {

            await pool.query(
                `INSERT INTO alumno(dni, nombre, apellido, id_leg, libro, folio) VALUES ($1, $2, $3, $4, $5, $6)`,
                [dni, nombre, apellido, legajo, libro, folio]
            );

            console.log(`✅ Insertado: ${nombre} ${apellido}`);

        } catch (error) {

            console.error(`❌ Error al insertar ${nombre} ${apellido}:`, error.message);
        }
    }

    await pool.end();

}

module.exports = { cargarAlumnos };
