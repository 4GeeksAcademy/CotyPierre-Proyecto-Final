import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const User_login = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form className="w-100 m-0">
            <div className="m-3 row" style={{ height: '500px' }}>
                <div className="col-md-4 bg-primary rounded d-flex justify-content-center align-items-center">
                    <h1 className="display-4 text-light text-center">Gestor de procedimientos</h1>
                </div>
                <div className="col-md-8 p-3 h-100">
                    <div className="card p-3 d-flex flex-column align-items-center justify-content-center h-100">
                        <div className="mb-3 w-50">
                            <label htmlFor="inputName1" className="form-label">Email</label>
                            <input type="text" className="form-control" id="inputName1" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3 w-50">
                            <label htmlFor="inputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="w-50">
                            <button className="btn btn-primary w-100" onClick={(e) => { e.preventDefault(); actions.postUser(email, password) }}>Continuar</button>
                        </div>
                        <div className="mt-4">
                            <Link className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to={"/user_registration"}>¿No tiene una cuenta?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}