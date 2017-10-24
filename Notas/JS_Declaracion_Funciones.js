// EJEMPLO 1
/*---------*/
//variable Modulo declarada en el ámbito global, que significa que puede ser invocada por cualquiera que la necesite, o incluso pasarla a otro módulo.

var Modulo = (function () {
  // código
})();


//EJEMPLO 2
/*---------*/

var Modulo = (function () {
  
  var metodoPrivado = function () {
    // algo
  };

})();

//EJEMPLO 3
/*---------*/
//Generalmente los módulos retornan como resultado un Object con los elementos que queremos compartir fuera del ámbito, de manera de controlar el acceso a los elementos dentro del módulo.
//Este es un ejemplo simple, pero real, de un método que exponemos en el módulo para que sea ejecutado por cualquiera que tenga acceso al módulo.

var Modulo = (function () {
  
  return {
    metodoPublico: function () {
      // código
    }
  };

})();

//la llamada al método público:
Modulo.publicMethod();

//EJEMPLO 4
/*---------*/

var Modulo = (function() {

    var metodoPrivado = function() { return 'metodo privado'; };

    return {
        metodoPublicoUno: function() {
            // Acá se puede llamar a 'metodoPrivado()'
            return ('metodoPublicoUno-->' + metodoPrivado());
        },
        metodoPublicoDos: function () {
            return 'metodoPublicoDos';

        },
        metodoPublicoTres: function () {
            return 'metodoPublicoTres';

        }
    };

})();

console.log(Modulo.metodoPublicoUno());
console.log(Modulo.metodoPublicoDos());
console.log(Modulo.metodoPublicoTres());

//EJEMPLO 5
/*---------*/
//lo correcto es hacerlo como el ejemplo 6
var Modulo2 = (function () {

    // objeto en el ambito local
    var miObjeto = {
        autor: "Vincent Van Gogh",
        añoCreacion: 1871,
        titulo: 'Los rosales corintios',
        getInfo: function () { return this.titulo + ':' + this.autor + ', ' + this.añoCreacion + '.'; }
    };

    // declarado con `var`, debe ser "privado"
    var metodoPrivado = function () { return (miObjeto.añoCreacion+5); };

    miObjeto.Prueba = function () {
        miObjeto.añoCreacion = metodoPrivado();
        return miObjeto.añoCreacion;
    };

    return miObjeto;

})();
console.log(Modulo2.titulo);
console.log(Modulo2.getInfo());
console.log(Modulo2.Prueba());
console.log(Modulo2.getInfo());

//EJEMPLO 6
/*---------*/

var myApp = (function () {

    var foo = 'Module Pattern';
    var bar = 'ver 1.0';

    var sum = function (param1, param2) {
        return param1 + param2;
    }

    return {
        myMessage: function () {
            return foo + ' ' + bar;
        },
        sum: function (number1, number2) {
            return sum(number1, number2);
        }
    }
})();

console.log(myApp.myMessage()); // Module Pattern ver 1.0
console.log(myApp.sum(10, 5)); // myApp.sum is not a function. sum es privada

/*
Optimizando el contexto
Para obtener un mejor rendimiento del patrón anterior y evitar errores de sobreescritura, podemos utilizar el último par de paréntesis de nuestro módulo para enviar parámetros seguros:

var myApp = ( function( window, undefined ){
  var foo = 'Module Pattern';
  var bar = 'ver 1.0';
 
  // More code....
 
})( window );
En este caso, hemos enviado como parámetro a nuestro módulo el objeto window para guardar una copia del mismo: esto es interesante, por ejemplo, 
por razones de rendimiento. Cada vez que necesitemos acceder a este objeto, el intérprete lo hará a través de la copia cacheada en lugar de obligarlo a 
buscarlo remontando niveles.

Si observamos, además la declaración de la función, hemos especificado un segundo parámetro, undefined, que no se corresponde con ningún argumento 
(solo hemos especificado window). Esto nos garantiza que undefined será, efectivamente, undefined ya que está sin definir. La idea con esto es evitar 
los errores que pueden darse en caso de que esta palabra reservada haya sido reescrita en alguna parte del código y su valor no corresponda 
con el esperado.
*/

