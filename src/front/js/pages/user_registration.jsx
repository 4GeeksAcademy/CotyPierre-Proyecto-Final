import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const User_registration = () => {
    const { store, actions } = useContext(Context);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [adress, setAdress] = useState("");
    const [country, setCountry] = useState("");
    const [department, setDepartment] = useState("");
    const [photo, setPhoto] = useState(null);
    const [rol, setRol] = useState("");
    const [professionalGrade, setProfessionalGrade] = useState("");
    const [workplace, setWorkplace] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

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

    const onlyNumbers = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setPhone(e.target.value);
        }
    }

    const createAccount = (e) => {
        e.preventDefault();
        if (password != confirmPass) {
            alert("Las contraseñas no coinciden");
            return;
        }

        actions.postRegister(name, phone, adress, country, department, photo, rol, professionalGrade,
            workplace, email, password)
    }

    return (
        <form onSubmit={createAccount} className="w-100 m-0 h-100 d-flex align-items-center">
            <div className="m-3 row">
                <div className="col-md-4 bg-primary rounded d-flex justify-content-center align-items-center">
                    <h1 className="display-4 text-light text-center">Crear Usuario</h1>
                </div>
                <div className="col-md-8 p-3 h-100 row">
                    <div className="mb-3 col-md-6 col-sm-12">
                        <label htmlFor="inputName1" className="form-label">Nombre</label>
                        <input required maxLength="30" type="text" className="form-control" id="inputName1" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3 col-md-6 col-sm-12">
                        <label htmlFor="inputName1" className="form-label">Teléfono</label>
                        <input maxLength="12" type="text" className="form-control" id="inputName1" value={phone} onChange={(e) => { onlyNumbers(e) }} required />
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
                        <input className="form-control" type="file" onChange={handleImageUpload} accept="image/jpeg, image/png" />
                    </div>
                    <div className="mb-3 col-md-6 col-sm-12">
                        <label htmlFor="inputName1" className="form-label">Rol</label>
                        <select
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            className="form-control"
                            required
                        >
                            <option value="" disabled selected>
                                Seleccione un rol
                            </option>
                            <option value={"Enfermero"}>Enfermero</option>
                            <option value={"Administrador"}>Administrador</option>
                        </select>

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
                        <input maxLength="120" type="email" className="form-control" id="inputName1" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3 col-md-6 col-sm-12">
                        <label htmlFor="inputName1" className="form-label">Contraseña</label>
                        <input maxLength="80" type="password" className="form-control" id="inputName1" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3 col-md-6 col-sm-12">
                        <label htmlFor="inputName1" className="form-label">Confirmar Contraseña</label>
                        <input maxLength="80" type="password" className="form-control" id="inputName1" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required />
                    </div>
                    <div className="my-3 col-12 d-flex justify-content-center">
                            <Link className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to={"/user_login"}>¿Tiene una cuenta? Inicie sesión aquí</Link>
                        </div>
                    <div className="col-12 d-flex justify-content-center w-100">
                        <button type="submit" className="btn btn-primary">Continuar</button>
                    </div>

                </div>
            </div>
        </form>
    )
}