
# Reto 6 - ATI (Aplicaciones con Tecnología Internet)

Este proyecto contiene un `Dockerfile` que permite crear un contenedor con **Ubuntu + Apache HTTP Server**
para servir una página web estática con HTML, CSS, JavaScript, imágenes y archivos JSON incluidos.

## 🚀 Instrucciones para ejecutar

### 1. Clona el repositorio y cambia a la rama `reto6`:

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
git checkout reto6
```

### 2. Construye la imagen Docker:

```bash
docker build -t ati-lab6 .
```

### 3. Ejecuta el contenedor mapeando el puerto 8088:

```bash
docker run -d -p 8088:80 --name ati-lab6-container ati-lab6
```

### 4. Abre en tu navegador:

```
http://localhost:8088/Index.html
```

## 📦 Contenido servido por Apache

Este contenedor sirve todos los archivos del proyecto incluyendo:

- HTML: `Index.html`, `perfil.html`
- CSS: `style.css`
- JS: `/js/perfil.js`, etc.
- JSON: `/datos`, `/conf`, etc.
- Imágenes y carpetas de usuarios: `/29501730`, etc.

---

Este entorno es totalmente portable: cualquier persona puede levantarlo con Docker.
