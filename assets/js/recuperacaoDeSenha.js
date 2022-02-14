const botao = $( '#btn' );
const email = $( '#email' );

botao.on( 'click', function (event) {
    event.preventDefault();
    alert( `Um email de recuperação de senha foi enviado para ${email.val()} ` ) 
})