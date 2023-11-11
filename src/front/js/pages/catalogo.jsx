import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Catalogo = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCatalogo();
      }, []);

      return (
        <div className="container">
              <ul>
        {store.catalogo.map((item) => (
          <li key={item.id}>
            <b>
              {item.name} {item.image}
            </b>
            <Link to={`/modificar_catalogo/${item.id}`}>
              <button>Modificar</button>
            </Link>
          </li>
        ))}
              </ul>
              <Link to="/crear_catalogo">
                <button>Crear</button>
              </Link>
              
        </div>
      );
    };