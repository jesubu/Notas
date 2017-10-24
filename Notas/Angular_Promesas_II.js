//-------------------------------------
////////////////////ARCHIVO CONTROLADOR
//-------------------------------------
var app=angular.module('promesasApp.controladores',[]); //OJO -->PERSONAS...SE DEBE LLAMAR IGUAL QUE EN EL SERVICIO/FACTORIA
app.controller('personasCtrl',['$scope','Personas',function($scope,Personas){
	
	
}]);




//----------------------------------
////////////////////ARCHIVO FACTORIA
//----------------------------------
var app=angular.module('promesaApp.servicios',[])

app.factory('Personas',['$http','$q','$rootScope',function($http,$q,$rootScope){
	
	var self={
		"cargando":false,
		"mensaje":"",
		"data":[]
	};
	
	self.cargarData=function(){
		self.cargando=true;
		var q=$q.defer();
		$http.jsonp("http:asdfasdfasdf")
		
			.then(function success(respuesta)
			{
				//self.cargando=true;
				//self.data=respuesta.data;
				
				q.resolve(respuesta.data);
				
				console.log("Todo ok :)");
			},
			function error(response){
				q.reject("error al cargar");
				console.log("Todo KO :(");
			});
		return q.promise;
		
		
	};
	$rootScope.promise=self.cargarData();
	
	$rootScope.promise.then(
		function(data){
			self.mensaje="OK";
			self.cargando=false;
			self.data=data;
		},
		function(error){
			self.mensaje="KO";
			console.log("Todo KO :(");
		});
		
	//self.cargarData();
	
	return self;
	
	
}])