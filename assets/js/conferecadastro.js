const email = $( '#email' );
const botao = $( '#btn' );
const dadosStorage = buscaStorage();

botao.on( 'click', (event) => {
    event.preventDefault();
    confereEmail()
})

const confereEmail = () => {
    for (let i = 0; i <= dadosStorage.length; i++) {
        
        if( dadosStorage.length === 0 ){
            alert( 'vamos se cadastrar' );
            window.location.href = "cadastro.html";
        }
        else if ( dadosStorage[i].email !== email.val() && email.val() ){
            alert( 'vamos se cadastrar' );
            window.location.href = "cadastro.html";
            break;
        }
        else if( email.val() === '' ){
            alert( 'PREENCHA O CAMPO DE EMAIL')
        }
        else{
            alert( 'ESSE EMAIL JÁ ESTÁ CADASTRADO NA NOSSA FILA DE ESPERA' );
            break;
        }
    }
}


function buscaStorage () {
    // BUSCA NO STORAGE, E CASO NÃO TENHA NADA CRIADO ELE RETORNA UM ARRAY VAZIO
    if ( !localStorage.getItem( 'clientes' ) ){
        return [];
    }
    else{ // SE TIVER ALGO ELE RETORNA AS INFORMAÇÕES QUE ESTÃO LÁ 
        return JSON.parse(localStorage.getItem( 'clientes' ) );
    }     
} 

