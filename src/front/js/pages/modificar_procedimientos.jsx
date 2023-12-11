import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";

export const Modificar_procedimientos = () => {
    const { theid } = useParams();
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    if(store.procedimientos.length == 0 || !store.auth){
        return <Navigate to="/" />;
    }

    const [subcategoriesList, setSubcategoriesList] = useState([]);

    const procedimientos = store.procedimientos.find(procedimientos => procedimientos.id == theid);
    const [name, setName] = useState(procedimientos.name || "");
    const [photo, setPhoto] = useState(procedimientos.photo || "");
    const [descripcion, setDescripcion] = useState(procedimientos.descripcion || "");
    const [video, setVideo] = useState(procedimientos.video || "");
    const [enlace, setEnlace] = useState(procedimientos.link || "");
    const [category, setCategory] = useState(procedimientos.category || "");
    const [subCategory, setSubcategory] = useState(procedimientos.subCategory || "");

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

    const updateProcedimiento = async (e) => {
        e.preventDefault();
        const objeto = {
            name: name,
            video: video,
            descripcion: descripcion,
            photo: photo,
            enlace: enlace,
            category: category,
            subCategory: subCategory
        }

        const res = await actions.modificar_procedimientos(theid, objeto);
        if (res && store.rol == "Administrador") {
            navigate('/procedimientos');
        } else if (res && store.rol != "Administrador") {
            navigate('/');
        } else {
            alert("Error al actualizar el procedimiento");
        }
    }

    const updateCategories = (e, category) => {
        let option = "";
        if(category == null){
            e.preventDefault();
            setCategory(e.target.value)
            option = e.target.value;
        }else{
            setCategory(category)
            option = category;
        }

        let subCategoriesListFill = [];

        if(option == "Cirugías"){
            subCategoriesListFill = ["Cirugía Laparoscopica","Cirugía Lavado quirúrgico abdominal","Cirugía apendicectomía"]
        }else if(option == "Curaciones"){
            subCategoriesListFill = ["Curación herida simple","Curación herida quirúrgica","Curación Ulcera por presión Grado 1"]
        }else if(option == "Procedimientos Invasivos"){
            subCategoriesListFill = ["Canalización Vía periféricas","Canalización sonda vesical","Canalización sonda naso-gástrica"]
        }else if(option == "Categorías Varios"){
            subCategoriesListFill = ["Cambios de posición","Alimentación por sonda","Administración de medicamentos"]
        }

        setSubcategoriesList(subCategoriesListFill);
    }

    useEffect(() => {
        if(category != ""){
            updateCategories(null, category);
        }
      }, []);

    return (
        <>
            {store.auth == false ? (
                <Navigate to="/" />
            ) : (
                <div className="container w-100 mt-2">
                    <h2 className="display-5">Crear Procedimiento</h2>
                    <div className="card d-flex gap-2 w-100 col-md-8 col-sm-12">
                        <div className="card-body">
                            <form onSubmit={updateProcedimiento} className="row">
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
                                    <select className="form-control" value={category} onChange={(e) => { updateCategories(e, null) }} id="categoria" required>
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
                                    <input className="form-control" type="file" onChange={handleImageUpload} accept="image/jpeg, image/png" />
                                </div>
                                <div className="mb-3 col-md-6 sol-sm-12">
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
            )}
        </>
    );
};