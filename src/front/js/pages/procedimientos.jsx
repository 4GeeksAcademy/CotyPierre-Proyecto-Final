import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Procedimientos = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getProcedimientos();
      }, []);

      return (
        <div className="container">
              <ul>
        {store.procedimientos.map((item) => (
          <li key={item.id}>
            <b>
              {item.image} {item.name} {item.descripcion} {item.articulos} {item.video}
            </b>
            <Link to={`/modificar_procedimientos/${item.id}`}>
              <button>Modificar</button>
            </Link>
          </li>
        ))}
              </ul>
              <Link to="/crear_procedimientos">
                <button>Crear</button>
              </Link>
              
        </div>
      );
    };