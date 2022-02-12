const nome = $( '#nome' );
const email = $( '#email' );
const senha = $( '#senha' );
const senhaConfirmacao = $( '#senhaConfirm');
const rg = $( '#rg' );
const cep = $( '#cep' );
const botao = $( '#btnCadastro' );
const inputs = $( 'input' );

// EVENTOS 
botao.on( 'click', ( event )=> {
    event.preventDefault();
    conferindoDados();
})

cep.on( 'change', buscarCep );

//-------------------------------------------------------------------------------------------------
// BUSCANDO O CEP
function buscarCep(){
    const busca = cep.val();
    $.getJSON(`https://viacep.com.br/ws/${busca}/json/`, ( endereco ) => {
        console.log( endereco )

        $( '#rua' ).val( endereco.logradouro );
        $( '#bairro' ).val( endereco.bairro );
        $( '#cidade' ).val( endereco.localidade );
        $( '#uf' ).val( endereco.uf );
    })
}


//--------------------------------------------------------------------------------------------------
//CRIANDO OBJETO ENDEREÇO
const criaEndereco = ( ) => {
    const endereco = {
        cep: cep.val(),
        rua: $( '#rua' ).val(),
        numero: $( '#numero' ).val(),
        bairro: $( '#bairro' ).val(),
        cidade: $( '#cidade' ).val(),
        estado: $( '#uf' ).val()
    }
    return endereco;
}


//----------------------------------------------------------------------------------------------------
// CRIANDO OBJETOS CLIENTE
const criaCliente = ( enderecoObjeto) =>{
    const cliente = { 
        nome: $( '#nome' ).val(),
        email: $( '#email' ).val(),
        senha: $( '#senha' ).val(),
        rg: $( 'rg' ).val(),
        endereco: enderecoObjeto
    }
    return cliente;
}


//--------------------------------------------------------------------------------------------------
// SALVANDO DADOS
const salvaStorage = ( cliente ) => {
    localStorage.setItem( 'clientes', JSON.stringify( cliente ) ) ;
    // ENVIA PARA NOSSO STORAGE DE NOME CLIENTES DADOS DO OBJETO CLIENTE                                                           
}


//---------------------------------------------------------------------------------------------------
//PEGANDO DADOS
const buscaStorage = () =>{
    // BUSCA NO STORAGE, E CASO NÃO TENHA NADA CRIADO ELE RETORNA UM ARRAY VAZIO
    if ( !localStorage.getItem( 'clientes' ) ){
        return [];
    }
    else{ // SE TIVER ALGO ELE RETORNA AS INFORMAÇÕES QUE ESTÃO LÁ 
        return JSON.parse(localStorage.getItem( 'clientes' ) );
    }     
} 


//----------------------------------------------------------------------------------------------------
// COLOCANDO CLIENTE NO STORAGE
const salvaCliente = ( cliente ) => {
    const clientes = buscaStorage(); // ELE PEGA AS INFORMAÇOES QUE ESTÃO NO STORAGE
    clientes.push ( cliente ); // ELE ADICIONA AS INFORMÇÕES DO NOVO CLIENTE
    salvaStorage( clientes ); // SALVA AS NOVAS INFORMAÇÕES NO STORAGE CLIENTES
    alert( 'Cadastro efetuado com sucesso' );
    window.location.href = 'index.html'
}

//----------------------------------------------------------------------------------------------------
//CONFERE TODOS OS CAMPOS
const conferindoDados = () =>{
    if( !nome.val() || !email.val() || !senha.val() || !rg.val() || !cep.val() ){
        alert( 'PREENCHA TODOS OS CAMPOS' );
    }
    else if( senha.val() !== senhaConfirmacao.val() ){
        alert( 'A SENHAS ESTÃO DIFERENTE' );
    }
    else if ( rg.val().length !== 10 ){
        alert( 'TAMANHO DO RG É INVALIDO')
    }
    else if( !email.val().includes( '@' && '.com' ) ){
        alert( 'INSIRA UM EMAIL VÁLIDO' );
    }
    else{
        salvaCliente( criaCliente( criaEndereco() ) );
    }
}

//----------------------------------------------------------------------------------------------------
// LIMPANDO DADOS 
const limpaDados = () =>{
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ''      
    }
}

console.log( inputs)