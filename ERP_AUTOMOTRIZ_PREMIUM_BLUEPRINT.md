# ERP Automotriz Premium - Frenos Coronel Diaz SA

## Vision

Crear una plataforma empresarial inteligente para repuestos de frenos, distribucion automotriz, ventas, stock, compras, logistica, usuarios, reportes, automatizacion e inteligencia de negocio.

El sistema debe evolucionar desde el prototipo actual hacia un ERP cloud multiusuario, moderno, rapido y escalable.

## Principios de producto

- Rapidez operativa: menos clics, busqueda inmediata y acciones directas.
- Simplicidad: cualquier empleado debe poder vender, buscar y mover stock sin capacitacion extensa.
- Control empresarial: el administrador debe ver todo lo que pasa.
- Trazabilidad: cada venta, ajuste, movimiento o importacion debe registrar usuario, fecha y hora.
- Inteligencia: el sistema debe sugerir, alertar y anticiparse.
- Escalabilidad: la arquitectura debe permitir crecer a nube, multiples usuarios y sucursales.

## Arquitectura objetivo

### Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- UI responsive para PC, notebook, tablet y celular
- Componentes tipo dashboard premium

### Backend

- Node.js
- NestJS
- API REST
- WebSockets con Socket.IO para tiempo real
- Arquitectura modular
- Validaciones centralizadas
- Auditoria de eventos

### Base de datos

- PostgreSQL
- Migraciones versionadas
- Tablas normalizadas
- Indices para busquedas criticas

### Cache y tiempo real

- Redis
- Cache de busquedas frecuentes
- Sesiones distribuidas
- Eventos en tiempo real

### Buscador inteligente

- Elasticsearch u OpenSearch
- Busqueda por:
  - codigo interno
  - codigo OEM
  - codigo alternativo
  - codigo de barras
  - descripcion
  - marca
  - proveedor
  - vehiculo
  - aplicacion
  - equivalencias
  - medidas
- Correccion de errores de escritura
- Ranking de resultados
- Autocompletado

### Infraestructura cloud

- Docker
- VPS o plataforma cloud
- Backups automaticos
- HTTPS
- Dominio propio
- Monitoreo

## Modulos principales

### 1. Catalogo automotriz

Gestiona todos los productos y sus datos tecnicos.

Campos principales:

- codigo interno
- codigo OEM
- codigo alternativo
- codigo de barras
- QR
- producto
- marca
- proveedor
- categoria
- descripcion
- aplicacion
- medidas
- equivalencias
- estado activo/inactivo

### 2. Compatibilidad tipo TecDoc

Permite vincular productos con vehiculos.

Entidades:

- marcas de vehiculo
- modelos
- versiones
- anios
- motores
- plataformas
- compatibilidades producto-vehiculo
- equivalencias

Ejemplos de busqueda:

- pastillas hilux
- cilindro corsa
- disco corolla
- campana corsa
- frasle corolla
- PD145

### 3. Stock inteligente

Controla stock total y stock por ubicacion.

Ubicaciones:

- mostrador
- deposito
- sector
- estanteria
- fila
- cajon
- ubicacion completa, ejemplo: DEP-EST3-FILA2-CAJ4

Funciones:

- stock por ubicacion
- minimo de seguridad
- stock critico
- stock reservado
- stock disponible
- historial completo

### 4. Movimientos internos

Controla la logistica interna.

Tipos:

- ingreso de mercaderia
- salida por venta
- transferencia deposito a mostrador
- transferencia mostrador a deposito
- ajuste manual
- inventario fisico
- merma o perdida

Cada movimiento registra:

- producto
- cantidad
- origen
- destino
- usuario
- fecha y hora
- motivo
- comprobante interno

### 5. Ventas

Modulo de atencion rapida para mostrador, mayorista y minorista.

Funciones:

- venta rapida
- presupuestos
- remitos
- reservas
- separacion de pedidos
- descuentos
- listas de precios
- historial por cliente
- ventas mayoristas
- ventas minoristas
- salida automatica de stock

Indicadores:

- salida de productos
- productos con mayor salida
- ranking por marca
- ranking por categoria
- rendimiento por vendedor

### 6. Clientes

Gestion comercial.

Campos:

- nombre
- CUIT/DNI
- condicion IVA
- telefono
- email
- direccion
- tipo: minorista, mayorista, taller, distribuidor
- cuenta corriente
- historial de compras

### 7. Proveedores y compras

Gestiona compras y pedidos.

Funciones:

- proveedores
- listas de proveedor
- pedidos sugeridos
- ordenes de compra
- recepcion de mercaderia
- actualizacion masiva de precios
- comparacion de proveedores

### 8. Importacion masiva

Debe permitir:

- importar Excel
- importar CSV
- mapear columnas automaticamente
- detectar duplicados
- validar errores
- previsualizar antes de importar
- actualizar stock
- actualizar precios
- crear productos nuevos

### 9. Scanner codigo de barras y QR

Funciones:

- busqueda instantanea
- venta rapida
- ingreso de stock
- inventario fisico
- movimientos internos
- lectura con scanner USB o inalambrico
- lectura con camara de celular

### 10. Facturacion y pagos

Integraciones:

- ARCA / AFIP
- facturacion electronica
- CAE
- Mercado Pago
- QR de pago
- links de pago
- notas de credito
- remitos
- cuentas corrientes

Este modulo requiere validacion legal, credenciales reales y entorno de prueba.

### 11. Business Intelligence

Dashboard ejecutivo.

KPIs:

- ventas del dia
- ventas del mes
- unidades vendidas
- productos con mayor salida
- marcas con mayor salida
- categorias con mayor salida
- productos criticos
- productos sin movimiento
- inventario valorizado
- rentabilidad
- rendimiento por vendedor
- compras mensuales
- movimientos internos

Visuales:

- barras
- lineas
- tortas
- tarjetas KPI
- alertas visuales
- ranking dinamico

### 12. Inteligencia artificial

Funciones iniciales:

- detectar stock critico
- detectar productos de alta rotacion
- detectar productos sin movimiento
- sugerir reposicion
- sugerir compras
- detectar exceso de stock
- generar alertas

Funciones avanzadas:

- prediccion de demanda
- sugerencias por tendencia
- recomendacion de proveedor
- asistente de busqueda en lenguaje natural
- asistente empresarial para preguntas como:
  - Que productos debo comprar esta semana?
  - Que marca se vendio mas este mes?
  - Que productos estan parados?
  - Que vendedor tuvo mejor rendimiento?

## Roles y permisos

Roles:

- administrador
- supervisor
- vendedor
- deposito
- caja
- compras

Permisos clave:

- ver productos
- vender
- aplicar descuentos
- ajustar stock
- transferir stock
- importar Excel
- ver reportes
- administrar usuarios
- ver costos
- ver rentabilidad
- emitir facturas
- gestionar compras

## Modelo de datos objetivo

Tablas principales:

- users
- roles
- permissions
- products
- product_codes
- brands
- suppliers
- categories
- vehicles
- vehicle_models
- product_vehicle_compatibilities
- warehouses
- locations
- stock_balances
- stock_movements
- customers
- sales
- sale_items
- quotes
- purchase_orders
- purchase_order_items
- imports
- import_errors
- price_lists
- product_prices
- payments
- invoices
- audit_logs
- alerts
- ai_recommendations

## Roadmap por fases

### Fase 0 - Base actual

Estado actual:

- Excel importado
- tabla unificada
- app local
- login administrador/empleado
- busqueda general
- filtros por proveedor/categoria
- venta con descuento de stock
- movimientos
- panel inicial de ventas

### Fase 1 - ERP local funcional

Objetivo: que el negocio pueda operar mejor desde esta PC y red local.

Construir:

- modulo de productos completo
- alta y edicion de productos
- ubicaciones de stock
- ajustes de stock
- movimientos internos
- usuarios y permisos desde pantalla
- ventas mejoradas
- historial de ventas
- dashboard inicial

### Fase 2 - Modernizacion tecnica

Objetivo: migrar el prototipo a arquitectura empresarial.

Construir:

- backend NestJS
- frontend Next.js
- PostgreSQL
- migracion desde SQLite
- API REST formal
- autenticacion robusta
- Docker

### Fase 3 - Cloud multiusuario

Objetivo: abrir desde PC, celular y notebook con usuarios simultaneos.

Construir:

- hosting cloud
- HTTPS
- dominio
- backups
- WebSockets
- actualizacion de stock en tiempo real
- monitoreo

### Fase 4 - Busqueda automotriz inteligente

Objetivo: busqueda tipo catalogo premium.

Construir:

- Elasticsearch/OpenSearch
- equivalencias
- compatibilidad vehicular
- autocompletado
- tolerancia a errores
- busqueda por lenguaje natural

### Fase 5 - Compras, IA y BI

Objetivo: automatizar decisiones.

Construir:

- pedidos sugeridos
- alertas inteligentes
- dashboard BI premium
- prediccion de demanda
- productos sin movimiento
- productos criticos
- rotacion por marca/categoria

### Fase 6 - Integraciones externas

Objetivo: cerrar el ciclo comercial.

Construir:

- Mercado Pago
- ARCA/AFIP
- email
- WhatsApp
- PDF
- remitos
- facturas

## Proximo sprint recomendado

El siguiente sprint debe enfocarse en transformar el prototipo actual en un ERP local realmente operable:

1. Crear pantalla de productos.
2. Permitir editar producto, proveedor, categoria, marca y descripcion.
3. Crear ubicaciones fisicas.
4. Agregar stock por ubicacion.
5. Mejorar modulo ventas con:
   - carrito de venta
   - varias lineas de productos
   - cliente opcional
   - total de unidades
   - confirmacion final
6. Crear dashboard inicial con:
   - productos con mayor salida
   - stock critico
   - ultimas ventas
   - productos sin stock

## Criterio de calidad

Cada modulo debe cumplir:

- rapido
- simple
- auditable
- responsive
- seguro
- facil de usar
- preparado para migrar a cloud

