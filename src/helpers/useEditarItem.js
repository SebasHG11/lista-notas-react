export const useEditarItem = (items, setEditItem, guardarItems) =>{

    const editarItem = (text, newText) =>{
        const newItems = items.map(item =>{
            if(item.text === text) return {...item, text: newText}
            return item
        })
        guardarItems(newItems)
        setEditItem(null)
    }

    return [
        editarItem
    ]
}