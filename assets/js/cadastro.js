import { buscarCep } from './mvc/controllers/buscaCep.js';
import { clientesStorage, salvaCliente } from './mvc/controllers/storage.js';
import { criaEndereco, criaCliente } from './mvc/controllers/criandoObjetos.js';
import { conferindoPlano } from './mvc/controllers/escolhaPlano.js';
import { nome, email, senha, senhaConfirmacao, rg, cep, botao } from './mvc/controllers/variaveis.js';
import { alertaUsuario } from './mvc/viewer/alerta.js';



// EVENTOS FEITOS DURANDO O CADASTRO 
//====================================================================================================
botao.on( 'click', ( event )=> { // QUANDO O BOTAO CADASTRAR FOR APERTADO ELE EFETUADO AS FUNÇOES PARA CADASTRO
    event.preventDefault();
    confereEmailCadastrado( clientesStorage() );
})

// PREENCHENDO O CAMPO CEP
cep.on( 'change', buscarCep); // SEMPRE QUE O CAMPO CEP FOR MUDADADO ELE EXECUTA A FUNÇÃO DE BUSCARCEP
//====================================================================================================


//CONFERINDO TODOS OS CAMPOS
//========================================================================================================
const conferindoDados = () =>{
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
//======================================================================================================


// CONFERINDO SE O EMAIL JÁ ESTA CADASTRADO NO STORAGE
//======================================================================================================
const confereEmailCadastrado = ( clientes ) => {
    let emailExistente = false; // BOLENO QUE A GENTE VAI USAR PARA VERIFICAR SE O EMAIL JÁ ESTÁ CADASTRADO
    
    if( clientes.length >= 1){ // SE O ARRAY CLIENTES TIVER ALGUM ELEMENTO ELE EXECUTA O CODIGO ABAIXO
        for (let i = 0; i < clientes.length ; i++) { // FOR PARA PASSAR POR TODOS OS ELEMENTOS DO ARRAY
            if ( clientes[i].email === email.val() ) { //ELE FAZ UMA COMPARAÇÃO DOS EMAILS DOS ELEMENTOS, COM O EMAIL DIGITADO NO INPUT EMAIL
                emailExistente = true; // EMAILEXISTENTE PASSA A SER VERDADEIRO
                break
            }else{
                emailExistente = false; // EMAIL EXISTENTE CONTINUA SENDO FALSO
            }
        }
    }
    
    //CONDICIONAL BASEADO NO EMAILEXISTENTE, O BOLEANO
    if ( emailExistente ) {// SE EMAIL EXISTENTE FOR VERDADEIRO, ELE AVISA A O USUARIO
        alertaUsuario( email, 'Email já está em uso, tente outro !!' )
    } else {
        conferindoDados(); // SE FOR FALSO ELE EXECUTA O PROCESSO DE CADASTRO
    }
}
//=====================================================================================================
