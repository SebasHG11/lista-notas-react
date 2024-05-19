import { useState } from "react"
import { createPortal } from "react-dom"
import "../styles/NotasEdit.css" 

export const NotaEdit = ({text, editNota, setEditNota, editar}) =>{

    const [newText, setNewText] = useState(text)

    const onSubmit = (event) =>{
        event.preventDefault()
        editar(text, newText)
    }

    const onChange = (event) =>{
        setNewText(event.target.value)
    }

    const onCancelar = (event) =>{
        event.preventDefault()
        setEditNota(null)
    }

    return createPortal(
        <div className="portal">
            <form
            className="formNotaEdit" 
            onSubmit={onSubmit}
            >
                <textarea
                value={newText}
                onChange={onChange} 
                />

                <button
                className="btn btn-primary"
                type="submit"
                >Editar</button>

                <button
                className="btn btn-danger"
                onClick={onCancelar}
                >Cancelar</button>
            </form>
        </div>
        ,
        document.getElementById("pagina")
    )
}