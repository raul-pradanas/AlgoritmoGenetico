class NumeroBinario{
    constructor(parteEntera, parteDecimal){
        this.parteEntera = parteEntera;
        this.parteDecimal = parteDecimal;
    }
}

function algoritmoEvolutivo(expresion){

    let iteraciones = 100;

    let poblacion = generarPoblacion();

    for(let i = 0; i < iteraciones; i++){
        let nuevosHijos = generarCruces(poblacion);
        console.log(nuevosHijos);
        let hijosMutados = mutacion(nuevosHijos);
        poblacion = seleccion(poblacion,hijosMutados,expresion);
    }
}

function generarDatosAleatorios(){
    let parteEntera = "";

    let parteDecimal = "";

    for(let i = 0; i < 22; i++){
        if(Math.random()>0.5){
            parteEntera += "1"
        }else{
            parteEntera += "0"
        }
    }

    for(let j = 0; j < 10 ; j++){
        if(Math.random()>0.5){
            parteDecimal += "1"
        }else{
            parteDecimal += "0"
        }
    }
    return new NumeroBinario(parteEntera,parteDecimal);
}

function generarPoblacion(){
    let poblacion = [];

    for(let i = 0; i < 10; i++){
        poblacion.push(generarDatosAleatorios());
    }

    return poblacion;
}

function generarCruces(poblacion){
    let nuevosHijos = [];

    for(let i = 0; i < poblacion.length; i++){
        if(Math.round(Math.random()*100)<70){
            if(i == poblacion.length-2){
                nuevosHijos.push(cruce(poblacion[i],poblacion[0]));
            }
            else{
                nuevosHijos.push(cruce(poblacion[i],poblacion[i+1]));
            }
        }
    }

    return nuevosHijos;
}

function cruce(numPadre,numHijo){

    let pEnteraPadre = numPadre.parteEntera;
    let pEnteraHijo = numHijo.parteEntera;
    let pDecimalPadre = numPadre.parteDecimal;
    let pDecimalHijo = numHijo.parteDecimal;

    let pEntera = pEnteraPadre.substring(0,pEnteraPadre.length/2) + pEnteraHijo.substring(pEnteraHijo.length/2,pEnteraHijo.length);
    let pDecimal = pDecimalPadre.substring(0,pDecimalPadre.length/2) + pDecimalHijo.substring(pDecimalHijo.length/2,pDecimalHijo.length);

    return new NumeroBinario(pEntera,pDecimal);
}

function mutacion(numHijo){
    let hijosMutado = [];

    for(let i = 0; i < numHijo.length; i++){

        let rand1 = Math.round(Math.random()*22)
        let rand2 = Math.round(Math.random()*10)

        hijoMutar = numHijo[i].parteEntera;
        hijoMutar2 = numHijo[i].parteDecimal;
        
        //Probabilidad
        if(hijoMutar.substring(rand1,rand1+1) === "1"){
            parteEnteraMutada = hijoMutar.substring(0,rand1)+"0"+hijoMutar.substring(rand1+1,hijoMutar.length);
        }
        else{
            parteEnteraMutada = hijoMutar.substring(0,rand1)+"1"+hijoMutar.substring(rand1+1,hijoMutar.length);
        }

        if(hijoMutar2.substring(rand2,rand2+1) === "1"){
            parteDecimalMutada = hijoMutar2.substring(0,rand2)+"0"+hijoMutar2.substring(rand2+1,hijoMutar2.length);
        }
        else{
            parteDecimalMutada = hijoMutar2.substring(0,rand2)+"1"+hijoMutar2.substring(rand2+1,hijoMutar2.length);
        }
        num = new NumeroBinario(parteEnteraMutada,parteDecimalMutada);
        hijosMutado.push(num);
    }
    return hijosMutado;
}

function seleccion(poblacion,hijos,expresion){
    console.log(hijos);
    let numPadre = 0;
    let evalPadre = "";

    let numHijo = 0;
    let evalHijo = "";
    for(let i = 0; i < poblacion.length-1; i++){
        numPadre = BinarioADecimal(poblacion[i].parteEntera).toString() + "." + BinarioADecimal(poblacion[i].parteDecimal).toString();
        evalPadre = expresion.replaceAll("x",numPadre);

        for(let j = 0; j< hijos.length ;j++){
            numHijo = BinarioADecimal(hijos[j].parteEntera).toString() + "." + BinarioADecimal(hijos[j].parteDecimal).toString();
            evalHijo = expresion.replaceAll("x",numHijo);

            if(eval(evalHijo) > eval(evalPadre)){
                poblacion.splice(i,1);
                poblacion.push(hijos[j])
                console.log("Numero Hijo: ",numHijo);
                console.log("Aptitud: ",eval(evalHijo));
            }
        }
    }
}

function BinarioADecimal(num) {
    let sum = 0;

    for (let i = 0; i < num.length; i++) {
       sum += +num[i] * 2 ** (num.length - 1 - i);
    }
    return sum;
}

algoritmoEvolutivo("-x * x");
