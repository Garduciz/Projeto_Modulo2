const nome = $( '#nome' );
const email = $( '#email' );
const senha = $( '#senha');
const senhaConfirmacao = $( '#senhaConfirm');
const rg = $( '#rg' );
const cep = $( '#cep' );
const botao = $( '#btnCadastro' );
const test = '41185210';

const localStorageTransactions = JSON.parse(localStorage.getItem( 'array' ))
var array = []

// BUSCANDO O CEP

const buscarCep = () =>{
    const busca = cep.val();

    $.getJSON(`https://viacep.com.br/ws/${busca}/json/`, ( endereco ) => {
        console.log( endereco )

        $( '#rua' ).val( endereco.logradouro );
        $( '#bairro' ).val( endereco.bairro );
        $( '#cidade' ).val( endereco.localidade );
        $( '#uf' ).val( endereco.uf );
    })
}

cep.on( 'change', buscarCep)

// SALVANDO DADOS

botao.on( 'click', (event) => {
    event.preventDefault();
   
    // let cliente = new Cliente( nome.val(), email.val() )
    // clientes.push( cliente )

    // console.log(clientes)

    let i = 0;
    //let test = prompt()

    array.push( test )
    console.log( array )
    console.log(localStorageTransactions)
})

class Cliente{
    constructor( nome, email, senha, rg, endereco ){
        
        endereco = new Endereco
        
        this.nome = nome,
        this.email = email,
        this.senha = senha,
        this.rg = rg,
        this.endereco = endereco
        
    }
}

class Endereco{
    constructor( rua, numero, bairro, cidade, estado ){
        this.rua = rua,
        this.numero = numero,
        this.bairro = bairro,
        this.cidade = cidade,
        this.estado = estado
    }
}

const endereco1 = new Endereco( 'são Geraldo', 57, 'São Gonçalo', 'Salvador', 'BA' )
console.log( endereco1 )

const cliente1 = new Cliente( 'Matric', 'email', 'senha', 'rg' );

cliente1.endereco = endereco1;

console.log( cliente1 );
console.log( cliente1.endereco );



