import { email, botao } from './mvc/controllers/variaveis.js';
import { confereEmailCadastrado } from './mvc/controllers/verificaEmail.js'
import { alertaUsuario } from './mvc/viewer/alerta.js';
import { clientesStorage } from './mvc/controllers/storage.js';




// EVENTOS DO USUARIO
//======================================================================================================
botao.on( 'click', function (event) {
    event.preventDefault();
    //alert( `Um email de recuperação de senha foi enviado para ${email.val()} ` ) 
    confereEmailValido()
})
//=====================================================================================================


// MANDANDO O EMAIL ( SIMBOLICO, APENAS AVISA NO ALERT )
//========================================================================================================
const exibeMensagem = ( validador ) => {
    //CONDICIONAL BASEADO NO EMAILEXISTENTE, O BOLEANO
    if ( validador ) {// SE VALIDADOR FOR VERDADEIRO, ELE ENVIA UM EMAIL A O USUARIO
        alert( `Um email de recuperação de senha foi enviado para ${ email.val() }` );
        window.location.href = 'login.html'
    } 
    else {
        alertaUsuario( email, 'Não achamos um cadastro referente a esse email' ); // SE FOR FALSO ELE EXIBE A MENSAGEGEM QUE NÃO  CADASTRO ACHOU O EMAIL
    }
}
//========================================================================================================


// CONFERINDO SE O QUE FOI DIGITADO É REALMENTE UM EMAIL
//===================================================================================================
const confereEmailValido = () => {
    if( email.val().includes( '@', '.com' ) ){
        exibeMensagem( confereEmailCadastrado( clientesStorage() ) );
    }
    else{
        alertaUsuario( email, 'Insira um email válido!!' );
    }
}
//==================================================================================================