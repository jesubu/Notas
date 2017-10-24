//dependencia $http hace peticiones asinconas.
$http
	.get("")
	.then(
		function(){
			
		},
		function (){
			
		}
	);
//Promesas con $http
angular.module("myApp").controller("MoviesCtrl",function($scope,$http){
	$http
		.get("api/v1/movies")
		.then (
			//En caso haber ejecutado la tarea de manera correcta
			function(data){
				$scope.movies=data;
			},
			//En caso de error
			function(){
				alert("Hubo un error");
			}		
		);
});
//debugger;
//Creando nuestras propias promesas
angular.module("myApp").service("MoviesService", function($http,$q){
	this.getMovies=function(){
		var deferred=$q.defer(); // Con el servicio $q se crean objetos diferido
		$http
			.get("api/v1/movies")
			.then (
				function(data){
					deferred.resolve(data);
				},
				function(){
					deferred.reject ("Error al obtener los datos");
				}
				
			);
			return deferred.promise;
	};
});


//Otra Forma de hacer lo mismo
function usoDiferido(){
	var diferido=$q.defer();
	
}

//Servicio para trabajar con la API / api/v1/movies
angular.module("myApp").service("MoviesService",function($http){
	this.getMovies=function(){
		return $http.get("api/v1/movies");
	};
});

//Controlador que hace uso del Servicio definido El servicio MoviesService se inyecta como dependencia -->MoviesService
angular.module("myApp").controller("MoviesCtrl",function($scope,MoviesService){
	MoviesService.getMovies().then(function(data){
		$scope.movies=data;
	});
});