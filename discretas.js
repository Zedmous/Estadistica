"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discreta = void 0;
//definicion de una clase
var Discreta = /** @class */ (function () {
    function Discreta() {
        var _this = this;
        this.uniforme = function (k, variable, minimo, maximo, v) {
            //funcion de flecha
            var fx = function (variable) {
                if (variable > 0 && variable <= k) {
                    return 1 / k;
                }
                else {
                    return 0;
                }
            };
            var sum = 0;
            var i = 0;
            var probabilidad = 0;
            if (maximo && minimo) {
                i = minimo;
                while (i <= maximo) {
                    sum = sum + fx(i);
                    i++;
                }
                probabilidad = sum;
            }
            else if (maximo) {
                i = 1;
                while (i <= maximo) {
                    sum = sum + fx(i);
                    i++;
                }
                probabilidad = sum;
            }
            else if (minimo) {
                i = minimo;
                while (i <= k) {
                    sum = sum + fx(i);
                    i++;
                }
                probabilidad = sum;
            }
            else {
                probabilidad = fx(variable);
            }
            //destructuracion
            var uniforme = {
                probabilidad: probabilidad,
                media: _this.esperanza(k, fx),
                varianza: _this.varianza(k, fx)
            };
            if (v) {
                _this.imprimir(uniforme.probabilidad, uniforme.media, uniforme.varianza);
            }
            else {
                return uniforme;
            }
        };
        this.binomial = function (x, n, p, minimo, maximo, v) {
            //funcion de probabilidad
            var fx = function (x) {
                if (x >= 0 && x <= n) {
                    return _this.nCr(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
                }
                else {
                    return 0;
                }
            };
            var sum = 0;
            var i = 0;
            var probabilidad = 0;
            if (maximo && minimo) {
                i = minimo;
                while (i <= maximo) {
                    sum = sum + fx(i);
                    i++;
                }
                probabilidad = sum;
            }
            else if (maximo) {
                i = 0;
                while (i <= maximo) {
                    sum = sum + fx(i);
                    i++;
                }
                probabilidad = sum;
            }
            else if (minimo) {
                i = minimo;
                while (i <= n) {
                    sum = sum + fx(i);
                    i++;
                }
                probabilidad = sum;
            }
            else {
                probabilidad = fx(x);
            }
            var binomial = {
                probabilidad: probabilidad,
                media: _this.esperanza(n, fx),
                varianza: _this.varianza(n, fx)
            };
            if (v) {
                _this.imprimir(binomial.probabilidad, binomial.media, binomial.varianza);
            }
            else {
                return binomial;
            }
        };
        //Metodo para resolver combinatorias de elementos r<=n
        this.nCr = function (n, r) { return _this.factorial(n) / (_this.factorial(n - r) * _this.factorial(r)); };
        //Metodo para calcular el factorial de un numero
        this.factorial = function (n) {
            var multip = 0, ante = n;
            if (n == 0)
                return 1;
            while (n >= 1) {
                n--;
                if (n > 0) {
                    multip = n * ante;
                }
                else {
                    multip = 1 * ante;
                }
                ante = multip;
            }
            return ante;
        };
        this.esperanza = function (n, fx, aq) {
            var sum = 0, i = 0;
            while (i <= n) {
                if (aq == 1) {
                    sum = sum + Math.pow(i, 2) * fx(i);
                }
                else {
                    sum = sum + i * fx(i);
                }
                i++;
            }
            return sum;
        };
        this.varianza = function (n, fx) {
            return _this.esperanza(n, fx, 1) - Math.pow(_this.esperanza(n, fx), 2);
        };
        this.imprimir = function (probabilidad, media, varianza) {
            console.log("La probabilidad es de: ", probabilidad, " su media es de: ", media, " y varianza de: ", varianza);
        };
    }
    return Discreta;
}());
exports.Discreta = Discreta;
