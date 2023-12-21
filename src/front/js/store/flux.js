import { jwtDecode } from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false,
			rol: "",
			token: "",
			id: -1,
			usuario: [],
			procedimientos: [],
			catalogo: [],
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			postUser: (email, password) => {
				fetch(process.env.BACKEND_URL + "api/login", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
					.then(async (response) => {
						const res = await response.json();
						if (response.status == 200) {
							const decoded = jwtDecode(res.token);
							setStore({ auth: true, rol: decoded.rol, token: res.token, id: decoded.sub })
							return res;
						}else{
							alert(res.msg);
							return;
						}
					})
					.then((data) => {
						localStorage.setItem("token", data.token);
						localStorage.setItem("id", data.user_id);
					}).catch(err => {
						console.log(err);
					})
			},
			resetUser: () => {
				setStore({ auth: false, rol: "", token: "", id: -1 })
			},
			postRegister: async (
				name,
				phone,
				address,
				country,
				department,
				photo,
				rol,
				professionalGrade,
				workplace,
				email,
				password
			) => {
				const requestBody = {
					name: name,
					phone: phone,
					address: address,
					country: country,
					department: department,
					photo: photo,
					rol: rol,
					professionalGrade: professionalGrade,
					workplace: workplace,
					email: email,
					password: password
				};

				const response = await fetch(process.env.BACKEND_URL + "api/register", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(requestBody)
				})

				if (response.status == 500) {
					const body = await response.json();
					return body.msg;
				}

				const body = await response.json();
				return body.msg == "Usuario creado";
			},

			getUsuario: async () => {
				const store = getStore();
				const token = store.token;
				const requestOptions = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + 'api/usuario', requestOptions);
					if (!response.ok) {
						throw new Error('Error al obtener los usuarios');
					}
					const body = await response.json();
					console.log(body);
					setStore({ usuario: body });
				} catch (error) {
					console.error(error);
				}
			},

			postUsuario: (obj) => {
				fetch(process.env.BACKEND_URL + 'api/usuario', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
					.then((response) => response.json())
					.then((data) => console.log(data))
			},

			putUsuario: async (id, obj) => {
				const response = await fetch(process.env.BACKEND_URL + 'api/usuario/' + id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				
				return response.status != 200 ? false : await response.json();
			},

			deleteUsuario: async (id) => {
				const store = getStore();
				const decoded = jwtDecode(store.token);

				if (decoded.sub != id) {
					const response = await fetch(process.env.BACKEND_URL + 'api/usuario/' + id, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const body = await response.json();
					return body.message == "Usuario eliminado con éxito";
				} else {
					return false;
				}


			},

			getProcedimientos: async () => {
				const response = await fetch(process.env.BACKEND_URL + 'api/procedimientos', {

				});
				const body = await response.json();
				setStore({ procedimientos: body })
				//console.log(categorias)

			},

			crear_procedimientos: async (formData) => {
				const store = getStore();
				const response = await fetch(process.env.BACKEND_URL + "api/procedimientos", {
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${store.token}`
					}
				});
				return response.status != 200 ? false : await response.json();
			},

			modificar_procedimientos: async (id, obj) => {
				const store = getStore();

				const response = await fetch(process.env.BACKEND_URL + 'api/procedimientos/' + id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${store.token}`
					},
					body: JSON.stringify(obj)
				});

				return response.status != 200 ? false : await response.json();
			},

			delete_procedimiento: async (id) => {
				const store = getStore();

				const response = await fetch(process.env.BACKEND_URL + 'api/procedimientos/' + id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${store.token}`
					},
				});
				return response.status != 200 ? false : await response.json();
			},

			apiDownloadArchivo: (id) => {
				return process.env.BACKEND_URL + `api/procedimientos/${id}/descargar`;
			},

			getCatalogo: async () => {

				const response = await fetch(process.env.BACKEND_URL + 'api/catalogo')
				const body = await response.json();
				setStore({ catalogo: body })
				//console.log(categorias)

			},

			crear_catalogo: (obj) => {
				fetch(process.env.BACKEND_URL + "api/catalogo", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
					.then((response) => response.json())
					.then((data) => console.log(data))
			},

			modificar_catalogo: (id, obj) => {
				fetch(process.env.BACKEND_URL + 'api/catalogo' + id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
					.then((response) => response.json())
					.then((data) => console.log(data));
			},

			delete: (id) => {
				fetch(process.env.BACKEND_URL + 'api/catalogo' + id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
				}).then((response) => response.json())
					.then((data) => console.log(data))
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getImagesHome: async (search) => {
				try{
					//API de terceros para consultar imagenes de enfermería
					const url = `https://api.unsplash.com/search/photos?query=${search}&client_id=9WGUXXAL9igkhan6PAylO6h4diEupnQ3COyXQu-Aidg`;
					const res = await fetch(url);
					const data = await res.json();

					return res.status != 200 ? false : data;


				}catch(err){
					console.log(err);
				}
			}
		}
	};
};

export default getState;
