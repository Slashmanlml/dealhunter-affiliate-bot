'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const AffiliateNotifier = require('../src/affiliate-formatter');
const { escapeMd } = require('../src/affiliate-formatter');

describe('affiliate-formatter', () => {
    it('inyecta el tag de afiliado en el enlace', () => {
        const deal = { linkBase: 'https://amazon.com/dp/xyz' };
        const link = AffiliateNotifier.buildAffiliateLink(deal, 'mi-tag-20');
        assert.ok(link.includes('https://amazon.com/dp/xyz?tag=mi-tag-20'));
        assert.ok(link.includes('tracking=auto_deal_bot'));
    });

    it('escapa caracteres que rompen el Markdown', () => {
        assert.equal(escapeMd('50% OFF [imperdible]_'), '50% OFF \\[imperdible\\]\\_');
    });

    it('el mensaje incluye el producto escapado', () => {
        const deal = {
            producto: 'Sony [XM5]_pro',
            tienda: 'Tiendamia',
            descuento: '42% OFF',
            precioOriginal: 399,
            precioOferta: 229,
            moneda: 'USD',
        };
        const msg = AffiliateNotifier.buildMessage(deal, 'https://x.test/?tag=t');
        assert.ok(msg.includes('Sony \\[XM5\\]\\_pro'));
        assert.ok(msg.includes('https://x.test/?tag=t'));
    });

    it('sin credenciales no despacha y devuelve false', async () => {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chat = process.env.TELEGRAM_CHAT_ID;
        delete process.env.TELEGRAM_BOT_TOKEN;
        delete process.env.TELEGRAM_CHAT_ID;
        try {
            const ok = await AffiliateNotifier.publishDeal({ id: 'x', linkBase: 'https://x.test' });
            assert.equal(ok, false);
        } finally {
            if (token !== undefined) process.env.TELEGRAM_BOT_TOKEN = token;
            if (chat !== undefined) process.env.TELEGRAM_CHAT_ID = chat;
        }
    });
});
