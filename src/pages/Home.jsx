import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { ListaContactos } from "../components/ListaContactos.jsx";
import { NuevoContacto } from "../components/NuevoContacto.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { getContactos } from "../services/sevicesAPI.js";


export const Home = () => {
const { dispatch } = useGlobalReducer();

  useEffect(() => {
    getContactos(dispatch);
  }, []);
  
  return (
    <div className="container text-center mt-5">
      <ListaContactos/>
    </div>
  );
}; 