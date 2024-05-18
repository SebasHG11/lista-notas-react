import { useEffect } from "react";

export const uselocalStorage = (nombreLocal, parsedItem, setItem, setCargando) =>{

        useEffect(() => {

            const localStorageItems = localStorage.getItem(nombreLocal);
            try {
                parsedItem = JSON.parse(localStorageItems) || [];
            } catch (e) {
                parsedItem = [];
            }

            setTimeout(() => {
                if (!localStorageItems) {
                    localStorage.setItem(nombreLocal, '[]');
                    parsedItem = [];
                } else {
                    try {
                        parsedItem = JSON.parse(localStorageItems) || [];
                    } catch (e) {
                        parsedItem = [];
                    }
                }
                setItem(parsedItem);
                setCargando(false);
            }, 3000);
        }, []);
    
        const guardarItems = (newNotas) => {
            localStorage.setItem('NOTAS', JSON.stringify(newNotas));
            setItem(newNotas);
        };

    return[
        parsedItem,
        guardarItems
    ]
}

