document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const ci = params.get("ci");
  const lang = params.get("lang")?.toUpperCase() || "ES";

  if (!ci) {
    alert("No se especificó ningún CI en la URL");
    return;
  }

  // Cargar configuración de idioma
  const configScript = document.createElement("script");
  configScript.src = `conf/config${lang}.json`;
  configScript.onload = () => {
    // Cargar perfil
    const profileScript = document.createElement("script");
    profileScript.src = `${ci}/datos/perfil.json`;
    profileScript.onload = () => {
      if (typeof perfil === "undefined") return;

      const imgContainer = document.querySelector(".foto img");
      if (imgContainer) {
        imgContainer.src = `${ci}/${perfil.imagen}`;
        imgContainer.alt = `Foto de ${perfil.nombre}`;
      }

      const name = document.querySelector(".nombre");
      if (name) name.textContent = perfil.nombre;

      const desc = document.querySelector(".descripcion");
      if (desc) desc.textContent = perfil.descripcion;

      const tabla = document.querySelector("table");
      if (tabla) {
        tabla.innerHTML = `
          <tr><td>${config.color}:</td><td>${perfil.color}</td></tr>
          <tr><td>${config.libro}:</td><td>${perfil.libro}</td></tr>
          <tr><td>${config.musica}:</td><td>${perfil.musica}</td></tr>
          <tr><td>${config.video_juego}:</td><td>${Array.isArray(perfil.video_juego) ? perfil.video_juego.join(", ") : perfil.video_juego}</td></tr>
          <tr><td><b>${config.lenguajes}:</b></td><td><b>${perfil.lenguajes.join(", ")}</b></td></tr>
        `;
      }

      const mailP = document.querySelector("p a[href^='mailto']");
      if (mailP) {
        mailP.href = `mailto:${perfil.email}`;
        mailP.textContent = perfil.email;
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
