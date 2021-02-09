// Un fetch recibe dos parametros,
// uno obligatorio y uno optativo

// El parametro obligatorio es un string que representa una URL

// Si no pongo un segundo parametro JS asume que quiero hacer un GET

// GET
// Traerme informacion para que yo pueda leerla

const obtenerUsuariosyHacerHTML = () => {
	fetch('https://601da02bbe5f340017a19d60.mockapi.io/users')
		.then(res => res.json())
		.then(data => {
			const lista = document.querySelector('ul');

			lista.innerHTML = ''
			data.map(usuario => {
				lista.innerHTML += `<li>
		${usuario.fullname}
		<button class="delete-boton" data-userid=${usuario.id}>Borrar</button>
		<button class="formulario-boton" data-fullname=${usuario.fullname} data-phone=${usuario.phone} 
		 data-email=${usuario.email} data-address=${usuario.address}>Modificar</button>
		</li>
		`;
			})

			const listaDeBotones = document.querySelectorAll('.delete-boton');
			let formularioBotones = document.querySelectorAll(".formulario-boton")
			let seccionModificar = document.querySelector(".seccion-modificar")
			formularioBotones.forEach(formularioBoton => {
				formularioBoton.onclick = () => {
					console.log("has hecho click")
					seccionModificar.innerHTML += `
		 			 <form class="modificar">
		 			 <input type="text" placeholder="Nombre completo" name="fullname" id="fullname2" value="${formularioBoton.dataset.fullname}">
		  			<input type="email" placeholder="Email" name="email" id="email2" value="${formularioBoton.dataset.email}">
		 			 <input type="text" placeholder="Direccion" name="address" id="address2" value="${formularioBoton.dataset.address}">
		 			 <input type="text" placeholder="Telefono" name="phone" id="phone2" value="${formularioBoton.dataset.phone}">
					  <input type="submit" value="Modificar usuario">
						</form>`;



					let formularioModificar = document.querySelector(".modificar")
					formularioModificar.onsubmit = (e) => {
						e.preventDefault()

						let fullname = document.querySelector("#fullname2").value
						let address = document.querySelector("#address2").value
						let phone = document.querySelector("#phone2").value
						let email = document.querySelector("#email2").value
						// PUT
						 let id2 = formularioBoton.dataset.userid;

							fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id2}`, {
							method: 'put',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								fullname: fullname,
								addres: address,
								phone: phone,
								email: email
							}),
						})
							.then(res => res.json())
							.then(data => obtenerUsuariosyHacerHTML())
					}
				}
			})

			//  El formulario debe estar pre completado con los datos del usuario a mofificarse.
			//  Al enviarse se hace un PUT a la ruta /users/${id}, y la lista se modifica para incluir al usuario actualizado.


			// tengo que usar forEach, en lugar de map, porque listaDeBotones es una lista de nodos
			// de HTML, que no se puede recorrer con map (pero si con forEach)
			listaDeBotones.forEach(boton => {
				boton.onclick = () => {
					const id = boton.dataset.userid;

					// DELETE
					// Borra informacion de la API
					fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
						method: 'delete',
					})
						.then(res => res.json())
						.then(usuarioBorrado => {

							// funcion recursiva (se llama a si misma, para hacer de nuevo el HTML)
							obtenerUsuariosyHacerHTML()
						});
				};
			});
		});
};

obtenerUsuariosyHacerHTML();

const formulario = document.querySelector(".agregar")

formulario.onsubmit = (e) => {
	e.preventDefault()

	const fullname = document.querySelector("#fullname").value
	const address = document.querySelector("#address").value
	const phone = document.querySelector("#phone").value
	const email = document.querySelector("#email").value
	// POST
	fetch('https://601da02bbe5f340017a19d60.mockapi.io/users', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			fullname: fullname,
			addres: address,
			phone: phone,
			email: email
		})
	})
		.then(res => res.json())
		.then(data => {
			obtenerUsuariosyHacerHTML()
		})
}

// Agregar un boton "Modificar". Al hacerse click se abre un formulario (puede ser un modal, o aparecer al final).

