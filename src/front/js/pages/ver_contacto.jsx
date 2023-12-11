import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const VerContacto = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();

    const [idProcedimiento, setIdProcedimiento] = useState(theid);
    const [procedimiento, setProcedimiento] = useState(null);
    const [filter, setFilter] = useState("");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [adress, setAdress] = useState("");
    const [country, setCountry] = useState("");
    const [department, setDepartment] = useState("");
    const [photo, setPhoto] = useState(null);
    const [professionalGrade, setProfessionalGrade] = useState("");
    const [workplace, setWorkplace] = useState("");
    const [email, setEmail] = useState("");

    const descargarArchivo = async (id) => {
        const nuevaVentana = window.open(actions.apiDownloadArchivo(id));
    }

    useEffect(() => {
        const userFound = store.usuario.filter(item => item.id === Number(theid))[0];
        
        setName(userFound.name);
        setPhone(userFound.phone);
        setAdress(userFound.adress);
        setCountry(userFound.country);
        setDepartment(userFound.department);
        setPhoto(userFound.photo);
        setProfessionalGrade(userFound.professional_grade);
        setWorkplace(userFound.workplace);
        setEmail(userFound.email);
    }, []);

    return (
        <div className="container d-flex gap-3 flex-wrap justify-content-center py-2 w-100">
            <h1 className="display-2 text-primary">{name}</h1>
            <div className="row w-100">
                <div className="col-md-4 col-sm-12 my-1">
                    <img className="rounded" style={{ maxWidth: "100%", height: "auto" }} src={photo} alt="" />
                </div>
                <div className="col-md-8 col-sm-12 my-1 d-flex flex-column justify-content-center">
                    <h6 className="display-5 text-primary">Grado Profesional</h6>
                    <h5>{professionalGrade}</h5>
                    <hr />
                    <h6 className="display-5 text-primary">Trabajo</h6>
                    <h5>{workplace} - {country} - {department}</h5>
                    <h5>{adress}</h5>
                    <hr />
                    <h6 className="display-5 text-primary">Información de Contacto</h6>
                    <h5>Correo: {email}</h5>
                    <h5>Teléfono: {phone}</h5>
                </div>
            </div>
        </div>
    );
};
