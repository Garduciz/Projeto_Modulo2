import { buscarCep } from './mvc/controllers/buscaCep.js';
import { clientesStorage, salvaCliente } from './mvc/controllers/storage.js';
import { criaEndereco, criaCliente } from './mvc/controllers/criandoObjetos.js';
import { conferindoPlano } from './mvc/controllers/escolhaPlano.js';
import { nome, email, senha, senhaConfirmacao, rg, cep, botao } from './mvc/controllers/variaveis.js';
import { confereEmailCadastrado } from './mvc/controllers/verificaEmail.js'
import { alertaUsuario } from './mvc/viewer/alerta.js';

// EVENTOS FEITOS DURANDO O CADASTRO 
//====================================================================================================
botao.on( 'click', ( event )=> { // QUANDO O BOTAO CADASTRAR FOR APERTADO ELE EFETUADO AS FUNÇOES PARA CADASTRO
    event.preventDefault();
    conferindoDados( confereEmailCadastrado( clientesStorage() ) ) ;
})

// PREENCHENDO O CAMPO CEP
cep.on( 'change', buscarCep); // SEMPRE QUE O CAMPO CEP FOR MUDADADO ELE EXECUTA A FUNÇÃO DE BUSCARCEP
//====================================================================================================


//CONFERINDO TODOS OS CAMPOS
//========================================================================================================
const conferindoDados = ( validador ) =>{
    if ( !validador ){ // SE O EMAIL NÃO ESTIVER CADASTRADO ELE EXECUTA
        if( !nome.val() || !email.val() || !senha.val() || !rg.val() || !cep.val() ){// CONFERE SE TODOS OS CAMPOS ESTÃO PREENCHIDOS
        alertaUsuario( nome, 'Preencha corretamente todos os campos !!' )
        }
        else if( senha.val() !== senhaConfirmacao.val() ){ // CONFERE SE AS SENHAS SÃO IGUAIS
            alertaUsuario( senha, 'As senhas não conferem !!' )
        }
        else if ( rg.val().length !== 10 ){ // CONFERE SE RG É MAIOR QUE 10
            alertaUsuario( rg, 'Tamanho do rg é invalido !!' );
        }
        else if( !email.val().includes( '@' && '.com' ) ){ // CONFERE SE EMAIL POSSUI @ E .COM
            alertaUsuario( email, 'Insira um email valido !!' );
        }
        else{ // SE NÃO TIVER NENHUM PROBLEMA COM AS CONDIÇÕES A CIMA ELE EXECUTA O PROCESSO DE CADASTRO
            salvaCliente( criaCliente( criaEndereco(), conferindoPlano() ), clientesStorage() );
        }
    }
    else{ // CONTENDO UM CADASTRO DO EMAIL DIGITADO ELE AVISA A O CLIENTE
        alertaUsuario( email, 'Email já está em uso, tente outro !!' )
    }
}
//======================================================================================================

