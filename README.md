# 🏷️ DealHunter Affiliate Bot — Cazador Automatizado de Ofertas y Errores de Precio

![Bot Status](https://github.com/Slashmanlml/dealhunter-affiliate-bot/actions/workflows/deals.yml/badge.svg)
![Business Model](https://img.shields.io/badge/Model-Affiliate_Commissions_(USD)-gold?style=flat)
![NodeJS](https://img.shields.io/badge/Node.js-20.x-green?style=flat&logo=node.js)
![Cloud Engine](https://img.shields.io/badge/Engine-GitHub_Actions_Cron-blue?style=flat&logo=githubactions)

Bot autónomo de **Afiliación y Detección de Descuentos**. Monitorea tiendas de tecnología, electrónica y pasajes (Amazon, Tiendamia, Despegar), detecta caídas de precio superiores al 30% e inyecta enlaces de afiliados automáticos para publicar en canales de Telegram.

---

## 💼 Modelo de Negocio (Monetización)

```text
[Monitoreo de Tiendas (Amazon / Tiendamia)]
               │
               ▼
   [Detección de Caída de Precio > 35%]
               │
               ▼
[Inyección de Enlace de Afiliado (?tag=...)]
               │
               ▼
[Publicación en Canal de Telegram] ───► [Comprador] ───► [Comisión en USD (3% - 12%)]
```

---

## 💻 Ejecución Local

```bash
git clone https://github.com/Slashmanlml/dealhunter-affiliate-bot.git
cd dealhunter-affiliate-bot
node index.js
```
