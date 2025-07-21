import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { actualizarContacto, crearContacto, getContactos } from "../services/sevicesAPI.js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";






export const NuevoContacto = () => {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
  const navigate = useNavigate();
  const modoEdicion = Boolean(id);

  useEffect(() => {
  if (!modoEdicion) {
    dispatch({
      type: "actualizar_nuevo_contacto",
      payload: {
        name: "",
        email: "",
        address: "",
        phone: ""
      }
    });
  }
}, []);

  useEffect(() => {

    if (modoEdicion && store.contactos.length > 0) {
      const contacto = store.contactos.find(c => c.id === parseInt(id));
      if (contacto) {
        dispatch({
          type: "actualizar_nuevo_contacto",
          payload: {
            name: contacto.name,
            email: contacto.email,
            address: contacto.address,
            phone: contacto.phone
          }
        });
      }
    }
  }, [id, store.contactos]);

  const handleChange = (e) => {
    dispatch({
      type: "actualizar_nuevo_contacto",
      payload: { [e.target.name]: e.target.value }
    });
  };



  const handleSubmit = async () => {
    const contactoFormateado = {
      name: String(store.nuevoContacto.name).trim(),
      email: String(store.nuevoContacto.email).trim(),
      address: String(store.nuevoContacto.address).trim(),
      phone: String(store.nuevoContacto.phone).trim(),
      agenda_slug: "julio"
    };

    if (
      !contactoFormateado.name ||
      !contactoFormateado.email.includes("@") ||
      !contactoFormateado.address ||
      !contactoFormateado.phone
    ) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (modoEdicion) {
      await actualizarContacto(id, contactoFormateado, dispatch); 
    } else {
      await crearContacto(contactoFormateado, store.contactos, dispatch); 
    }

    await getContactos(dispatch);
    navigate("/");
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">Agregar Nuevo Contacto</h1>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label d-flex text-start">Nombre Completo</label>
          <input type="text" className="form-control" name="name" id="nombre"
            value={store.nuevoContacto.name}
            onChange={handleChange}
            placeholder="Nombre Completo" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label d-flex text-start">Email</label>
          <input type="text" className="form-control" name="email" id="email"
            value={store.nuevoContacto.email}
            onChange={handleChange}
            placeholder="name@example.com" />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label d-flex text-start">Teléfono</label>
          <input type="text" className="form-control" name="phone" id="telefono"
            value={store.nuevoContacto.phone}
            onChange={handleChange}
            placeholder="Agregar Teléfono" />
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label d-flex text-start">Dirección</label>
          <input type="text" className="form-control" name="address" id="direccion"
            value={store.nuevoContacto.address}
            onChange={handleChange}
            placeholder="Agregar Dirección" />
        </div>

        <div className="d-grid gap-2">
          <button onClick={handleSubmit} className="btn btn-primary">
            {modoEdicion ? "Guardar cambios" : "Crear contacto"}
          </button>
        </div>

        <Link to="/contactos">
          <button className="btn btn-danger mt-3">Volver</button>
        </Link>
      </div>
    </div>
  );
};