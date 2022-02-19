import { nome, email, senha, rg, cep, rua, numero, bairro, cidade, uf, complemento }from "./variaveis.js";
import { Cliente } from "./../model/classes/classCliente.js";
import { Endereco } from "./../model/classes/classEndereco.js";


export { criaEndereco, criaCliente }

//CRIANDO OBJETO ENDEREÇO
const criaEndereco = ( ) => {
    const endereco = new Endereco( cep.val(), rua.val(), numero.val(), bairro.val(), cidade.val(), uf.val(), complemento.val() );
    return endereco;
}

// CRIANDO OBJETOS CLIENTE
const criaCliente = ( enderecoObjeto, planoEscolhido ) =>{
    const cliente = new Cliente( nome.val(), email.val().toLowerCase(), senha.val(), rg.val(), enderecoObjeto, planoEscolhido ); 
    return cliente;
}