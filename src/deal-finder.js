const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '..', 'data', 'ofertas_publicadas.json');

/**
 * Identidad estable derivada del contenido (producto, tienda, precioOferta).
 * Antes se usaba Math.random(), asi que cada corrida generaba ids nuevos y el
 * filtro de duplicados no filtraba nada: se re-despachaba todo en cada ejecucion.
 */
const buildId = item => 'DEAL-' + crypto.createHash('sha1')
  .update([item.producto, item.tienda, item.precioOferta].join('|').toLowerCase())
  .digest('hex').slice(0, 10);

class DealFinder {
    async scanDeals() {
        console.log('🏷️ [DealHunter] Escaneando tiendas y detectando errores de precio y descuentos masivos...');

        const currentItems = [
            {
                id: null, // se calcula abajo, a partir del contenido
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
                id: null, // se calcula abajo, a partir del contenido
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
                id: null, // se calcula abajo, a partir del contenido
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

        // Identidad estable: sin esto la deduplicacion no puede funcionar.

        currentItems.forEach(i => { i.id = buildId(i); });


        let historico = [];
        if (fs.existsSync(DB_FILE)) {
            try {
                historico = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
            } catch (e) {
                historico = [];
            }
        }

        const idsVistos = new Set(historico.map(d => d.id));
        const nuevasOfertas = currentItems.filter(d => !idsVistos.has(d.id));

        console.log(`📊 [DealHunter] Ofertas encontradas: ${currentItems.length} | Nuevas para despachar: ${nuevasOfertas.length}`);

        const actualizado = [...nuevasOfertas, ...historico].slice(0, 100);
        fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
        fs.writeFileSync(DB_FILE, JSON.stringify(actualizado, null, 2), 'utf-8');

        return nuevasOfertas;
    }
}

module.exports = DealFinder;
