// ========== REGISTRO DE ACCESO A LA PÁGINA ==========
// Registrar el acceso a diferentes módulos en el registro de auditoría
// Función para registrar el acceso a la página
async function registrarAccesoApartado(nombreApartado) {
    const usuarioStr = localStorage.getItem('usuario');
    let id_usuario = null;
    if (usuarioStr) {
        try {
            const usuarioObj = JSON.parse(usuarioStr);
            id_usuario = usuarioObj.id_usuario;
        } catch(e) {
            id_usuario = null;
        }
    }
    if (id_usuario) {
        await fetch('http://localhost:3000/api/logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_operacion: 11, // acceso_apartado
                id_usuario,
                ip: null,
                detalle: `El usuario ${id_usuario} accedió al apartado ${nombreApartado}`,
                usuario_afectado: null
            })
        });
    }
}

// Registrar automáticamente el acceso cuando se carga la página

document.addEventListener('DOMContentLoaded', async () => {
   // Determinar el nombre de la página a partir de la URL o el título del documento
    const path = window.location.pathname;
    let pageName = 'Página desconocida';
    
    if (path.includes('cursos.html')) pageName = 'Cursos';
    else if (path.includes('gestionAcademica.html')) pageName = 'Gestión Académica';
    else if (path.includes('ofiAlumnos.html')) pageName = 'Oficina de Alumnos';
    else if (path.includes('config.html')) pageName = 'Configuración';
    else if (path.includes('inicio.html') || path === '/') pageName = 'Inicio';
    else if (path.includes('bitacora.html')) pageName = 'Bitácora';
    
    await registrarAccesoApartado(pageName);
});