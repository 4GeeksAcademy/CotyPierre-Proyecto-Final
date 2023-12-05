import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Crear_procedimientos = () => {
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [video, setVideo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [photo, setPhoto] = useState(null);
    const [enlace, setEnlace] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [error, setError] = useState('');

    const handleArchivoChange = (event) => {
        debugger;
        const selectedFile = event.target.files[0];
        const allowedTypes = ['application/pdf'];

        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setArchivo(selectedFile);
            setError('');
        } else {
            setArchivo(null);
            setError('Por favor, selecciona un archivo PDF.');
        }
    };

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

    const crearProcedimiento = async (e) => {
        e.preventDefault();
        if (error != "") {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('video', video);
        formData.append('descripcion', descripcion);
        formData.append('photo', photo);
        formData.append('enlace', enlace);
        formData.append('archivo', archivo);

        console.log(archivo);

        debugger;

        const res = await actions.crear_procedimientos(formData);
        if (res && store.rol == "Administrador") {
            navigate('/procedimientos');
        } else if (res && store.rol != "Administrador") {
            navigate('/');
        } else {
            alert("Error al insertar el procedimiento");
        }
    }

    return (
        <div className="container w-100 mt-2">
            <h2 className="display-5">Crear Procedimiento</h2>
            <div className="card d-flex gap-2 w-100 col-md-8 col-sm-12">
                <div className="card-body">
                    <form onSubmit={crearProcedimiento} className="row">
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
                            <input className="form-control" id="image" type="file" onChange={handleImageUpload} accept="image/jpeg, image/png" />
                        </div>
                        <div className="mb-3 col-md-6 sol-sm-12">
                            <label htmlFor="archivo" className="form-label">Archivo</label>
                            {error && <p className="text-danger">{error}</p>}
                            <input className="form-control" id="archivo" type="file" onChange={handleArchivoChange} />
                        </div>
                        <div className="mb-3 col-12">
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
    );
};