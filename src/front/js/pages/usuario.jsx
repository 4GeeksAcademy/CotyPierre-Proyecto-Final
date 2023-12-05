import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const Usuario = () => {
  const { store, actions } = useContext(Context);

  const [idToDelete, setidToDelete] = useState(-1);
  const [nameToDelete, setNameToDelete] = useState('');

  const cancelDeleteRef = useRef(null);

  useEffect(() => {
    actions.getUsuario();
  }, []);

  const handlerDeleteUser = async () => {
    const res = await actions.deleteUsuario(idToDelete);
    if(res){
      actions.getUsuario();
    }else{
      alert("Error al eliminar el usuario");
    }
    if (cancelDeleteRef.current) {
      cancelDeleteRef.current.click();
    }
  }

  return (
    <>
      {store.auth === false ? (
        <Navigate to="/" />
      ) : (
        <div className="container mt-2">
          <Link to="/user_registration">
            <button className="btn btn-primary">Crear</button>
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Rol</th>
                <th>Nombre</th>
                <th>Pais</th>
                <th>Departamento</th>
                <th>Grado Profesional</th>
                <th>Email</th>
                <th>Imagen</th>
                <th colSpan={2}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {store.usuario.map((item) => (
                <tr key={item.id}>
                  <td className="align-middle">{item.id}</td>
                  <td className="align-middle">{item.rol}</td>
                  <td className="align-middle">{item.name}</td>
                  <td className="align-middle">{item.country}</td>
                  <td className="align-middle">{item.department}</td>
                  <td className="align-middle">{item.professional_grade}</td>
                  <td className="align-middle">{item.email}</td>
                  <td className="align-middle">
                    {item.photo && ( 
                      <img
                        src={`${item.photo}`} 
                        alt="User"
                        style={{ width: '50px', height: 'auto' }}
                      />
                    )}
                  </td>
                  <td className="align-middle">
                    <Link to={`/modificar_usuario/${item.id}`}>
                      <button className="btn btn-warning">Modificar</button>
                    </Link>
                    <button onClick={() => {setNameToDelete(item.name); setidToDelete(item.id)}} className="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Eliminar Usuario</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ¿Está seguro de que desea eliminar al usuario {nameToDelete}?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref={cancelDeleteRef}>Cancelar</button>
                  <button type="button" class="btn btn-danger" onClick={handlerDeleteUser}>Confirmar</button>
                </div>
              </div>
            </div>
          </div>


        </div>
      )}
    </>
  );

};