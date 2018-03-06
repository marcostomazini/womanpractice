'use strict';

angular.module('fornecedor').controller('WelcomeController', [
	'$scope', 
	'$interval',
	'$stateParams', 
	'$location', 
	'ArquitetaWeb',
	function($scope, 
		$interval,
		$stateParams, 
		$location,
		ArquitetaWeb) {		

		$scope.cliente = {};

		$scope.refreshAddresses = function(address) {
			ArquitetaWeb.carregaEndereco(address).then(function(response) {	    
		    	$scope.addresses = response;
		    });
		};

		$scope.open = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened = true;
		};			

	}
]);