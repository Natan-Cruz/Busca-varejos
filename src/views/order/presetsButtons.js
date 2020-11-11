const presets = new Map()

/**
 * São seis status possiveis para o pedido
 * E cada status requer um botao para uma ação diferente
 */

// Preset default 
presets.set(0, {
    cancelOrder: false,
    concludeOrder: false,
});

// Pedido realizado
presets.set(1, {
    cancelOrder: true
});

// Pedido confirmado
presets.set(2, {
    cancelOrder: true
});

// Pedido despachado
presets.set(3, {
    concludeOrder: true,
})

// Pedido entregue
presets.set(4, {})

// Pedido retornado
presets.set(5, {
    cancelOrder: true
});

// Pedido cancelado
presets.set(6, {})

export default presets