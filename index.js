#!/usr/bin/env node
'use strict';

const DealFinder = require('./src/deal-finder');
const AffiliateNotifier = require('./src/affiliate-formatter');
const logger = require('./src/logger');

const DISPATCH_DELAY_MS = 800;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
    logger.log('====================================================');
    logger.log('🏷️ DEALHUNTER AFFILIATE BOT - RADAR DE OFERTAS FLASH');
    logger.log('====================================================\n');

    const finder = new DealFinder();
    const ofertas = await finder.scanDeals();

    let despachadas = 0;
    for (const deal of ofertas) {
        const ok = await AffiliateNotifier.publishDeal(deal);
        if (ok) despachadas++;
        if (ofertas.length > 1) await sleep(DISPATCH_DELAY_MS);
    }

    logger.log('\n====================================================');
    logger.log(`✅ Rastreo completado. ${ofertas.length} nuevas | ${despachadas} despachadas por Telegram.`);
    logger.log('====================================================');
    return { nuevas: ofertas.length, despachadas };
}

if (require.main === module) {
    main().catch(err => {
        logger.error('❌ Error en el bot de ofertas:', err.message || err);
        process.exit(1);
    });
}

module.exports = { main };
