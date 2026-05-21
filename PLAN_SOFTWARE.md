# Sistema unificado de stock, ventas y facturacion

## Objetivo

Crear una aplicacion web en la nube para unificar listas de Excel, controlar stock automaticamente, gestionar precios, costos, ventas, descuentos, facturacion, pagos y envio de comprobantes.

La aplicacion debe poder abrirse desde distintas computadoras con usuario y contrasena. Debe tener perfiles para empleados y un perfil de dueno/administrador con control total.

## MVP recomendado

La primera version debe resolver lo mas importante:

1. Importar productos desde listas de Excel.
2. Unificar productos duplicados o repetidos.
3. Ver stock actual por producto.
4. Registrar ventas.
5. Descontar stock automaticamente cuando se hace una venta.
6. Manejar usuarios:
   - Dueno/administrador: acceso total.
   - Empleado: carga ventas y consulta stock, con permisos limitados.
7. Ver historial de movimientos:
   - Ingresos de stock.
   - Ventas.
   - Ajustes manuales.

## Etapa 2: precios y rentabilidad

Agregar:

1. Precio de costo.
2. Precio de venta.
3. Margen de ganancia.
4. Descuentos por venta.
5. Listas de precios.
6. Reportes de ganancia por producto, venta y periodo.

## Etapa 3: facturacion e integraciones

Agregar integraciones externas:

1. Facturacion con ARCA.
2. Mercado Pago.
3. Envio de comprobantes por email.
4. Envio de comprobantes por WhatsApp.
5. Registro de medios de pago.

Antes de implementar estas integraciones hay que revisar la documentacion oficial actualizada de cada servicio y definir credenciales, permisos y modo de prueba.

## Etapa 4: nube y operacion real

Preparar el sistema para uso diario:

1. Base de datos en la nube.
2. Backups automaticos.
3. Seguridad por roles.
4. Historial de acciones por usuario.
5. Panel de administracion.
6. Acceso desde varias computadoras.
7. Dominio propio si se desea.

## Datos principales

### Producto

- Codigo interno
- Codigo de barras, si existe
- Nombre
- Categoria
- Proveedor
- Costo
- Precio de venta
- Stock actual
- Stock minimo
- Estado activo/inactivo

### Venta

- Fecha
- Usuario que vendio
- Cliente, opcional
- Productos vendidos
- Cantidad
- Precio unitario
- Descuento
- Total
- Medio de pago
- Comprobante asociado, si corresponde

### Usuario

- Nombre
- Email o usuario
- Contrasena
- Rol: dueno, administrador o empleado
- Estado activo/inactivo

## Primeros archivos necesarios

Para empezar bien, conviene reunir:

1. Todas las listas de Excel actuales.
2. Una descripcion de que significa cada columna.
3. Ejemplos de ventas reales.
4. Lista de empleados que usarian el sistema.
5. Reglas actuales de precios, descuentos y stock.

## Importacion inicial realizada

Ya se copiaron los Excel iniciales a `EXCEL_ACTUALES` y se genero una primera tabla unificada en `DATOS_IMPORTADOS/inventario_unificado.csv`.

Detalle de la importacion:

- 5 archivos Excel leidos.
- 53 hojas importadas.
- 16.944 filas importadas.
- 0 hojas omitidas.

Ver tambien `IMPORTACION_EXCEL.md`.

## Decision tecnica inicial

Recomendacion: construir una aplicacion web.

Una opcion solida seria:

- Frontend: React o Next.js.
- Backend: Node.js/NestJS o Python/FastAPI.
- Base de datos: PostgreSQL.
- Hosting: servicio cloud con backups.

Para un prototipo rapido tambien se puede crear una primera version local que importe archivos Excel y permita probar el flujo de stock antes de subirlo a la nube.
