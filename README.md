# DealHunter Affiliate Bot

Detecta descuentos, arma el enlace con el identificador de afiliado y despacha la
oferta por Telegram. Se ejecuta con cron de GitHub Actions.

> ### ⚠️ Estado: prototipo
>
> **No consulta ninguna tienda.** El módulo `src/deal-finder.js` devuelve un
> conjunto fijo de ofertas de ejemplo. El formateo de enlaces de afiliado
> (`src/affiliate-formatter.js`) y el despacho sí están implementados.
>
> Para conectarlo de verdad hace falta usar las APIs de afiliados de cada tienda
> (Amazon Associates y equivalentes), que además exigen registro previo y tienen
> reglas propias sobre cómo mostrar precios.

## Uso

```bash
node index.js
```

## Correcciones aplicadas

- **La deduplicación ahora funciona.** Los ids se derivan del contenido
  (`producto|tienda|precioOferta`) en vez de `Math.random()`.
- **Ya no crashea al guardar.** Se crea `data/` antes de escribir.

## Licencia

MIT
