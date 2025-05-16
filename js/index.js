document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang")?.toUpperCase() || "ES";

  const configScript = document.createElement("script");
  configScript.src = `conf/config${lang}.json`;
  configScript.onload = () => {
    if (typeof config !== "undefined") {
      const greeting = document.querySelector(".greeting");
      if (greeting) greeting.textContent = `${config.saludo}, Joiner`;

      const input = document.querySelector(".search input");
      if (input) input.placeholder = config.nombre;

      const button = document.querySelector(".search button");
      if (button) button.textContent = config.buscar;

      const footer = document.querySelector("footer");
      if (footer) footer.textContent = config.copyRight;
    }

    const studentGrid = document.getElementById("student-grid");

    if (typeof perfiles !== "undefined" && Array.isArray(perfiles)) {
      perfiles.forEach(est => {
        const card = document.createElement("li");
        card.classList.add("student-card");

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("student-Image");
        const img = document.createElement("img");
        img.src = est.imagen;
        img.alt = `Foto de ${est.nombre}`;
        imageContainer.appendChild(img);

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("student-name");
        nameDiv.textContent = est.nombre;

        const link = document.createElement("a");
        link.href = `perfil.html?ci=${est.ci}&lang=${lang.toLowerCase()}`;
        link.appendChild(imageContainer);
        link.appendChild(nameDiv);

        card.appendChild(link);
        studentGrid.appendChild(card);
      });
    }
  };

  document.head.appendChild(configScript);
});
