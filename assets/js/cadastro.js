const nome = $( '#nome' );
const email = $( '#email' );
const senha = $( '#senha' );
const senhaConfirmacao = $( '#senhaConfirm');
const rg = $( '#rg' );
const cep = $( '#cep' );
const rua = $( '#rua' );
const numero = $( '#numero' );
const bairro = $( ' #bairro' );
const cidade = $( '#cidade' );
const uf = $( '#uf' );
const complemento = $( '#complemento' );

const testando = JSON.parse(localStorage.getItem( 'clientes' ) )
console.log( testando[testando.length-1].nome )

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

        rua.val( endereco.logradouro );
        bairro.val( endereco.bairro );
        cidade.val( endereco.localidade );
        uf.val( endereco.uf );
    })
}


//--------------------------------------------------------------------------------------------------
//CRIANDO OBJETO ENDEREÇO
const criaEndereco = ( ) => {
    const endereco = new Endereco( cep.val(), rua.val(), numero.val(), bairro.val(), cidade.val(), uf.val(), complemento.val() );
    return endereco;
}


//----------------------------------------------------------------------------------------------------
// CRIANDO OBJETOS CLIENTE
const criaCliente = ( enderecoObjeto, planoEscolhido ) =>{
    const cliente = new Cliente( nome.val(), email.val(), senha.val(), rg.val(), enderecoObjeto, planoEscolhido ); 
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
    alert( ` Parabéns ${ clientes[clientes.length-1].nome }, seu cadastro foi efetuado com sucesso com o plano: Focus ${ clientes[clientes.length-1].plano }` );
    window.location.href = 'sobre.html'
}


//----------------------------------------------------------------------------------------------------
//CONFERE A ESCOLHA DO PLANO
const conferindoPlano = () =>{
    for (let i = 0; i < inputs.length; i++) { // ELE BUSCA EM TODOS OS INPUS
        if( inputs[i].checked === true){ // SE O INPUT TIVER TICADO (SOMENTE OS DOS PLANOS PODEM SER TICADOS)
            return inputs[i].value ; // ELE TRAS O VALOR DETERMINADO NO INPUT, NO HTML PODE VER DENTRO DA PROPRIA TAG
        }    
    }
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
        salvaCliente( criaCliente( criaEndereco(), conferindoPlano() ) );
    }
}

//----------------------------------------------------------------------------------------------------
// LIMPANDO DADOS 


//-------------------------------------------------------------------------------------------------------
// Classes
class Cliente{
    constructor( nome, email, senha, rg, endereco, plano ){
        this.nome = nome,
        this.email = email,
        this.senha = senha,
        this.rg = rg,
        this.endereco = endereco,
        this.plano = plano
    }
}

class Endereco{
    constructor( cep, rua, numero, bairro, cidade, uf, complemento){
        this.cep = cep,
        this.rua = rua,
        this.numero = numero,
        this.bairro = bairro,
        this.cidade = cidade,
        this.uf = uf, 
        this.complemento = complemento
    }
}


