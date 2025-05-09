document.addEventListener("DOMContentLoaded", () => {
    if (typeof config !== "undefined") {
      // Cambiar saludo
      const greeting = document.querySelector(".greeting");
      if (greeting) greeting.textContent = `${config.saludo}, Joiner`;
  
      // Cambiar placeholder del buscador
      const input = document.querySelector(".search input");
      if (input) input.placeholder = config.nombre;
  
      // Cambiar texto del botón
      const button = document.querySelector(".search button");
      if (button) button.textContent = config.buscar;
  
      // Cambiar footer
      const footer = document.querySelector("footer");
      if (footer) footer.textContent = config.copyRight;
    }
  });
  