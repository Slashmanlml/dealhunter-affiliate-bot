class AffiliateNotifier {
    static async publishDeal(deal) {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        const affiliateTag = process.env.AFFILIATE_TAG || 'tito-deals-20';

        if (!token || !chatId) {
            console.log('⚠️ [Telegram] Sin credenciales configuradas, omitiendo envío.');
            return;
        }

        // Inyección automática del tag de afiliado
        const affiliateLink = `${deal.linkBase}?tag=${affiliateTag}&tracking=auto_deal_bot`;

        const mensaje = 
`🔥 *¡OFERTA FLASH DETECTADA! (${deal.descuento})*\n\n` +
`📦 *Producto:* ${deal.producto}\n` +
`🏪 *Tienda:* ${deal.tienda}\n` +
`❌ *Precio habitual:* ~\$${deal.precioOriginal.toLocaleString()} ${deal.moneda}~\n` +
`✅ *Precio Oferta:* *\$${deal.precioOferta.toLocaleString()} ${deal.moneda}*\n` +
`💥 *Ahorro:* \$${(deal.precioOriginal - deal.precioOferta).toLocaleString()} ${deal.moneda}\n\n` +
`⚡ _Los errores de precio se agotan rápido._\n` +
`👉 [COMPRAR CON DESCUENTO AQUÍ](${affiliateLink})\n\n` +
`📣 _Canal de Ofertas Exclusivas • Enlaces Verificados_`;

        try {
            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: mensaje,
                    parse_mode: 'Markdown',
                    disable_web_page_preview: false
                })
            });
            console.log(`📱 [Telegram] Oferta con link de afiliado publicada: ${deal.id}`);
        } catch (e) {
            console.error('❌ Error publicando oferta:', e.message);
        }
    }
}

module.exports = AffiliateNotifier;
