import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crear_catalogo = () => {
    const { store, actions } = useContext(Context);

    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    //const isIdUnique = !(store.catalogo.some(catalogo => catalogo.id == id))
    const isFormValid = name && image;
    

    const objeto = {
        name: name,
        image: image,
       
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
                
                <Link to="/catalogo">
                    <button disabled={!isFormValid} onClick={() => actions.crear_catalogo(objeto)}>Guardar Cambios</button>
                </Link>
                </form>
                </div>
            </div>
            
        </div>
    );
};