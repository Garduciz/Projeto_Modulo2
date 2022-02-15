const botao = $( '#btn' );
const email = $( '#email' );
const clientes = JSON.parse( localStorage.getItem( 'clientes' ) )

// EVENTOS DO USUARIO
//======================================================================================================
botao.on( 'click', function (event) {
    event.preventDefault();
    //alert( `Um email de recuperação de senha foi enviado para ${email.val()} ` ) 
    exibeMensagem( confereEmailCadastrado( clientes ) )
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


// MANDANDO O EMAIL ( SIMBOLICO, APENAS AVISA NO ALERT )
//========================================================================================================
const exibeMensagem = ( validador ) => {
    //CONDICIONAL BASEADO NO EMAILEXISTENTE, O BOLEANO
    if ( validador ) {// SE VALIDADOR FOR VERDADEIRO, ELE ENVIA UM EMAIL A O USUARIO
        alert( `Um email de recuperação de senha foi enviado para ${ email.val() }` );
        window.location.href = 'login.html'
    } else {
        alert( 'NÃO ACHAMOS UM CADASTRO REFERENTE A ESSE EMAIL !!!!' ); // SE FOR FALSO ELE EXIBE A MENSAGEGEM QUE NÃO  CADASTRO ACHOU O EMAIL
    }
}
//========================================================================================================