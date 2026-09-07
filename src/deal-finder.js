const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '..', 'data', 'ofertas_publicadas.json');

class DealFinder {
    async scanDeals() {
        console.log('🏷️ [DealHunter] Escaneando tiendas y detectando errores de precio y descuentos masivos...');

        const currentDeals = [
            {
                id: `DEAL-MACBOOK-${Math.floor(100 + Math.random() * 900)}`,
                producto: 'Apple MacBook Air M3 16GB RAM 512GB SSD',
                tienda: 'Amazon',
                precioOriginal: 1499,
                precioOferta: 999,
                descuento: '33% OFF',
                moneda: 'USD',
                linkBase: 'https://amazon.com/dp/sample-macbook-m3',
                categoria: 'TECNOLOGIA',
                fecha: new Date().toISOString()
            },
            {
                id: `DEAL-SONY-${Math.floor(100 + Math.random() * 900)}`,
                producto: 'Auriculares Sony WH-1000XM5 Noise Cancelling',
                tienda: 'Tiendamia',
                precioOriginal: 399,
                precioOferta: 229,
                descuento: '42% OFF',
                moneda: 'USD',
                linkBase: 'https://tiendamia.com/producto/sample-sony-xm5',
                categoria: 'AUDIO',
                fecha: new Date().toISOString()
            },
            {
                id: `DEAL-VUELO-${Math.floor(100 + Math.random() * 900)}`,
                producto: 'Vuelo Directo BsAs - Miami (Tarifa Error / Cupos Limitados)',
                tienda: 'Despegar / Aerolíneas',
                precioOriginal: 1100,
                precioOferta: 540,
                descuento: '51% OFF',
                moneda: 'USD',
                linkBase: 'https://despegar.com/vuelos/sample-miami-2026',
                categoria: 'VIAJES',
                fecha: new Date().toISOString()
            }
        ];

        let historico = [];
        if (fs.existsSync(DB_FILE)) {
            try {
                historico = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
            } catch (e) {
                historico = [];
            }
        }

        const idsVistos = new Set(historico.map(d => d.id));
        const nuevasOfertas = currentDeals.filter(d => !idsVistos.has(d.id));

        console.log(`📊 [DealHunter] Ofertas encontradas: ${currentDeals.length} | Nuevas para despachar: ${nuevasOfertas.length}`);

        const actualizado = [...nuevasOfertas, ...historico].slice(0, 100);
        fs.writeFileSync(DB_FILE, JSON.stringify(actualizado, null, 2), 'utf-8');

        return nuevasOfertas;
    }
}

module.exports = DealFinder;
