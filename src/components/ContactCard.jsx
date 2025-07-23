import { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { eliminarContacto } from "../services/sevicesAPI.js";

export const ContactCard = ({ contacto }) => {
  const { dispatch } = useGlobalReducer();
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleDelete = () => {
    eliminarContacto(contacto.id, dispatch);
    setMostrarModal(false);
  };

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2SgPwZYzu7nhGk0y2LigtPYlZAtl4rSHB2w&s"
            className="img-fluid rounded-circle"
            style={{ width: "150px", height: "150px" }}
            alt="Foto de contacto"
          />
        </div>
        <div className="col-md-6">
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li className="d-flex align-items-center mb-3">{contacto.name}</li>
            <li className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-location-dot me-2"></i>{contacto.address}
            </li>
            <li className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-phone me-2"></i>{contacto.phone}
            </li>
            <li className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-envelope me-2"></i>{contacto.email}
            </li>
          </ul>
        </div>
        <div className="col-md-3 d-flex justify-content-end align-items-start gap-2">
          <Link to={`/editar/${contacto.id}`}>
            <button className="btn btn-outline-dark">
              <i className="fa-solid fa-pencil"></i>
            </button>
          </Link>
          <button
            className="btn btn-outline-dark"
            onClick={() => setMostrarModal(true)}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>

      
      {mostrarModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¿Eliminar contacto?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro de que deseas eliminar a{" "}
                  <strong>{contacto.name}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};