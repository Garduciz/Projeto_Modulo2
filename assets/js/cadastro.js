const nome = $( '#nome' );
const email = $( '#email' );
const senha = $( '#senha');
const senhaConfirmacao = $( '#senhaConfirm');
const rg = $( '#rg' );
const cep = $( '#cep' );
const botao = $( '#btnCadastro' );
const test = '41185210';
var array = []

botao.on( 'click', (event) => {
    event.preventDefault();
   
    // let clientes = [];

    // class Cliente{
    //     constructor( nome, email ){
    //         this.nome = nome,
    //         this.email = email
    //     }
    // }
    
    // let cliente = new Cliente( nome.val(), email.val() )
    // clientes.push( cliente )

    // console.log(clientes)

    let i = 0;
    let test = prompt()



    array.push( test )
    console.log( array )
})

cep.on( 'change', ()=>{
    const busca = cep.val();

    $.getJSON(`https://viacep.com.br/ws/${busca}/json/`, ( cep ) => {
        console.log( cep )

        $( '#rua' ).val( cep.logradouro );
        $( '#bairro' ).val( cep.bairro );
        $( '#cidade' ).val( cep.localidade );
        $( '#uf' ).val( cep.uf );
    })
})




