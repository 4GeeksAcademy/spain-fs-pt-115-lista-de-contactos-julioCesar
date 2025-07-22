export const getContactos = async (dispatch) => {
  try {
    const response = await fetch("https://playground.4geeks.com/contact/agendas/julio/contacts");
    const data = await response.json();

    if (!response.ok) {
      crearAgenda();
      return
    }
          
    console.log("Respuesta completa de la API:", data);
    console.log("Contactos recibidos:", data.contacts);

    dispatch({ type: "set_contactos", payload: data.contacts || [] });
  } catch (error) {
    console.error("Error al obtener contactos:", error);
  }
};

export const crearAgenda = async (slugAgenda = "julio") => {
  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slugAgenda}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: slugAgenda })
    });

    const data = await response.json();
    console.log("Agenda creada:", data);
  } catch (error) {
    console.error("Error al crear agenda:", error);
  }
};

export const crearContacto = async (nuevoContacto, contactosActuales, dispatch) => {
  try {
    const response = await fetch("https://playground.4geeks.com/contact/agendas/julio/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoContacto)
    });

    if (!response.ok) {
      const errorText = await response.text();  
      console.error("Mensaje del servidor:", errorText); // 
      throw new Error("Error al crear contacto"); 
    }

    const data = await response.json();
    console.log("Contacto creado:", data);

    
    dispatch({ type: "set_contactos", payload: [...contactosActuales, data] });

    
    dispatch({
      type: "actualizar_nuevo_contacto",
      payload: {
        name: "",
        email: "",
        phone: "",
        address: ""
      }
    });

  } catch (error) {
    console.error("Error al crear contacto:", error);
  }
};

export const eliminarContacto = async (idContacto, dispatch) => {
  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/julio/contacts/${idContacto}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error al eliminar:", errorText);
      throw new Error("No se pudo eliminar el contacto");
    }

    console.log("Contacto eliminado:", idContacto);

    
    await getContactos(dispatch);
  } catch (error) {
    console.error("Error al eliminar contacto:", error);
  }
};

export const actualizarContacto = async (idContacto, contactoEditado, dispatch) => {
  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/julio/contacts/${idContacto}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactoEditado)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mensaje del servidor:", errorText);
      throw new Error("Error al actualizar contacto");
    }
    if(response.ok){
      getContactos(dispatch);
    }

    const data = await response.json();
    console.log("Contacto actualizado:", data);
  } catch (error) {
    console.error("Error en actualización:", error);
  }
};