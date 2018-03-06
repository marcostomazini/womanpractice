/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/
 
angular.module('app.core').factory('ArquitetaWeb', ['$http', '$q', function($http, $q) {
  'use strict';

  var parametrosPesquisa = [];

  return {

    validaForm: function(form) {    
        if (form.$valid) {
          return true;
        } else {
          var message = '';

          for (var key in form) {
              if (key.indexOf('$') == 0) continue;
              for (var error in form[key].$error) {
                  if (form[key].$error[error] === true) {
                    if (!_.isUndefined($('[name=' + key + ']').data(error.toLowerCase() + '-message')))
                      message += $('[name=' + key + ']').data(error.toLowerCase() + '-message') + '<br>';
                  }
              }
          } 

          if (!_.isEmpty(message)) {
            noty({
              text: message,
              type: 'error'
            });
          }
        }
    },

    carregaEndereco: function(address) {    
      var def = $q.defer();

      if (!address) return $q.reject();

      var params = {
        address: address, 
        sensor: false
      };      
      $http.get(
        'http://maps.googleapis.com/maps/api/geocode/json', { params: params }
      ).then(function(response) {   
        def.resolve(response.data.results);  
      });
      return def.promise;
    },
    
    pesquisar: function(url) {
      var def = $q.defer();
      $http.post(url, parametrosPesquisa).then(function(response) {        
        def.resolve(response.data);  
        parametrosPesquisa = [];
      });      
      return def.promise;
    },

    addPesquisa: function(valor, campo, tipo) {      
      parametrosPesquisa.push({
        campo: campo || 'nome',
        valor: valor,
        tipo: tipo || 'String'
      });
      return this;
    },

    deleteConfirm: function(message, callbackYes, callbackNo) {
      noty({
        modal: true,
        text: message || 'Tem certeza que deseja deletar o registro?', 
        buttons: [{ addClass: 'btn btn-primary', text: 'Sim', onClick: function($noty) {
              $noty.close();
              if (callbackYes && typeof(callbackYes) === "function") {
                callbackYes();
              }
            }
          }, { 
            addClass: 'btn btn-warning', text: 'Não', onClick: function($noty) {
              $noty.close();
              if (callbackNo && typeof(callbackNo) === "function") {
                callbackNo();
              }
            }
          }]
      }); 
    },

    showMessage: function(data) {
      noty({
        text: data.message,
        type: data.type
      });
    },

    carregaObjeto: function(path) {
      if (/create/.test(path)) {
        return {};
      } else if (/edit/.test(path)) {
        return null;
      }
    }

  }

}]);
