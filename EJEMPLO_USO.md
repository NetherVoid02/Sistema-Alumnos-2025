# Ejemplo de Uso - Sistema de Alumnos

## ¿Qué hace este sistema?

Este sistema **NO** es de agentes. Es un sistema para **ESTUDIANTES/ALUMNOS** que migra datos académicos.

## Formato de datos esperado en Excel

El archivo Excel debe contener las siguientes columnas:

| Columna A | Columna B | Columna C | Columna D | Columna E |
|-----------|-----------|-----------|-----------|-----------|
| DNI | Nombre Completo | Legajo | Libro | Folio |
| 12.345.678 | GARCÍA Juan Carlos | 1001 | 15 | 245 |
| 23456789 | RODRIGUEZ María Elena | 1002 | 16 | 123 |

## Ejemplos de uso

```bash
# Procesar estudiantes de la fila 2 a la 50
node app.js 2 50

# Procesar desde la fila 2 hasta el final
node app.js 2

# Procesar solo las primeras 10 filas
node app.js 2 11
```

## Salida esperada

```
📥 Leyendo archivo Excel...
🔍 Validando datos...
📤 Cargando 25 alumnos a la base de datos...
✅ Insertado: Juan Carlos GARCÍA
✅ Insertado: María Elena RODRIGUEZ
✅ Proceso completado correctamente.
```

## Validaciones que realiza

- **DNI**: Formato válido (7-8 dígitos, con o sin puntos)
- **Nombres**: Formato correcto (APELLIDO Nombre)
- **Legajo**: Número único para cada estudiante
- **Libro/Folio**: Números válidos para registros académicos
- **Duplicados**: Detecta y previene datos duplicados

## Configuración de Base de Datos

El sistema se conecta a PostgreSQL con la siguiente estructura:

```sql
CREATE TABLE alumno (
    dni VARCHAR(20),
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    id_leg INTEGER,
    libro INTEGER,
    folio INTEGER
);
```

---

**RECORDATORIO**: Este es un sistema de gestión de ESTUDIANTES, no de agentes.