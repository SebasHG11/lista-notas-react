import { useState } from "react"

export const NotasForm = ({agregarNota, setOpenModal}) => {

  const [newNota, setNewNota] = useState('')

  const onSubmit = (event) =>{
    event.preventDefault()
    agregarNota(newNota)
    setNewNota('')
    setOpenModal(false)
  }

  const onCancelar = (event) =>{
    event.preventDefault()
    setOpenModal(false)
  }

  return (
    <>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
            <label htmlFor="ingreso" className="form-label">Ingrese una nueva nota</label>
            <textarea 
            className="form-control" 
            name="ingreso" 
            rows="3"
            value={newNota}
            onChange={() =>{
              setNewNota(event.target.value)
            }}
            ></textarea>
            <button type="submit" className="btn btn-primary">Agregar</button>
            <button
            className="btn btn-danger"
            onClick={onCancelar}
            >Cancelar</button>
            </div>
        </form>
    </>


  )
}
