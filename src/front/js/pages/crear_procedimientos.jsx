import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Crear_procedimientos = () => {
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    const [subcategoriesList, setSubcategoriesList] = useState([]);

    const [name, setName] = useState("");
    const [video, setVideo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [photo, setPhoto] = useState(null);
    const [enlace, setEnlace] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [category, setCategory] = useState("");
    const [subCategory, setSubcategory] = useState("");
    const [error, setError] = useState('');

    const handleArchivoChange = (event) => {
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
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('idUser', store.id);

        const res = await actions.crear_procedimientos(formData);
        if (res) {
            navigate('/procedimientos');
        } else {
            alert("Error al insertar el procedimiento");
        }
    }

    const updateCategories = (e) => {
        e.preventDefault();
        setCategory(e.target.value)

        let subCategoriesListFill = [];

        if(e.target.value == "Cirugías"){
            subCategoriesListFill = ["Cirugía Laparoscopica","Cirugía Lavado quirúrgico abdominal","Cirugía apendicectomía"]
        }else if(e.target.value == "Curaciones"){
            subCategoriesListFill = ["Curación herida simple","Curación herida quirúrgica","Curación Ulcera por presión Grado 1"]
        }else if(e.target.value == "Procedimientos Invasivos"){
            subCategoriesListFill = ["Canalización Vía periféricas","Canalización sonda vesical","Canalización sonda naso-gástrica"]
        }else if(e.target.value == "Categorías Varios"){
            subCategoriesListFill = ["Cambios de posición","Alimentación por sonda","Administración de medicamentos"]
        }

        setSubcategoriesList(subCategoriesListFill);
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
                            <label htmlFor="categoria" className="form-label">Categoría</label>
                            <select className="form-control" value={category} onChange={(e) => { updateCategories(e) }} id="categoria" required>
                                <option selected disabled value="">Seleccione una Categoría</option>
                                <option value="Cirugías">Cirugías</option>
                                <option value="Curaciones">Curaciones</option>
                                <option value="Procedimientos Invasivos">Procedimientos Invasivos</option>
                                <option value="Categorías Varios">Categorías Varios</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6 sol-sm-12">
                            <label htmlFor="subCategoria" className="form-label">SubCategoría</label>
                            <select className="form-control" value={subCategory} onChange={(e) => { setSubcategory(e.target.value) }} id="subCategoria" required>
                                <option selected disabled value="">Seleccione una Subcategoría</option>
                                {subcategoriesList.map((subcategoria) => (
                                    <option key={subcategoria} value={subcategoria}>
                                        {subcategoria}
                                    </option>
                                ))}
                            </select>
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