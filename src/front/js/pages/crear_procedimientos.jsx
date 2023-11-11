import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crear_procedimientos = () => {
    const { store, actions } = useContext(Context);

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [articulos, setArticulos] = useState("");
    const [video, setVideo] = useState("");

    //const isIdUnique = !(store.catalogo.some(catalogo => catalogo.id == id))
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
            <div className="card" style={{width: "18rem"}}>
            <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
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
                    <button disabled={!isFormValid} onClick={() => actions.crear_procedimientos(objeto)}>Guardar Cambios</button>
                </Link>
                </form>
                </div>
            </div>
            
        </div>
    );
};