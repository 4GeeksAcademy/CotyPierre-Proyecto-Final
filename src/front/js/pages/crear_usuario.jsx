import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const Crear_usuario = () => {
    const { store, actions } = useContext(Context);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] =useState("");
    const [degree, setDegree] = useState("");
    const [description, setDescription] = useState("");
    const [num_contact, setNumContacto] = useState("");

    const isIdUnique = !(store.usuario.some(usuario => usuario.id == id))
    const isFormValid = name && url_img && degree && description && num_contact && isIdUnique && id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const temp = await actions.upload_img(image);
            console.log(temp)
            const url_img = temp[0];
            const idu_img = temp[1]

            const usuario = {
                id : id,
                name: name,
                password: password,
                degree: degree,
                description: description,
                url_img: url_img,
                idu_img: idu_img,
                num_contact: num_contact
            };

            await actions.postUsuario (usuario);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <form>
                    <img width="100" src={image ? URL.createObjectURL(image) : null } alt="Imagen Seleccionada" />

                    <div className="mb-3">
                        <label htmlFor="img" className="form-label">Imagen</label>
                        <input
                            id="img"
                            type="file"
                            accept="image/*"
                            onChange={(e)=> {setImage(e.target.files[0])}}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">Id</label>
                        <input type="text" className="form-control" id="Id" value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                    {isIdUnique ? null : <p style={{"color": "red"}}>"Id ya existe"</p>}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="degree" className="form-label">Degree</label>
                        <input type="text" className="form-control" id="tipo" value={degree} onChange={(e) => setDegree(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Descripcion" className="form-label">Descripcion</label>
                        <input type="text" className="form-control" id="Descripcion" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="num_contacto" className="form-label">Numeero de Contacto</label>
                        <input type="text" className="form-control" id="num_contacto" value={num_contact} onChange={(e) => setNumContacto(e.target.value)} />
                    </div>
                    
                    <Link to="/usuario">
                        <button disabled={!isFormValid} onClick={handleSubmit}>Guardar Cambios</button>
                    </Link>
                </form>
            </div>
        </div>
    );
};