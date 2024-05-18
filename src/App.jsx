import { NotasSearch } from "./components/NotasSearch";
import { NotasList } from "./components/NotasList";
import { NotasItem } from "./components/NotasItem";
import { NotasForm } from "./components/NotasForm";
import { NotasCargando } from "./components/NotasCargando";
import { NotaEdit } from "./components/NotaEdit";
import { NotasEmpty } from "./components/NotasEmpty";
import { uselocalStorage } from "./helpers/useLocalStorage";
import { useEffect, useState } from "react";

export const App = () => {

    const [cargando, setCargando] = useState(true);
    const [empty, setEmpty] = useState(false)
    const [editNota, setEditNota] = useState(null);

    const editar = (text, newText) =>{
        const newNotas = notas.map(n =>{
            if(n.text === text) return {...n, text: newText}
            return n
        })
        guardarNotas(newNotas)
        setEditNota(null)
    }

    let valorInicial = []

    const [notas, setNotas] = useState(valorInicial);
    const [busca, setBusca] = useState('');

    const [parsedNotas, guardarNotas] = uselocalStorage('NOTAS', valorInicial, setNotas, setCargando)

    const notasBuscadas = notas.filter(n => {
        return (n.text) && n.text.toLowerCase().includes(busca.toLowerCase());
    });

    const quitarNota = (text) => {
        const newNotas = notas.filter(n => n.text !== text);
        guardarNotas(newNotas);
    };

    const cambioAnimo = (text) => {
        const newNotas = notas.map((nota) => {
            if (nota.text === text) return { ...nota, like: !nota.like };
            return nota;
        });
        guardarNotas(newNotas);
    };

    const agregarNota = (text) => {
        const newNota = {
            text: text,
            date: new Date().toLocaleDateString(),
            like: true
        };
        const newNotas = [...notas];
        newNotas.push(newNota);
        guardarNotas(newNotas);
    };


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