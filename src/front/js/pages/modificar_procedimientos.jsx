import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const Modificar_procedimientos = () => {
    const { theid } = useParams();
    const { store, actions } = useContext(Context);

    const procedimientos = store.procedimientos.find(procedimientos => procedimientos.id == theid);
    const [name, setName] = useState(procedimientos.name || "");
    const [image, setImage] = useState(procedimientos.image || "");
    const [descripcion, setDescripcion] = useState(procedimientos.descripcion || "");
    const [articulos, setArticulos] = useState(procedimientos.articulos || "");
    const [video, setVideo] = useState(procedimientos.video || "");
   
    const isFormValid = name && image && descripcion && articulos && video ;

    const objeto = {
        name: name,
        image: image,
        descripcion: descripcion,
        articulos: articulos,
        video: video,
       
    };

    return (
        <div>
             <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="text" className="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripcion</label>
                    <input type="text" className="form-control" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="articulos" className="form-label">Articulos</label>
                    <input type="text" className="form-control" id="articulos" value={articulos} onChange={(e) => setArticulos(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="video" className="form-label">Video</label>
                    <input type="text" className="form-control" id="video" value={video} onChange={(e) => setVideo(e.target.value)} />
                </div>
                
                
                <Link to="/procedimientos">
                    <button disabled={!isFormValid} onClick={() => actions.modificar_procedimientos(theid, objeto)}>Guardar Cambios</button>
                </Link>
                <Link to="/procedimientos">
                    <button onClick={() => actions.delete(theid)}>Delete </button>
                </Link>
            </form>
        </div>
    );
};