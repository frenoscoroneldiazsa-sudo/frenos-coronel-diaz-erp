# Proximo sprint ERP

## Objetivo del sprint

Convertir la app actual en una primera herramienta operativa real para mostrador, stock y administracion.

No vamos a intentar construir todo SAP/Odoo de una vez. Vamos a avanzar por modulos utiles, probables y medibles.

## Prioridad 1: Productos

Crear una pantalla de productos con:

- buscar
- ver detalle completo
- editar producto
- editar marca
- editar proveedor
- editar categoria
- editar descripcion
- editar codigo de barras
- activar/inactivar producto

Motivo:

El catalogo es la base del ERP. Si el producto esta mal cargado, todo lo demas falla.

## Prioridad 2: Ubicaciones

Agregar ubicacion fisica al producto.

Campos:

- deposito
- sector
- estanteria
- fila
- cajon
- ubicacion completa

Ejemplo:

`DEP-EST3-FILA2-CAJ4`

Motivo:

La velocidad de venta depende de encontrar rapido la pieza.

## Prioridad 3: Ventas con carrito

Reemplazar venta de un solo producto por venta con varias lineas.

Debe permitir:

- agregar varios productos
- modificar cantidades
- quitar productos
- confirmar venta
- descontar stock de todos los productos juntos
- registrar usuario
- registrar fecha
- registrar observacion

Motivo:

Una venta real puede tener mas de un producto.

## Prioridad 4: Movimientos internos

Agregar movimientos manuales:

- ingreso de stock
- ajuste de stock
- transferencia
- salida por rotura/perdida

Motivo:

No todo movimiento de stock es venta.

## Prioridad 5: Dashboard inicial

Crear panel ejecutivo inicial:

- productos con mayor salida
- productos sin stock
- productos con stock bajo
- ultimas ventas
- total de productos
- unidades disponibles

Motivo:

El administrador necesita ver el negocio rapido.

## Orden recomendado de implementacion

1. Productos editable.
2. Ubicacion de productos.
3. Venta con carrito.
4. Movimientos internos.
5. Dashboard inicial.

## Decision tecnica inmediata

Mantener por ahora la app local Python/SQLite para avanzar rapido.

Cuando el flujo del negocio este claro, migrar a:

- Next.js
- NestJS
- PostgreSQL
- Redis
- Elasticsearch/OpenSearch
- Docker

Esto evita perder tiempo construyendo arquitectura grande antes de validar como se trabaja realmente en el mostrador y deposito.

