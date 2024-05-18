import "../styles/NotasItem.css"

export const NotasItem = ({ text , date, like, quitarNota, cambioAnimo, useEditar }) => {

  return (
    <div className="containerNota">
        <span
        className="containerNota-Quitar"
        onClick={quitarNota}
        >X</span>
        <h3>{text}</h3>
        <p>{date}</p>

        <span
        className="containerNota-Cambio"
        onClick={cambioAnimo}
        >
          {like ?
          '👍' :
          '👎'
          }
        </span>
        <button
        className="btn btn-primary"
        onClick={useEditar}>
          Editar
        </button>
    </div>
  )
}