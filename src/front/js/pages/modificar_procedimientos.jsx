import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";

export const Modificar_procedimientos = () => {
    const { theid } = useParams();
    const { store, actions } = useContext(Context);

    const procedimientos = store.procedimientos.find(procedimientos => procedimientos.id == theid);
    const [name, setName] = useState(procedimientos.name || "");
    const [photo, setPhoto] = useState(procedimientos.photo || "");
    const [descripcion, setDescripcion] = useState(procedimientos.descripcion || "");
    const [video, setVideo] = useState(procedimientos.video || "");
    const [enlace, setEnlace] = useState(procedimientos.link || "");

    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhoto(event.target.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const updateProcedimiento = async (e) => {
        e.preventDefault();
        const objeto = {
            name: name,
            video: video,
            descripcion: descripcion,
            photo: photo,
            enlace: enlace
        }

        const res = await actions.modificar_procedimientos(theid, objeto);
        debugger;
        if (res && store.rol == "Administrador") {
            navigate('/procedimientos');
        } else if (res && store.rol != "Administrador") {
            navigate('/');
        } else {
            alert("Error al actualizar el procedimiento");
        }
    }

    return (
        <>
            {store.auth == false ? (
                <Navigate to="/" />
            ) : (
                <div className="container w-100 mt-2">
                    <h2 className="display-5">Crear Procedimiento</h2>
                    <div className="card d-flex gap-2 w-100 col-md-8 col-sm-12">
                        <div className="card-body">
                            <form onSubmit={updateProcedimiento} className="row">
                                <div className="mb-3 col-md-6 sol-sm-12">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input maxLength={80} type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="mb-3 col-md-6 sol-sm-12">
                                    <label htmlFor="enlace" className="form-label">Enlace</label>
                                    <input type="text" className="form-control" id="enlace" value={enlace} onChange={(e) => setEnlace(e.target.value)} />
                                </div>
                                <div className="mb-3 col-md-6 sol-sm-12">
                                    <label htmlFor="image" className="form-label">Imagen</label>
                                    <input className="form-control" type="file" onChange={handleImageUpload} accept="image/jpeg, image/png" />
                                </div>
                                <div className="mb-3 col-md-6 sol-sm-12">
                                    <label htmlFor="video" className="form-label">Video (Enlace de Youtube)</label>
                                    <input type="text" className="form-control" id="video" value={video} onChange={(e) => setVideo(e.target.value)} />
                                </div>
                                <div className="mb-3 col-12">
                                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                                    <textarea maxLength={500} style={{ resize: 'none' }} className="form-control" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} cols="30" rows="5" required></textarea>
                                </div>
                                <div className="w-100 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-success w-25">Guardar Cambios</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};