const email = $( '#email' );
const senha = $( '#senha');
const botao = $( '#btn' );
const dadosStorage = JSON.parse( localStorage.getItem( 'clientes' ) );

botao.on( 'click', (event) => {
    event.preventDefault();

    confereLogin()
    
})

const confereLogin = () => {
    
    let dadosIncorretos = false ;

    for (let i = 0; i <= email.length; i++) {
        if( dadosStorage[i].email === email.val() && dadosStorage[i].senha === senha.val() ){
            alert( 'Esse email já está cadastrado na nossa fila de espera' );
            break;
        }
        else if( dadosStorage[i].email === email.val() && dadosStorage[i].senha !== senha.val() ){
            dadosIncorretos = true;
            break;
        }
        else{
           dadosIncorretos = false;
        }   
    }

    if( dadosIncorretos){
        alert( 'Dados incorretos' );
    }
    else{
        alert( 'VocÊ ainda não foi cadastrado' );
        window.location.href = "cadastro.html";
    }
}




