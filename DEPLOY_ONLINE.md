# Deploy online - Frenos Coronel Diaz SA ERP

## Objetivo

Preparar una version online de prueba para revisar:

- diseno
- menu
- catalogo
- ventas
- stock
- dashboard

La app debe abrirse con una URL publica y no depender de `192.168.x.x`.

## Estado actual del proyecto

La app ya tiene:

- login obligatorio
- usuario administrador
- usuario empleado
- catalogo
- busqueda
- ventas basicas
- stock
- dashboard
- responsive inicial

## Usuarios de prueba

Administrador:

```text
usuario: admin
contrasena: admin123
```

Empleado:

```text
usuario: empleado
contrasena: empleado123
```

## Opcion A - Prueba online rapida con Render

Render permite desplegar servicios web Python gratis para pruebas y ofrece HTTPS administrado y dominios publicos tipo:

```text
https://nombre-del-servicio.onrender.com
```

Archivos preparados:

- `requirements.txt`
- `Procfile`
- `render.yaml`
- `.gitignore`

El `render.yaml` crea:

- servicio web Python
- base PostgreSQL
- variable `DATABASE_URL`
- host `0.0.0.0`

La app detecta `DATABASE_URL` automaticamente. Si existe, usa PostgreSQL. Si no existe, usa SQLite local.

## Comando de inicio

Local:

```powershell
python app.py
```

Render:

```text
python app.py
```

Render define automaticamente la variable `PORT`. La app ya esta preparada para leerla.

## Usuario administrador inicial

Al iniciar con una base vacia, el sistema crea automaticamente:

```text
usuario: admin
contrasena: admin123
rol: administrador
```

Tambien crea:

```text
usuario: empleado
contrasena: empleado123
rol: empleado
```

Recomendacion: cambiar estas contrasenas despues del primer acceso.

Limitaciones importantes del plan gratis:

- El servicio puede dormirse si no recibe trafico.
- El primer acceso despues de dormir puede tardar.
- El sistema de archivos local es efimero.
- Para datos permanentes conviene usar PostgreSQL externo.

## Opcion B - Base de datos cloud real

Para cumplir el requisito de base de datos en la nube, la siguiente preparacion tecnica debe migrar de SQLite local a PostgreSQL.

Opciones posibles:

- Render Postgres: simple con Render, pero la base gratis expira.
- Neon Postgres: buena opcion para pruebas gratuitas de PostgreSQL.
- Supabase Postgres: buena opcion si luego se quieren APIs, auth y panel.

## Opcion C - Link publico temporal con Cloudflare Tunnel

Sirve para revisar desde casa o celular sin deploy real.

Ventajas:

- URL HTTPS publica temporal.
- No requiere mover la app.
- Ideal para revision rapida de diseno.

Limitaciones:

- La PC del local debe estar prendida.
- El servidor local debe estar abierto.
- No reemplaza un deploy cloud real.

## Recomendacion

Para revisar diseno rapidamente:

1. Usar Cloudflare Tunnel o Render.

Para operacion real:

1. Migrar base de datos a PostgreSQL.
2. Subir backend a Render/Railway/VPS.
3. Activar HTTPS.
4. Configurar dominio propio.
5. Crear backups.
6. Reforzar seguridad de contrasenas y sesiones.

## Pendiente antes de produccion

- Cambiar contrasenas iniciales.
- Configurar variables secretas.
- Migrar SQLite a PostgreSQL.
- Agregar backups.
- Revisar permisos de empleados.
- Configurar dominio.
- Revisar politicas de seguridad.
