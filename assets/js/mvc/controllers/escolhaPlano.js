export { conferindoPlano };

import { inputs } from "./variaveis.js";



const conferindoPlano = () =>{
    for (let i = 0; i < inputs.length; i++) { // ELE BUSCA EM TODOS OS INPUS
        if( inputs[i].checked === true){ // SE O INPUT TIVER TICADO (SOMENTE OS DOS PLANOS PODEM SER TICADOS)
            return inputs[i].value ; // ELE TRAS O VALOR DETERMINADO NO INPUT, NO HTML PODE VER DENTRO DA PROPRIA TAG
        }    
    }
}
