'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$interval', '$timeout', 
	'$stateParams', '$http', '$location', 'Authentication',
	function($scope, $interval, $timeout, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// auto redirecionamento
		$scope.autoRedirect = function() {
			var tempo = 6;
			$scope.countDown = tempo;
			$interval(function(){$scope.countDown--},1000,0);

			$timeout(function(){
		        $location.path('/')
		    }, (tempo * 500));
		};

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;
			if($scope.recoverForm.$valid) {
				$http.post('/auth/forgot', $scope.credentials).success(function(response) {
					// Show user success message and clear form
					$scope.credentials = null;
					$scope.success = response.message;

				}).error(function(response) {
					// Show user error message and clear form
					$scope.credentials = null;
					$scope.error = response.message;
				});
			} else {
				$scope.recoverForm.username.$dirty = true;
			}
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			if($scope.resetForm.$valid) {
				$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
					// If successful show success message and clear form
					$scope.passwordDetails = null;

					// Attach user profile
					Authentication.user = response;

					// And redirect to the index page
					$location.path('/page/password/reset/success');
				}).error(function(response) {
					$scope.error = response.message;
				});

			} else {
				$scope.resetForm.account_password.$dirty = true;
				$scope.resetForm.account_password_confirm.$dirty = true;
			}
		};
	}
]);