export default function groupByList(list, limit) {
    const result = [];
    // exceeded_limit = list.length > limit;

    list.forEach((item, index) => {
        let i = undefined
        result.forEach(itm => {
            if (item.id === itm.id)
                return i = itm
        })

        if (!i) {
            result.push({
                id: item.id,
                price: item.price,
                name: item.name,
                quantity: 1,
                more_quantity: (index + 1) > limit ? 1 : 0
            })
        } else {
            i['quantity'] += 1;
            i['more_quantity'] += (index + 1) > limit ? 1 : 0;
        }
    });

    return result
}