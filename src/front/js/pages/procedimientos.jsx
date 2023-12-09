import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const Procedimientos = () => {
  const { store, actions } = useContext(Context);

  const [idToDelete, setidToDelete] = useState(-1);
  const [nameToDelete, setNameToDelete] = useState('');

  const cancelDeleteRef = useRef(null);

  const handlerDeleteProcedimiento = async () => {
    const res = await actions.delete_procedimiento(idToDelete);
    ;
    if (res) {
      actions.getProcedimientos();
    } else {
      alert("Error al eliminar el procedimiento");
    }
    if (cancelDeleteRef.current) {
      cancelDeleteRef.current.click();
    }
  }

  const descargarArchivo = async (id) => {
    const nuevaVentana = window.open(actions.apiDownloadArchivo(id));
  }

  useEffect(() => {
    actions.getProcedimientos();
  }, []);

  return (
    <>
      {store.auth == false ? (
        <Navigate to="/" />
      ) : (
        <div className="container mt-2">
          <Link to="/crear_procedimientos">
            <button className="btn btn-success">Crear</button>
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Subcategoría</th>
                <th>Descripción</th>
                <th>Video</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {store.procedimientos
              .filter((item) => {
                return store.rol === "Enfermero" ? item.idUser === store.id : true;
              })
              .map((item) => (
                <tr key={item.id}>
                  <td className="align-middle">
                    <img src={item.photo} style={{height:'100px', width:'auto'}} alt="N/A" />
                  </td>
                  <td className="align-middle">{item.name}</td>
                  <td className="align-middle">{item.category}</td>
                  <td className="align-middle">{item.subCategory}</td>
                  <td className="align-middle text-truncate" style={{maxWidth:"400px"}}>{item.descripcion}</td>
                  <td className="align-middle">{item.video}</td>
                  <td className="align-middle">
                    <Link to={`/modificar_procedimientos/${item.id}`}>
                      <button className=" m-1 btn"><i class="fa-solid fa-pen"></i></button>
                    </Link>
                    {item.archive && (
                      <button onClick={() => descargarArchivo(item.id)} className="m-1 btn"><i class="fa-solid fa-download"></i></button>
                    )}
                    <button onClick={() => { setNameToDelete(item.name); setidToDelete(item.id) }} className="btn m-1" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Eliminar Procedimiento</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ¿Está seguro de que desea eliminar el procedimiento {nameToDelete}?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref={cancelDeleteRef}>Cancelar</button>
                  <button type="button" class="btn btn-danger" onClick={handlerDeleteProcedimiento}>Confirmar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};