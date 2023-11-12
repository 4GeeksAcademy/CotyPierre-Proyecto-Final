import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, Navigate } from "react-router-dom";

export const Modificar_usuario = () => {
    const { theid } = useParams();
    const { store, actions } = useContext(Context);

    const usuario = store.usuario.find(usuario => usuario.id == theid);
    const [name, setName] = useState( usuario.name || "");
    const [image, setImage] =useState(usuario.url_img || "");
    const [idu_img, setIdu] = useState(usuario.idu_img || "");
    const [degree, setDegree] = useState(usuario.degree || "");
    const [description, setDescription] = useState(usuario.description || "");
    const [num_contact, setNumContacto] = useState(usuario.num_contact || "");
    const [file, setFile] = useState("");

    const isFormValid = name && image && degree && num_contact;

    const guardar = async (e) => {
        e.preventDefault();
        try {
            let url_img;
            if (file) {
                const temp = await actions.upload_img(file);
                url_img = temp[0];
                setIdu(temp[1])
            }else url_img = image

            const objeto = {
                name: name,
                degree: degree,
                description: description,
                url_img: url_img,
                idu_img: idu_img,
                num_contact: num_contact
            };
            await actions.putUsuario(theid, objeto);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        { store.auth == false ? <Navigate to="/"/> :
            <div>
                <form>
                    <img width="100" src={file ? URL.createObjectURL(file) : image} alt="Imagen Seleccionada" />

                    <div className="mb-3">
                        <label htmlFor="img" className="form-label">Imagen</label>
                        <input
                            id="img"
                            type="file"
                            accept="image/*"
                            onChange={(e)=> {setFile(e.target.files[0])}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="degree" className="form-label">Degree</label>
                        <input type="text" className="form-control" id="tipo" value={degree} onChange={(e) => setDegree(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descripcion</label>
                        <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="num_contact" className="form-label">Numero de Contacto</label>
                        <input type="text" className="form-control" id="num_contact" value={num_contact} onChange={(e) => setNumContacto(e.target.value)} />
                    </div>
                    
                    <Link to="/usuario">
                        <button disabled={!isFormValid} onClick={guardar}>Guardar Cambios</button>
                    </Link>
                    <Link to="/usuario">
                        <button onClick={() => actions.deleteUsuario(theid)}>Delete </button>
                    </Link>
                </form>
            </div>
        }
        </>
    );
};