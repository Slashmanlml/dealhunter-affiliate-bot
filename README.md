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

## Configuración

```bash
cp .env.example .env   # completar TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID
npm start              # datos de ejemplo
npm test               # 7 tests, sin dependencias externas
```

Sin `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` el pipeline corre igual y solo
omite el envío. En GitHub Actions esas credenciales van en Secrets.

## Stack

Node 20+, sin dependencias de producción. Tests con el runner nativo
(`node --test`). CI en GitHub Actions (tests primero, escaneo después).

## Docker y logs

```bash
npm run docker:build
docker run --rm --env-file .env dealhunter-affiliate-bot
```

`LOG_LEVEL` controla el nivel de log (`debug|info|warn|error`, default `info`).
Los llamados a Telegram reintentan errores de red y HTTP 429/5xx con backoff
exponencial (3 intentos); los 4xx fallan rápido sin reintentar.

## Correcciones aplicadas

- **La deduplicación ahora funciona.** Los ids se derivan del contenido
  (`producto|tienda|precioOferta`) en vez de `Math.random()`.
- **Ya no crashea al guardar.** Se crea `data/` antes de escribir.

## Licencia

MIT
