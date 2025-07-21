export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    contactos: [],
    nuevoContacto: {
      name: "",
      email: "",
      address: "",
      phone: ""
    }
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case "set_contactos":
      return {
        ...store,
        contactos: action.payload,
      };
      case "actualizar_nuevo_contacto":
  return {
    ...store,
    nuevoContacto: {
      ...store.nuevoContacto,
      ...action.payload
    }
  };
    default:
      throw Error('Unknown action.');
  }
}
