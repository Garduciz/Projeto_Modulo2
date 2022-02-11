const email = $( '#email' );
const dadosStorage = JSON.parse( localStorage.getItem( 'clientes' ) );
const botao = $( '#btn' );


botao.on( 'click', (event) => {
    event.preventDefault();

    confereEmail()
    
})

const confereEmail = () => {
    for (let i = 0; i <= email.length; i++) {
        if( dadosStorage[i].email === email.val() ){
            alert( 'Esse email já está cadastrado na nossa fila de espera' );
            break;
        }
        else if( i === email.length && dadosStorage[i].email !== email.val()){
            alert( 'vamos se cadastrar' );
            window.location.href = "cadastro.html";
        }   
    }
}


