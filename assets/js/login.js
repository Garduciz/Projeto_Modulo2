import { email, senha, botao }from "./mvc/controllers/variaveis.js";


const dadosStorage = JSON.parse( localStorage.getItem( 'clientes' ) );

//EVENTO USUARIO
//===================================================================================================
botao.on( 'click', (event) => {
    event.preventDefault();
   confereCampos()
})
//==================================================================================================


//CONFERINDO CREDENCIAIS
//===================================================================================================
const confereLogin = ( validador ) => {
    let dadosConfere = false;
    for ( let i = 0; i < dadosStorage.length; i++ ) {
        if( email.val() === dadosStorage[i].email && senha.val() === dadosStorage[i].senha ){
            dadosConfere = true;
        }
    }
    if( validador ){
        alert( 'VOCE JÁ ESTA CADASTRADO, LOGO TERA ACESSO LIBERADO' );
    }
    else{
        alert( 'OS DADOS NÃO CONFEREM, VEJA SUA SENHA OU EMAIL' );
    }
}
//====================================================================================================


// CONFERE SE OS CAMPOS ESTÃO PREENCHIDOS
//=====================================================================================================
const confereCampos = () => {
    if( email.val() === '' || senha.val() === '' ){
        alert( 'PREENCHA TODOS OS CAMPOS' );
    }
    else{
        confereLogin();
    }    
}
//======================================================================================================