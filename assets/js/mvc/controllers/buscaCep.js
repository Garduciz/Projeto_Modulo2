import { cep, rua, bairro, cidade, uf }from "./variaveis.js";
import { alertaUsuario } from "./../viewer/alerta.js";

export async function buscarCep(){
    const busca = cep.val();// BUSCA É O VALOR DO CEP DIGITADO QUE A GENTE COLOCA NA REQUISIÇÃO A API
        try{
            const response = await fetch( `https://viacep.com.br/ws/${busca}/json/` ) ;
            // SALVA UMA REQUISIÇÃO RESPONSE NA VARIAVEL RESPONSE ( TAMBEM CHAMADO DE PROMISE)
            const data = await response.json();
            // CONVERTE A REQUISIÇÃO PARA JSON (  OBJETO )
            exibeCep( data );
        }
        catch{
            alertaUsuario( cep, 'Falha ao buscar o cep digitado' );
        }
}

const exibeCep = ( endereco ) => {
    rua.val( endereco.logradouro );
    bairro.val( endereco.bairro );
    cidade.val( endereco.localidade );
    uf.val( endereco.uf );
}