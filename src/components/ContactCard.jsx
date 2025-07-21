import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { eliminarContacto } from "../services/sevicesAPI.js";

export const ContactCard = ({ contacto }) => {

  const { dispatch } = useGlobalReducer();

  const handleDelete = () => {
    if (confirm("¿Seguro que quieres eliminar este contacto?")) {
      eliminarContacto(contacto.id, dispatch);
    }
  };


  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-3">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2SgPwZYzu7nhGk0y2LigtPYlZAtl4rSHB2w&s"
               className="img-fluid rounded-circle" 
               style={{ width: "150px", height: "150px" }} />
        </div>
        <div className="col-md-6">
            
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li className="d-flex align-items-center mb-3"><span>{contacto.name}</span></li>
            <li className="d-flex align-items-center mb-3"><i className="fa-solid fa-location-dot me-2"></i><span>{contacto.address}</span></li>
            <li className="d-flex align-items-center mb-3"><i className="fa-solid fa-phone me-2"></i><span>{contacto.phone}</span></li>
            <li className="d-flex align-items-center mb-3"><i className="fa-solid fa-envelope me-2"></i><span>{contacto.email}</span></li>
          </ul>
        </div>
        <div className="col-md-3 d-flex justify-content-end align-items-start gap-2">
          <Link to={`/editar/${contacto.id}`}>
          <button className="btn btn-outline-dark"><i className="fa-solid fa-pencil"></i></button>
          </Link>
          <button className="btn btn-outline-dark" onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
    </li>
  );
};