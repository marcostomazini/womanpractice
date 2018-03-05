'use strict';

// Setting up route
angular.module('page').config(['$stateProvider', 'RouteHelpersProvider',
	function($stateProvider, helper) {
		// state routing
		$stateProvider.  
		state('page.bemvindo', {
      		url: '/bemvindo',
      		templateUrl: 'modules/fornecedores/views/bemvindo-fornecedor.client.view.html',
          resolve: helper.resolveFor('modernizr', 'icons', 'toaster')
    	}).
      state('page.cadastro', {
        url: '/cadastro',
        controller: 'WelcomeController',
        templateUrl: 'modules/fornecedores/views/inserir-fornecedor.client.view.html',
        resolve: helper.resolveFor('modernizr', 'icons', 'toaster')
      }).
      state('page.cancelar', {
        url: '/cancelar',
        templateUrl: 'modules/fornecedores/views/cancelar-fornecedor.client.view.html',
        resolve: helper.resolveFor('modernizr', 'icons', 'toaster')
      });
	}
]);