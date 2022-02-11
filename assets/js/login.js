const email = $( '#email' );
const senha = $( '#senha');
const botao = $( '#btn' );
const dadosStorage = JSON.parse( localStorage.getItem( 'clientes' ) );

botao.on( 'click', (event) => {
    event.preventDefault();

   confereCampos()
    
})

const confereLogin = () => {

    let dadosConfere = false;

    for ( let i = 0; i < dadosStorage.length; i++ ) {
        if( email.val() === dadosStorage[i].email && senha.val() === dadosStorage[i].senha ){
            dadosConfere = true;
        }
    }

    if( dadosConfere ){
        alert( 'VOCE JÁ ESTA CADASTRADO, LOGO TERA ACESSO LIBERADO' );
    }
    else{
        alert( 'OS DADOS NÃO CONFEREM, VEJA SUA SENHA OU EMAIL' );
    }
}


const confereCampos = () => {
    if( email.val() === '' || senha.val() === '' ){
        alert( 'PREENCHA TODOS OS CAMPOS' );
    }
    else{
        confereLogin()
    }
    
}
