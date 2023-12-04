import { jwtDecode } from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false,
			rol: "",
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
			// Use getActions to call a function within a fuction

			postUser: (email,password) => {
				fetch(process.env.BACKEND_URL + "api/login", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email : email,
						password: password
					})
				})
				.then(async(response)=> {
					if (response.status == 200){						
						const res = await response.json();
						console.log(res);

						const decoded = jwtDecode(res.token);

						setStore({ auth : true, rol: decoded.rol})
						const store = getStore();
						console.log(store);

						return res;
					}

					if (response.status == 401){
						alert("Credenciales incorrectas");
						return;
					}

				})
				.then((data)=> {
					localStorage.setItem("token",data.token);
					localStorage.setItem("id",data.user_id);
				}).catch(err => {
					console.log(err);
				})
			},
			postRegister: (
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
			  
				fetch(process.env.BACKEND_URL + "api/register", {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/json'
				  },
				  body: JSON.stringify(requestBody)
				})
				.then((response)=> response.json())
				.then((data)=> {
					if(data.msg == "Usuario creado"){
						alert("Usuario creado");
						window.location.href = "/user_login"
					}else{
						alert(`Error al crear el usuario ${email}`);
					}
				})
			  },		  
			
		getUsuario: async() => {
				const response = await fetch(process.env.BACKEND_URL + 'api/usuario')
				const body = await response.json();
				setStore({usuario: body})
			},

		postUsuario : (obj) => {
			fetch(process.env.BACKEND_URL + 'api/usuario', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(obj)
			})
			.then((response)=> response.json())
			.then((data)=> console.log(data))
		},

		putUsuario : (id,obj) => {
			fetch(process.env.BACKEND_URL + 'api/usuario/'+id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(obj)
			})
			.then((response)=>response.json())
			.then((data)=> console.log(data));
		},

		deleteUsuario : (id) => {
			fetch(process.env.BACKEND_URL + 'api/usuario/'+id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => response.json())
			.then((data) => console.log(data))
		},

			getProcedimientos: async() => {
				
				const response = await fetch(process.env.BACKEND_URL + 'api/procedimientos')
				const body = await response.json();
				setStore({procedimientos: body})
				//console.log(categorias)

			},

			crear_procedimientos : (obj) => {
				fetch(process.env.BACKEND_URL + "api/procedimientos", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data))
			},

			modificar_procedimientos : (id,obj) => {
				fetch(process.env.BACKEND_URL + 'api/procedimientos'+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=>response.json())
				.then((data)=> console.log(data));
			},

			delete : (id) => {
				fetch(process.env.BACKEND_URL + 'api/procedimientos'+id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
				}).then((response) => response.json())
				.then((data) => console.log(data))
			},

			getCatalogo: async() => {
				
				const response = await fetch(process.env.BACKEND_URL + 'api/catalogo')
				const body = await response.json();
				setStore({catalogo: body})
				//console.log(categorias)

			},

			crear_catalogo : (obj) => {
				fetch(process.env.BACKEND_URL + "api/catalogo", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data))
			},

			modificar_catalogo : (id,obj) => {
				fetch(process.env.BACKEND_URL + 'api/catalogo'+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=>response.json())
				.then((data)=> console.log(data));
			},

			delete : (id) => {
				fetch(process.env.BACKEND_URL + 'api/catalogo'+id, {
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
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
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
			}
		}
	};
};

export default getState;
