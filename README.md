# Sistema de Alumnos 2025 - Migración de Datos

## ¿Qué es este sistema?

**ACLARACIÓN IMPORTANTE:** Este sistema NO tiene que ver con "agentes". Es un sistema de **ALUMNOS** (estudiantes) para migración de datos académicos.

Este es un sistema de migración de datos para transferir información de estudiantes desde archivos Excel hacia una base de datos PostgreSQL de manera automatizada y validada.

## Funcionalidad Principal

El sistema procesa información de estudiantes que incluye:
- **DNI**: Documento Nacional de Identidad
- **Nombre y Apellido**: Datos personales del estudiante
- **Legajo**: Número de identificación académica del estudiante
- **Libro y Folio**: Referencias de registros académicos

## Componentes del Sistema

### 1. `app.js` - Aplicación Principal
Punto de entrada que coordina todo el proceso de migración.

### 2. `lectura.js` - Lectura de Excel
Lee y extrae datos del archivo Excel de origen.

### 3. `validacion.js` - Validación de Datos
Valida que los datos cumplan con los formatos requeridos:
- DNI válido (7-8 dígitos, con o sin puntos)
- Legajos únicos y numéricos
- Libros y folios válidos
- Detección de duplicados

### 4. `carga.js` - Carga a Base de Datos
Inserta los datos validados en la base de datos PostgreSQL.

## Uso del Sistema

```bash
# Migrar filas 2 a 50 del Excel
node app.js 2 50

# Migrar desde la fila 2 hasta el final
node app.js 2
```

## Configuración Requerida

1. **Base de Datos PostgreSQL** configurada en `carga.js`
2. **Archivo Excel** con datos de estudiantes en formato esperado
3. **Dependencias Node.js** instaladas con `npm install`

---

# Student System 2025 - Data Migration

## What is this system?

**IMPORTANT CLARIFICATION:** This system is NOT about "agents". It's a **STUDENTS** (alumnos) system for academic data migration.

This is a data migration system to transfer student information from Excel files to a PostgreSQL database in an automated and validated manner.
