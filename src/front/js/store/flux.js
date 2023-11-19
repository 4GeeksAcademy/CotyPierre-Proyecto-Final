const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
