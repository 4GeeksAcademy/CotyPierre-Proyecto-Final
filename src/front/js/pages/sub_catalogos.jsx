import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const SubCatalogo = () => {
    const { store, actions } = useContext(Context);

    const { option } = useParams();
    const [cirugia, setCirugia] = useState(false);
    const [curaciones, setCuraciones] = useState(false);
    const [procedimientos, setProcedimientos] = useState(false);
    const [varios, setVarios] = useState(false);

    useEffect(() => {
        if (option === 'cirugia') {
            setCirugia(true);
        } else if (option === 'curaciones') {
            setCuraciones(true);
        } else if (option === 'procedimientos') {
            setProcedimientos(true);
        } else if (option === 'varios') {
            setVarios(true);
        }
    }, [option]);


    return (
        <div className="container d-flex gap-3 flex-wrap justify-content-center py-2">
            {cirugia && (
                <>
                    <Link to={"/procedimiento/0"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://cirugiamorelos.com/wp-content/uploads/2020/08/laparoscopia-1.jpg" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Cirugía Laparoscopica</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/1"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://c8.alamy.com/compes/e3npc9/explore-la-laparotomia-para-el-lavado-de-la-cavidad-abdominal-e3npc9.jpg" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Cirugía Lavado quirúrgico abdominal</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/2"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://statics-diariomedico.uecdn.es/cms/styles/landscape_xl/azblob/2021-10/apendice.jpg.webp?itok=h_bG_F6T" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Cirugía apendicectomía</h4>
                        </div>
                    </Link>
                </>
            )}
            {curaciones && (
                <>
                    <Link to={"/procedimiento/3"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://cath.cl/wp-content/uploads/2018/10/limpieza-curacin.jpg" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Curación herida simple</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/4"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://network.medchannel.org/public/ynblog/31/e6/02/2e14d_e4c6.jpg?c=e130" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Curación herida quirúrgica</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/5"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://i.ytimg.com/vi/Vcg100aEYC8/maxresdefault.jpg" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Curación Ulcera por presión Grado 1</h4>
                        </div>
                    </Link>
                </>
            )}
            {procedimientos && (
                <>
                    <Link to={"/procedimiento/6"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://femora.sergas.es/Coidados-das-vias-sondas-e-drenaxes/PublishingImages/68/V%C3%ADdeo%20HD.JPG" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Canalización Vía periféricas</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/7"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://encolombia.com/wp-content/uploads/2014/02/hospi-sondavesical-1.jpg" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Canalización sonda vesical</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/8"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://i0.wp.com/yoamoenfermeriablog.com/wp-content/uploads/2018/10/da160_nasogastrictubeholder_2013.jpg?fit=1600%2C1067&ssl=1" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Canalización sonda naso-gástrica</h4>
                        </div>
                    </Link>
                </>
            )}
            {varios && (
                <>
                    <Link to={"/procedimiento/9"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://www.itep.es/sites/itep/files/styles/blog/public/images/blog/AdobeStock_444701172-min.jpeg?itok=elVMj157" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Cambios de posición</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/10"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://dedicae.es/wp-content/uploads/2022/03/sonda1.jpg" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Alimentación por sonda</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/11"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="https://blog.clinicainternacional.com.pe/wp-content/uploads/2017/07/administracion-medicamentos.jpg" alt="Card image cap" />
                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Administración de medicamentos</h4>
                        </div>
                    </Link>
                </>
            )}
        </div>
    );
};
