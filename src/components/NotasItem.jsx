import "../styles/NotasItem.css"

export const NotasItem = ({ text , date, like, quitarNota, cambioAnimo }) => {
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
          '😂' :
          '😒'
          }
        </span>
    </div>
  )
}