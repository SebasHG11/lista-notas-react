export const useAgregarItem = (items, guardarItems) =>{

    const agregarItem = (text) => {
        const newItem = {
            text: text,
            date: new Date().toLocaleDateString(),
            like: true
        };
        const newItems = [...items, newItem];
        guardarItems(newItems);
    };

    return [
        agregarItem
    ]
}