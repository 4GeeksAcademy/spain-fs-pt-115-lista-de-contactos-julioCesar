import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "./ContactCard.jsx";



export const ListaContactos = () => {

    const {store, dispatch} =useGlobalReducer()

    return (
        <div className="container mt-5">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/lista">
                    <button className="btn btn-success mb-3" type="button">Add New Contact</button>
                </Link>
            </div>

            <ul className="list-group">
                {store.contactos.map((contacto) => (
                    <ContactCard key={contacto.id} contacto={contacto} />
                ))}
            </ul>
            
        </div>
    );
}