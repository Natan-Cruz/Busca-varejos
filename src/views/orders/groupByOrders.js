export default function groupByOrders(orders) {
    const resultado = [];
    orders.forEach(function(item) {
        let i = null
        resultado.forEach(itm => {
            if (item['group_title'] === itm['title'])
                i = itm
        })
        if (!i) {
            resultado.push({
                title: item.group_title,
                items: [{
                    amount: item.amount,
                    createdAt: item.createdAt,
                    id_order: item.id_order,
                    name: item.name,
                    status: item.status
                }]
            })
        } else
            i.items.push({
                amount: item.amount,
                createdAt: item.createdAt,
                id_order: item.id_order,
                name: item.name,
                status: item.status
            })
    });

    return resultado;
}