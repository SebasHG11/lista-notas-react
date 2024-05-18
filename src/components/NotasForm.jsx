import { useState } from "react"

export const NotasForm = ({agregarNota}) => {

  const [newNota, setNewNota] = useState('')

  const onSubmit = (event) =>{
    event.preventDefault()
    agregarNota(newNota)
    setNewNota('')
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
            </div>
        </form>
    </>


  )
}
