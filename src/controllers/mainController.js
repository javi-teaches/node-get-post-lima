const fs = require('fs');
const path = require('path');

const ubicacionProductos = './src/data/productos.json';

function traerProductos () {
	let contenidoProductos = fs.readFileSync(ubicacionProductos, 'utf-8');
	contenidoProductos = contenidoProductos == '' ? [] : JSON.parse(contenidoProductos);
	return contenidoProductos;
}

function guardarProductos (productos) {
	fs.writeFileSync(ubicacionProductos, JSON.stringify(productos, null, ' '));
}

function generarId () {
	let productos = traerProductos();
	if (productos.length == 0) {
		return 1;
	}
	let elUltimoProducto = productos.pop();
	return elUltimoProducto.id + 1;
}

const controller = {
	index: (req, res) => {
		res.render('index', { productos: traerProductos() });
	},
	crear: function (req, res) {
		res.render('formulario');
	},
	guardar: function (req, res) {
		req.body = {
			id: generarId(),
			...req.body,
		}
		let productos = traerProductos();
		productos.push(req.body);
		guardarProductos(productos);
		res.send('El producto se guardó');
	},
	borrar: function (req, res){
		let productos = traerProductos();
		productosFinales = productos.filter(function(unProducto){
			return unProducto.id != req.params.idProducto;
		});
		guardarProductos(productosFinales);
		res.redirect('/');
	}
};

module.exports = controller;
