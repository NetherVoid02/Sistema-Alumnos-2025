// js/ui.js

function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "Ocultar";
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "Mostrar";
    }
}

function cargarVista(pagina) {
  const iframe = document.getElementById("contenido");

  // Saca las clases de animacion en caso de que las tenga
  iframe.classList.remove("fade");
  iframe.classList.add("fade-out");
    localStorage.setItem("vistaActual", pagina);


  // Esperamos que termine el fade-out
  setTimeout(() => {
    iframe.src = `views/${pagina}`;
    iframe.classList.remove("fade-out");
    
    // Volvemos a hacer el fade-in
    iframe.classList.add("fade");
  }, 200); // debe coincidir con la duración de fadeOut en CSS
}

const iframe = document.getElementById("contenido");

iframe.addEventListener("load", () => {
  // Elimina clase de animación si existe
  iframe.classList.remove("fade");

  // Fuerza el reflow
  void iframe.offsetWidth;

  // Vuelve a agregar la clase para que se reinicie la animación
  iframe.classList.add("fade");

  // Ajusta la altura del iframe automáticamente al contenido cargado
  try {
    const contenido = iframe.contentDocument?.documentElement;
    if (contenido) {
      iframe.style.height = contenido.scrollHeight + "px";
    }
  } catch (e) {
    console.warn("No se pudo acceder al contenido del iframe para ajustar la altura:", e);
  }
});

window.addEventListener("message", (event) => {
  if (event.data?.tipo === "ajustarAltura" && typeof event.data.altura === "number") {
    iframe.style.height = event.data.altura + "px";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ultimaVista = localStorage.getItem("vistaActual") || "inicio.html";
  document.getElementById("contenido").src = `views/${ultimaVista}`;
});
