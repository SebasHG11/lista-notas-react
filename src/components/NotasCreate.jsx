import "../styles/NotasCreate.css"
import { createPortal } from "react-dom"

export const NotasCreate = ({children}) =>{
    return createPortal(
        <div className="NotaCreate">
           {children} 
        </div>   
    ,
    document.getElementById('pagina2')
    )
}