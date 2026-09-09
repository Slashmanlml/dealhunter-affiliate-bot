'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const { buildId } = require('../src/deal-finder');

describe('deal-finder: identidad estable', () => {
    it('el mismo contenido produce el mismo id', () => {
        const item = { producto: 'MacBook Air M3', tienda: 'Amazon', precioOferta: 999 };
        assert.equal(buildId(item), buildId({ ...item }));
    });

    it('contenido distinto produce id distinto', () => {
        const base = { producto: 'MacBook Air M3', tienda: 'Amazon', precioOferta: 999 };
        const otro = { ...base, precioOferta: 899 };
        assert.notEqual(buildId(base), buildId(otro));
    });

    it('es insensible a mayúsculas', () => {
        const a = { producto: 'Sony XM5', tienda: 'Tiendamia', precioOferta: 229 };
        const b = { producto: 'sony xm5', tienda: 'tiendamia', precioOferta: 229 };
        assert.equal(buildId(a), buildId(b));
    });
});
