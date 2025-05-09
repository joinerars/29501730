document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const ci = params.get("ci");

  if (!ci) {
    alert("No se especificó ningún CI en la URL");
    return;
  }

  // Dynamically load the perfil.js file
  const script = document.createElement("script");
  script.src = `../datos/perfil.json`;
  script.onload = () => {
    if (typeof perfil === "undefined") {
      console.error("No se pudo cargar el perfil.");
      return;
    }

    // Insert image
    const imgContainer = document.querySelector(".foto img");
    if (imgContainer) {
      imgContainer.src = `../${perfil.imagen}`;
      imgContainer.alt = `Foto de ${perfil.nombre}`;
    }

    // Insert name
    const name = document.querySelector(".nombre");
    if (name) name.textContent = perfil.nombre;

    // Insert description
    const desc = document.querySelector(".descripcion");
    if (desc) desc.textContent = perfil.descripcion;

    // Insert table of data using config
    const tabla = document.querySelector("table");
    if (tabla) {
      tabla.innerHTML = `
        <tr><td>Color:</td><td>${perfil.color}</td></tr>
        <tr><td>Libro:</td><td>${perfil.libro}</td></tr>
        <tr><td>Música:</td><td>${perfil.musica}</td></tr>
        <tr><td>Videojuego:</td><td>${Array.isArray(perfil.video_juego) ? perfil.video_juego.join(", ") : perfil.video_juego}</td></tr>
        <tr><td><b>Lenguajes:</b></td><td><b>${perfil.lenguajes.join(", ")}</b></td></tr>
      `;
    }

    // Insert email
    const mailP = document.querySelector("p a[href^='mailto']");
    if (mailP) {
      mailP.href = `mailto:${perfil.email}`;
      mailP.textContent = perfil.email;
    }

    // Insert paragraph text
    const mailText = document.querySelector("p:not(:has(a))");
    if (mailText) {
      mailText.textContent = `Puedes contactar a ${perfil.nombre} en el correo electrónico proporcionado.`;
    }
  };
  script.onerror = () => {
    console.error("Error al cargar el archivo de perfil.");
  };
  document.head.appendChild(script);
});
