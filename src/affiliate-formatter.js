'use strict';

const logger = require('./logger');
const { callTelegramApi } = require('./telegram');

/** Escapa los caracteres que rompen el parseo Markdown de Telegram. */
const escapeMd = (text = '') => String(text).replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');

class AffiliateNotifier {
    static buildAffiliateLink(deal, affiliateTag) {
        const tag = affiliateTag || process.env.AFFILIATE_TAG || 'tito-deals-20';
        return `${deal.linkBase}?tag=${tag}&tracking=auto_deal_bot`;
    }

    static buildMessage(deal, affiliateLink) {
        return (
`🔥 *¡OFERTA FLASH DETECTADA! (${escapeMd(deal.descuento)})*\n\n` +
`📦 *Producto:* ${escapeMd(deal.producto)}\n` +
`🏪 *Tienda:* ${escapeMd(deal.tienda)}\n` +
`❌ *Precio habitual:* ~\$${Number(deal.precioOriginal).toLocaleString()} ${escapeMd(deal.moneda)}~\n` +
`✅ *Precio Oferta:* *\$${Number(deal.precioOferta).toLocaleString()} ${escapeMd(deal.moneda)}*\n` +
`💥 *Ahorro:* \$${(Number(deal.precioOriginal) - Number(deal.precioOferta)).toLocaleString()} ${escapeMd(deal.moneda)}\n\n` +
`⚡ _Los errores de precio se agotan rápido._\n` +
`👉 [COMPRAR CON DESCUENTO AQUÍ](${affiliateLink})\n\n` +
`📣 _Canal de Ofertas Exclusivas • Enlaces Verificados_`
        );
    }

    /** Publica la oferta. Devuelve true solo si Telegram confirmó el envío. Nunca lanza. */
    static async publishDeal(deal) {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            logger.warn('[Telegram] Sin credenciales configuradas, omitiendo envío.');
            return false;
        }

        const affiliateLink = AffiliateNotifier.buildAffiliateLink(deal);
        const mensaje = AffiliateNotifier.buildMessage(deal, affiliateLink);

        const res = await callTelegramApi(token, 'sendMessage', {
            chat_id: chatId,
            text: mensaje,
            parse_mode: 'Markdown',
            disable_web_page_preview: false
        });
        if (!res.ok) {
            logger.error(`❌ Error publicando oferta: ${res.error.message}`);
            return false;
        }
        logger.info(`📱 [Telegram] Oferta con link de afiliado publicada: ${deal.id}`);
        return true;
    }
}

module.exports = AffiliateNotifier;
module.exports.escapeMd = escapeMd;
