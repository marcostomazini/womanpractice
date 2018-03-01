'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('UsuariosSistema', ['$resource',

	function($resource) {

		var Quantidade = $resource('api/users/count');

		var Usuarios = $resource('api/users/:usuarioSistemaId', 
			{ usuarioSistemaId: '@_id' }, 
			{ update: { method: 'PUT' } });
    	
    	return {
    		usuarios: Usuarios,
    		quantidade: Quantidade
    	};
	}
]);