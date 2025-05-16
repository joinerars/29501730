// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang")?.toUpperCase() || "ES";

  // Cargar configuración desde JSON según idioma
  const configScript = document.createElement("script");
  configScript.src = `conf/config${lang}.json`;

  configScript.onload = () => {
    if (typeof config !== "undefined") {
      // Aplicar textos de configuración (saludo, placeholder, botón, footer)
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

    // Función para renderizar estudiantes 
    const renderStudents = (list) => {
      studentGrid.innerHTML = "";
      if (list.length === 0) {
        const msg = document.createElement("li");
        msg.textContent = config.no_result.replace("[query]", input.value.trim());
        msg.style.color = "#333";
        msg.style.fontSize = "18px";
        msg.style.textAlign = "center";
        msg.style.padding = "20px";
        msg.style.gridColumn = "1 / -1";
        studentGrid.appendChild(msg);
        return;
      }

      list.forEach(student => {
        const card = document.createElement("li");
        card.classList.add("student-card");

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("student-Image");

        const img = document.createElement("img");
        img.src = student.imagen;
        img.alt = `Foto de ${student.nombre}`;
        imageContainer.appendChild(img);

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("student-name");
        nameDiv.textContent = student.nombre;

        const link = document.createElement("a");
        link.href = `perfil.html?ci=${student.ci}&lang=${lang.toLowerCase()}`;
        link.appendChild(imageContainer);
        link.appendChild(nameDiv);

        card.appendChild(link);
        studentGrid.appendChild(card);
      });
    };

    // Mostrar todos los estudiantes inicialmente
    if (typeof perfiles !== "undefined" && Array.isArray(perfiles)) {
      renderStudents(perfiles);
    }

    // Busqueda dinámica por nombre
    const form = document.querySelector(".search");
    const input = document.querySelector(".search input");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.trim().toLowerCase();
      const filtered = perfiles.filter(student =>
        student.nombre.toLowerCase().includes(query)
      );
      renderStudents(filtered);
    });
  };

  document.head.appendChild(configScript);
});
