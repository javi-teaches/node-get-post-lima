const fs = require('fs');
const path = require('path');

const ubicacionProductos = './src/data/productos.json';

let contenidoProductos = fs.readFileSync(ubicacionProductos, 'utf-8');

contenidoProductos = contenidoProductos == '' ? [] : JSON.parse(contenidoProductos);

function generarId () {
	if (contenidoProductos.length == 0) {
		return 1;
	}
	let elUltimoProducto = contenidoProductos[contenidoProductos.length - 1];
	return elUltimoProducto.id + 1;
}

const controller = {
	index: (req, res) => {
		res.render('index', { productos: contenidoProductos });
	},
	crear: function (req, res) {
		res.render('formulario');
	},
	guardar: function (req, res) {
		req.body = {
			id: generarId(),
			...req.body,
		}
		contenidoProductos.push(req.body);
		fs.writeFileSync(ubicacionProductos, JSON.stringify(contenidoProductos, null, ' '));
		res.send('El producto se guardó');
	},
	borrar: function (req, res){
		productosFinales = contenidoProductos.filter(function(unProducto){
			return unProducto.id != req.params.idProducto;
		});
		fs.writeFileSync(ubicacionProductos, JSON.stringify(productosFinales, null, ' '));
		res.redirect('/');
	}
};

module.exports = controller
