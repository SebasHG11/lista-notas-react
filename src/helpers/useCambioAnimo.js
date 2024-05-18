export const useCambioAnimo = (items, guardarItems) =>{

    const cambioAnimo = (text) => {
        const newItems = items.map((item) => {
            if (item.text === text) return { ...item, like: !item.like };
            return item;
        });
        guardarItems(newItems);
    };

    return[
        cambioAnimo
    ]   
}