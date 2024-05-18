import { useState } from "react"
import { createPortal } from "react-dom"

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
        <div className="container">
            <form onSubmit={onSubmit}>
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