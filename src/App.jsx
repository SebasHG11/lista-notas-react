import { NotasSearch } from "./components/NotasSearch"
import { NotasList } from "./components/NotasList"
import { NotasItem } from "./components/NotasItem"
import { NotasForm } from "./components/NotasForm"
import { NotasCargando } from "./components/NotasCargando"
import { useEffect, useState } from "react"

export const App = () => {

    // const notasDefault =[
    //     {text: 'No olvidar ir al banco', date: new Date().toLocaleDateString()},
    //     {text: 'Recoger a los niños', date: new Date().toLocaleDateString()},
    //     {text: 'Escuchar musica', date: new Date().toLocaleDateString()},
    //     {text: 'Hacer compras', date: new Date().toLocaleDateString()},
    // ]

    const [cargando, setCargando] = useState(true)

    const localStorageNotas = localStorage.getItem('NOTAS')
    let parsedNotas = JSON.parse(localStorageNotas)

    const [notas, setNotas] = useState(parsedNotas)
    const [busca, setBusca] = useState('')

    useEffect(()=>{
        try{
            setTimeout(()=>{
                if(!localStorageNotas.length > 0){
                    localStorage.setItem('NOTAS', '[]')
                    parsedNotas = []
                }else{
                    parsedNotas = JSON.parse(localStorageNotas)
                }
                setCargando(false)
            },3000)
        }catch(error){
            console.log(error)
        }
        
    },[notas])


    const guardarNotas = (newNotas) =>{
        localStorage.setItem('NOTAS', JSON.stringify(newNotas))
        setNotas(newNotas)
    }


    const notasBuscadas = notas.filter(n=>{
        return n.text && n.text.toLowerCase().includes(busca.toLowerCase())
    })

    const quitarNota = (text) =>{
        const newNotas = notas.filter(n => n.text !== text)
        guardarNotas(newNotas)
    }

    const cambioAnimo = (text) =>{
        const newNotas = notas.map((nota) =>{
            if(nota.text === text) return {...nota, like: !nota.like}
            return nota
        })
        guardarNotas(newNotas)
    }

    const agregarNota = (text) =>{
        const newNota ={
            text: text,
            date: new Date().toLocaleDateString(),
            like: true
        }
        const newNotas = [...notas]
        newNotas.push(newNota)
        guardarNotas(newNotas)
    }

  return (
    <div className="container">
        <h1>Lista de Notas</h1>
        <NotasSearch 
        busca={busca}
        setBusca={setBusca}/>
        <NotasList>
            {!cargando ? notasBuscadas.map(nota =>(
                    <NotasItem 
                    key={nota.text}
                    text={nota.text}
                    date={nota.date}
                    like={nota.like}

                    cambioAnimo={() =>{
                        cambioAnimo(nota.text)
                    }}

                    quitarNota={() => {
                        quitarNota(nota.text)
                    }}
                    />
            ))
        :
        <NotasCargando />
        }
        </NotasList>
        <NotasForm 
        agregarNota={agregarNota}
        />
    </div>
  )
}
