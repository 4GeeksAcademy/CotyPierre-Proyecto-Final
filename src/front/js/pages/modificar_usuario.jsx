import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, Navigate } from "react-router-dom";

export const Modificar_usuario = () => {
    const { theid } = useParams();
    const { store, actions } = useContext(Context);

    const usuario = store.usuario.find(usuario => usuario.id == theid);

    const [name, setName] = useState(usuario.name || "");
    const [phone, setPhone] = useState(usuario.phone || "");
    const [adress, setAdress] = useState(usuario.adress || "");
    const [country, setCountry] = useState(usuario.country || "");
    const [department, setDepartment] = useState(usuario.department || "");
    const [photo, setPhoto] = useState(usuario.photo || null);
    const [rol, setRol] = useState(usuario.rol || "");
    const [professionalGrade, setProfessionalGrade] = useState(usuario.professional_grade || "");
    const [workplace, setWorkplace] = useState(usuario.workplace || "");
    const [email, setEmail] = useState(usuario.email || "");
    const [isActive, setIsActive] = useState(usuario.is_active || "");

    const inputFileRef = useRef(null);

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

    const handleCheckboxChange = (event) => {
        setIsActive(event.target.checked);
    };

    const onlyNumbers = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setPhone(e.target.value);
        }
    }

    const guardar = async (e) => {
        e.preventDefault();
        const objeto = {
            name: name,
            phone: phone,
            adress: adress,
            country: country,
            department: department,
            photo: photo,
            professional_grade: professionalGrade,
            workplace: workplace,
            is_active: isActive
        };

        const res = await actions.putUsuario(theid, objeto);
        console.log(res);
        ;
    }

    return (
        <>
            {store.auth == false ? <Navigate to="/" /> :
                <form onSubmit={guardar} className="w-100 m-0 h-100 d-flex align-items-center">
                    <div className="m-3 row">
                        <div className="col-md-4 bg-primary rounded d-flex flex-column gap-2 justify-content-center align-items-center">
                            <h1 className="display-4 text-light text-center">Modificar Usuario</h1>
                            <img style={{ width: '150px', height: 'auto' }} src={photo}></img>
                        </div>

                        <div className="col-md-8 p-3 h-100 row">
                            <div className="mb-3 col-md-6 col-sm-12">
                                <label htmlFor="inputName1" className="form-label">Nombre</label>
                                <input maxLength="30" type="text" className="form-control" id="inputName1" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3 col-md-6 col-sm-12">
                                <label htmlFor="inputName1" className="form-label">Teléfono</label>
                                <input maxLength="12" type="text" className="form-control" id="inputName1" value={phone} onChange={(e) => { onlyNumbers(e) }} required readOnly />
                            </div>
                            <div className="mb-3 col-md-6 col-sm-12">
                                <label htmlFor="inputName1" className="form-label">Dirección</label>
                                <input maxLength="120" type="text" className="form-control" id="inputName1" value={adress} onChange={(e) => setAdress(e.target.value)} required />
                            </div>
                            <div className="mb-3 col-md-6 col-sm-12">
                                <label htmlFor="inputName1" className="form-label">País</label>
                                <input maxLength="50" type="text" className="form-control" id="inputName1" value={country} onChange={(e) => setCountry(e.target.value)} required />
                            </div>
                            <div className="mb-3 col-md-6 col-sm-12">
                                <label htmlFor="inputName1" className="form-label">Departamento</label>
                                <input maxLength="50" type="text" className="form-control" id="inputName1" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                            </div>
                            <div className="mb-3 col-md-6 col-sm-12">
                                <label htmlFor="inputName1" className="form-label">Imagen</label>
                                <input ref={inputFileRef} className="form-control" type="file" onChange={handleImageUpload} accept="image/jpeg, image/png" />
                            </div>
                            <div className="mb-3 col-md-6 col-sm-12">
                                <label htmlFor="inputName1" className="form-label">Rol</label>
                                <input maxLength="30" type="text" className="form-control" id="inputName1" value={rol} required readOnly />

                            </div>
                            <div className="mb-3 col-md-6 col-sm-12">
                                <label htmlFor="inputName1" className="form-label">Grado Profesional</label>
                                <input maxLength="30" type="text" className="form-control" id="inputName1" value={professionalGrade} onChange={(e) => setProfessionalGrade(e.target.value)} required />
                            </div>
                            <div className="mb-3 col-md-6 col-sm-12">
                                <label htmlFor="inputName1" className="form-label">Lugar de Trabajo</label>
                                <input maxLength="50" type="text" className="form-control" id="inputName1" value={workplace} onChange={(e) => setWorkplace(e.target.value)} required />
                            </div>
                            <div className="mb-3 col-md-6 col-sm-12">
                                <label htmlFor="inputName1" className="form-label">Correo</label>
                                <input maxLength="120" type="email" className="form-control" id="inputName1" value={email} onChange={(e) => setEmail(e.target.value)} required readOnly />
                            </div>
                            <div className="mb-3 col-md-6 col-sm-12">
                                <input className="form-check-input" type="checkbox" id="flexCheckChecked"
                                    checked={isActive}
                                    onChange={handleCheckboxChange} />
                                <label className="form-check-label ml-2" for="flexCheckChecked">
                                    Activo
                                </label>
                            </div>

                            <div className="col-12 d-flex justify-content-center w-100">
                                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                            </div>

                        </div>
                    </div>
                </form>
            }
        </>
    );
};