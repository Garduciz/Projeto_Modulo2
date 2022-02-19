export { alertaUsuario };

const alertaUsuario = ( input, text ) => {
    input.focus();
    $( '.validador' ).text( text ).css( 'color', 'red' );
}