const DealFinder = require('./src/deal-finder');
const AffiliateNotifier = require('./src/affiliate-formatter');

async function main() {
    console.log('====================================================');
    console.log('🏷️ DEALHUNTER AFFILIATE BOT - RADAR DE OFERTAS FLASH');
    console.log('====================================================\n');

    const finder = new DealFinder();
    const ofertas = await finder.scanDeals();

    for (const deal of ofertas) {
        await AffiliateNotifier.publishDeal(deal);
        await new Promise(r => setTimeout(r, 800));
    }

    console.log('\n====================================================');
    console.log(`✅ Rastreo completado. ${ofertas.length} ofertas publicadas.`);
    console.log('====================================================');
}

main().catch(err => {
    console.error('❌ Error en el bot de ofertas:', err);
    process.exit(1);
});
