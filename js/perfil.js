document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const ci = params.get("ci");
  const lang = params.get("lang")?.toUpperCase() || "ES";

  if (!ci) {
    alert("No se especificó ningún CI en la URL");
    return;
  }

  // Cargar idioma desde URL
  const configScript = document.createElement("script");
  configScript.src = `conf/config${lang}.json`;

  configScript.onload = () => {
    // Cargar perfil dinámico según CI desde URL
    const profileScript = document.createElement("script");
    profileScript.src = (ci === "29501730") ? "datos/perfil.json" : `${ci}/perfil.json`;

    profileScript.onload = () => {
      if (typeof perfil === "undefined") {
        console.error("No se pudo cargar el perfil.");
        return;
      }

      // Mostrar imagen del perfil
      const img = document.querySelector(".foto img");
      if (img) {
        img.src = (ci === "29501730") ? "29501730Grande.jpg" : `${ci}/${ci}.jpg`;
        img.alt = `Foto de ${perfil.nombre}`;
      }

      // Mostrar nombre y descripción
      const name = document.querySelector(".nombre");
      if (name) name.textContent = perfil.nombre;

      const description = document.querySelector(".descripcion");
      if (description) description.textContent = perfil.descripcion;

      // Mostrar Datos del perfil en tabla con textos segun configuración
      const table = document.querySelector("table");
      if (table) {
        table.innerHTML = `
          <tr><td>${config.color}:</td><td>${perfil.color}</td></tr>
          <tr><td>${config.libro}:</td><td>${perfil.libro}</td></tr>
          <tr><td>${config.musica}:</td><td>${perfil.musica}</td></tr>
          <tr><td>${config.video_juego}:</td><td>${Array.isArray(perfil.video_juego) ? perfil.video_juego.join(", ") : perfil.video_juego}</td></tr>
          <tr><td><b>${config.lenguajes}:</b></td><td><b>${perfil.lenguajes.join(", ")}</b></td></tr>
        `;
      }

      // Mostrar Email con enlace y texto configurable
      const mailLink = document.querySelector("a[href^='mailto']");
      if (mailLink) {
        mailLink.href = `mailto:${perfil.email}`;
        mailLink.textContent = perfil.email;
      }

      const mailText = document.querySelector("p:not(:has(a))");
      if (mailText && config.email) {
        mailText.textContent = config.email.replace("[email]", perfil.email);
      }
    };

    document.head.appendChild(profileScript);
  };

  document.head.appendChild(configScript);
});
