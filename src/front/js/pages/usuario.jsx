import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const Usuario = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getUsuario();
  }, []);

  return (
    <>
    { store.auth == false ? <Navigate to="/"/> :
      <div className="container">
        <ul>
          {store.usuario.map((item) => (
            <li key={item.id}>
              <b> {item.id} {item.name} {item.url_img}  </b>
              
              <Link to={`/modificar_usuario/${item.id}`}>
                <button>Modificar</button>
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/crear_usuario">
          <button>Crear</button>
        </Link>
      </div>
    }
    </>
  );
};