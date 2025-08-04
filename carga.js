const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'migracionPrueba',
    password: '1234'
});

async function cargarAlumnos(alumnos) {
    for (const alumno of alumnos) {
        const { legajo, nombre, apellido, dni } = alumno;

        try {
            await pool.query(
                `INSERT INTO alumnos(id_leg, nombre, apellido, dni) VALUES ($1, $2, $3, $4)`,
                [legajo, nombre, apellido, dni]
            );

            console.log(`✅ Insertado: ${nombre} ${apellido}`);
        } catch (error) {
            console.error(`❌ Error al insertar a ${nombre} ${apellido}:`, error.message);
        }
    }

    await pool.end();
}

module.exports = cargarAlumnos;
