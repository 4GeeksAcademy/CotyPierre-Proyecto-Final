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
      {store.auth === false ? (
        <Navigate to="/" />
      ) : (
        <div className="container">
          <Link to="/crear_usuario">
            <button>Crear</button>
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {store.usuario.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    {item.photo && ( // Check if photo exists
                      <img
                        src={`${item.photo}`} // Assuming the photo is in base64 format
                        alt="User"
                        style={{ width: '50px', height: 'auto' }}
                      />
                    )}
                  </td>
                  <td>
                    <Link to={`/modificar_usuario/${item.id}`}>
                      <button>Modificar</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

};