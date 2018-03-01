'use strict';

angular.module('app.core').controller('HomeController', ['$scope', '$q', 'Authentication', 'UsuariosSistema',
	function($scope, $q, Authentication, UsuariosSistema) {
		var counters = { 
			users: 0,
			fornecedores: 0,
			cadastros: 0
		};

		$scope.contadores = counters;
		
		UsuariosSistema.quantidade.get().$promise.then(function(data) {
			$scope.contadores = data;			
		});
	}
]);