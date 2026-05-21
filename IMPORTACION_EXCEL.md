# Importacion inicial de Excel

## Resultado

Se copiaron los 5 archivos Excel originales a la carpeta `EXCEL_ACTUALES` y se genero una tabla maestra unificada.

Archivo generado:

- `DATOS_IMPORTADOS/inventario_unificado.csv`

Resumen generado:

- `DATOS_IMPORTADOS/resumen_importacion.json`

## Numeros de la importacion

- Archivos leidos: 5
- Hojas importadas: 53
- Hojas omitidas: 0
- Filas importadas: 16.944
- Filas con codigo item: 16.921
- Filas con codigo de barras: 12.383
- Filas con descripcion: 16.939

## Columnas normalizadas

El importador convierte nombres distintos o escritos con variaciones a estas columnas:

- archivo_origen
- hoja_origen
- fila_origen
- codigo_item
- codigo_barras
- codigo_articulo
- producto
- marca
- proveedor
- departamento
- descripcion
- unidad
- stock
- deposito
- entrada
- salida
- stock_calculado

## Como repetir la importacion

Cuando se agreguen o reemplacen Excel en `EXCEL_ACTUALES`, ejecutar:

```powershell
& "C:\Users\Frenos Coronel Díaz\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" "scripts\importar_excel.py"
```

Esto vuelve a generar:

- `DATOS_IMPORTADOS/inventario_unificado.csv`
- `DATOS_IMPORTADOS/resumen_importacion.json`

## Observaciones importantes

La columna `stock_calculado` se genera como ayuda de control usando:

`unidad o stock + deposito + entrada - salida`

En varias hojas, `UNIDAD` parece representar el stock actual. En otras, aparecen columnas separadas como `STOCK`, `DEPOSITO`, `ENTRADA` y `SALIDA`. Antes de construir la app final conviene confirmar cual columna queres tomar como stock real principal.

## Siguiente paso tecnico

Crear una primera aplicacion local/web que use esta tabla unificada para:

1. Buscar productos por codigo, codigo de barras, marca o descripcion.
2. Ver stock actual.
3. Registrar una venta.
4. Descontar stock automaticamente.
5. Guardar historial de movimientos.
