import { email, botao } from './mvc/controllers/variaveis.js';

// const botao = $( '#btn' );
// const email = $( '#email' );
const clientes = JSON.parse( localStorage.getItem( 'clientes' ) )

// EVENTOS DO USUARIO
//======================================================================================================
botao.on( 'click', function (event) {
    event.preventDefault();
    //alert( `Um email de recuperação de senha foi enviado para ${email.val()} ` ) 
    confereEmailValido()
})
//=====================================================================================================


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
    
    return emailExistente;
}
//=====================================================================================================


// ALERTANDO O USUARIO SOBRE ALGO DE ERRADO
//===================================================================================================
const alertaUsuario = ( input, text ) => {
    input.focus();
    $( '.validador' ).text( text ).css( 'color', 'red' );
}
//===================================================================================================


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
        exibeMensagem( confereEmailCadastrado( clientes ) );
    }
    else{
        alertaUsuario( email, 'Insira um email válido!!' );
    }
}
//==================================================================================================