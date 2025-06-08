# Imagen oficial de Apache (basada en Debian)
FROM httpd:2.4

# Copiar TODO el contenido actual (archivos y carpetas) al directorio público del servidor
COPY . /usr/local/apache2/htdocs/

# Exponer puerto web estándar
EXPOSE 80
