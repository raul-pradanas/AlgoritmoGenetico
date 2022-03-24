function expresionMatematica(expresion){

    //Declaro constantes
    const iteraciones = 500;

    //Numero inicial y aptitud

    let poblacionB = generarPoblacion();

    for(let i = 0; i < iteraciones ; i++){
        probabilidadCruce
        let expresionPadre = expresion.replaceAll("x",numeroPadre);
        let expresionHijo = expresion.replaceAll("x",numeroHijo);

        if(eval(expresionHijo) > eval(expresionPadre)){
            numeroPadreB = numeroHijoB;
        }
        console.log(numeroPadre);
    }
    console.log("Solución: ");
}

function generarDatosAleatorios(){
    let parteEntera = "";

    let parteDecimal = "";

    for(let i = 0; i < 22; i++){
        if(Math.random()*100>50){
            parteEntera += "1"
        }else{
            parteEntera += "0"
        }
    }

    for(let j = 0; j < 10 ; j++){
        if(Math.random()*100>50){
            parteDecimal += "1"
        }else{
            parteDecimal += "0"
        }
    }
    return [parteEntera,parteDecimal];
}

function generarPoblacion(){
    let poblacion = [];

    for(let i = 0; i < 100; i++){
        poblacion.push(generarDatosAleatorios());
    }

    return poblacion;
}

function cruce(numPadre,numHijo){

    parteEntera = numHijo[0].substring(0,numHijo[0].length/2) + numPadre[0].substring(numPadre[0].length/2,numPadre[0].length);
    parteDecimal = numHijo[1].substring(0,numHijo[1].length/2) + numPadre[1].substring(numPadre[1].length/2,numPadre[1].length);

    return [parteEntera,parteDecimal];
}

function mutacion(numero){

    let mutacionParteEntera = false
    let mutacionParteDecimal = false

    let parteEnteraMutada = "";
    let parteDecimalMutada = "";

    for(let i = 0; i < numero[0].length ; i++){
        if(Math.random()*100>5 && !mutacionParteEntera){
            if(numero[0].substring(i,i+1) === "1"){
                parteEnteraMutada += "0";
                mutacionParteEntera = true;
            }
            else{
                parteEnteraMutada += "1";
                mutacionParteEntera = true;
            }
        }
        else{
            parteEnteraMutada += numero[0].substring(i,i+1);
        }

        if(Math.random()*100>5 && !mutacionParteDecimal){
            if(numero[1].substring(i,i+1) === "1"){
                parteDecimalMutada += "0";
                mutacionParteDecimal = true;
            }
            else{
                parteDecimalMutada += "1";
                mutacionParteDecimal = true;
            }
        }
        else{
            parteDecimalMutada += numero[1].substring(i,i+1);
        }
    }
    return [parteEnteraMutada,parteDecimalMutada];
    
}

function BinarioADecimal(num) {
    let sum = 0;

    for (let i = 0; i < num.length; i++) {
       sum += +num[i] * 2 ** (num.length - 1 - i);
    }
    return sum;
}

expresionMatematica("-x * x");