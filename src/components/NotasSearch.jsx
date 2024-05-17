import "../styles/NotasSearch.css"

export const NotasSearch = ({busca, setBusca}) => {
  return (
    <>
        <div className="input-container">

        <input 
        className="input" 
        name="nota" 
        type="text"
        value={busca}
        onChange={(event)=>{
            setBusca(event.target.value)
        }}
        />
        <label className="label" htmlFor="nota">Busca Tu Nota</label>

        <div className="topline"></div>
        <div className="underline"></div>

        </div>
    </>
  )
}
