import { NotasSearch } from "./components/NotasSearch";
import { NotasList } from "./components/NotasList";
import { NotasItem } from "./components/NotasItem";
import { NotasForm } from "./components/NotasForm";
import { NotasCargando } from "./components/NotasCargando";
import { NotaEdit } from "./components/NotaEdit";
import { NotasEmpty } from "./components/NotasEmpty";
import { uselocalStorage } from "./helpers/useLocalStorage";
import { useAgregarItem } from "./helpers/useAgregarItem";
import { useEffect, useState } from "react";
import { useEditarItem } from "./helpers/useEditarItem";
import { useCambioAnimo } from "./helpers/useCambioAnimo";

export const App = () => {

    const [cargando, setCargando] = useState(true);
    const [empty, setEmpty] = useState(false)
    const [editNota, setEditNota] = useState(null);

    
    let valorInicial = []
    
    const [notas, setNotas] = useState(valorInicial);
    const [busca, setBusca] = useState('');
    
    const [parsedNotas, guardarNotas] = uselocalStorage('NOTAS', valorInicial, setNotas, setCargando)
    
    const notasBuscadas = notas.filter(n => {
        return (n.text) && n.text.toLowerCase().includes(busca.toLowerCase());
    });

    const [agregarNota] = useAgregarItem(notas, guardarNotas)

    const [editar] = useEditarItem(notas, setEditNota, guardarNotas)

    const quitarNota = (text) => {
        const newNotas = notas.filter(n => n.text !== text);
        guardarNotas(newNotas);
    };

    const [cambioAnimo] = useCambioAnimo(notas, guardarNotas)

    useEffect(()=>{
        if(notas.length === 0){
        setEmpty(true)
    }else{
        setEmpty(false)
    }
    },[notas])
    

    return (
        <div className="container">
            <h1>Lista de Notas</h1>
            <NotasSearch
                busca={busca}
                setBusca={setBusca} />
            <NotasList>
                {!cargando ? notasBuscadas.map(nota => (
                    <div key={nota.text}>
                    <NotasItem
                        key={nota.text}
                        text={nota.text}
                        date={nota.date}
                        like={nota.like}

                        cambioAnimo={() => {cambioAnimo(nota.text)}}
                        quitarNota={() => {quitarNota(nota.text)}}
                        useEditar={() => {setEditNota(nota.text)}}
                    />

                    {editNota === nota.text && (
                        <NotaEdit 
                        text={nota.text}
                        editNota={editNota}
                        setEditNota={setEditNota}
                        editar={editar}
                        />
                    )}

                    </div>
                ))
                    :
                    <NotasCargando />
                }
            </NotasList>

            {(empty && !cargando) &&
            <NotasEmpty />
            }

            <NotasForm
                agregarNota={agregarNota}
            />
        </div>
    )
};