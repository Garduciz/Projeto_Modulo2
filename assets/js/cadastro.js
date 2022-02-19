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

const botao = $( '#btnCadastro' );
const inputs = $( 'input' );




// EVENTOS FEITOS DURANDO O CADASTRO 
//====================================================================================================
botao.on( 'click', ( event )=> { // QUANDO O BOTAO CADASTRAR FOR APERTADO ELE EFETUADO AS FUNÇOES PARA CADASTRO
    event.preventDefault();
    confereEmailCadastrado( clientesStorage() );
})

// PREENCHENDO O CAMPO CEP
cep.on( 'change', buscarCep ); // SEMPRE QUE O CAMPO CEP FOR MUDADADO ELE EXECUTA A FUNÇÃO DE BUSCARCEP
//====================================================================================================


// PEGANDO DADOS DO CEP COM A API
//=====================================================================================================
// BUSCANDO O CEP
async function buscarCep(){
    const busca = cep.val();// BUSCA É O VALOR DO CEP DIGITADO QUE A GENTE COLOCA NA REQUISIÇÃO A API
        try{
            const response = await fetch( `https://viacep.com.br/ws/${busca}/json/` ) ;
            // SALVA UMA REQUISIÇÃO RESPONSE NA VARIAVEL RESPONSE ( TAMBEM CHAMADO DE PROMISE)
            const data = await response.json();
            // CONVERTE A REQUISIÇÃO PARA JSON (  OBJETO )
        
            // EXIBE OS DADOS NOS INPUTS
            rua.val( data.logradouro );
            bairro.val( data.bairro );
            cidade.val( data.localidade );
            uf.val( data.uf );
        }
        catch{
            alertaUsuario( cep, 'Falha ao buscar o cep digitado' );
        }
}
//=======================================================================================================


// CRIANDO OBJETOS
//=======================================================================================================
//CRIANDO OBJETO ENDEREÇO
const criaEndereco = ( ) => {
    const endereco = new Endereco( cep.val(), rua.val(), numero.val(), bairro.val(), cidade.val(), uf.val(), complemento.val() );
    return endereco;
}

// CRIANDO OBJETOS CLIENTE
const criaCliente = ( enderecoObjeto, planoEscolhido ) =>{
    const cliente = new Cliente( nome.val(), email.val(), senha.val(), rg.val(), enderecoObjeto, planoEscolhido ); 
    return cliente;
}
//==========================================================================================================


// MANIPULANDO O STORAGE
//=========================================================================================================
// PROCESSO PARA PEGAR DADOS DO STORAGE
const buscaStorage = () =>{
    // BUSCA NO STORAGE, E CASO NÃO TENHA NADA CRIADO ELE RETORNA UM ARRAY VAZIO
    if ( !localStorage.getItem( 'clientes' ) ){
        return []; // NOSSO ARRAY VAZIO
    }
    else{ // SE TIVER ALGO ELE RETORNA AS INFORMAÇÕES QUE ESTÃO LÁ 
        return JSON.parse( localStorage.getItem( 'clientes' ) );
        // NO STORAGE É SALVO COMO STRING, A GENTE TRAZ COMO ARRAY DE OBJETO PARA A GENTE PODER TRABALHAR
        // POR ISSO O JSON.PARSE
    }     
} 


// COLOCA DADOS NO STORAGE
const salvaStorage = ( cliente ) => {
    localStorage.setItem( 'clientes', JSON.stringify( cliente ) ) ;
    // ENVIA PARA NOSSO STORAGE DE NOME CLIENTES DADOS DO OBJETO CLIENTE 
    // A GENTE PASSA O OBJETO CLIENTE COMO STRING, POR ISSO O STRINGIFY                                                          
}


// CLIENTES DO STORAGE
const clientesStorage = () => {
    const clientes = buscaStorage(); // UTILIZAMOS A FUNCAO PARA PEGAR OS DADOS NO STORAGE E SALVAMOS EM CLIENTES
    return clientes; // RETORNAMOS CLIENTES
}


// COLOCANDO CLIENTE NO STORAGE
const salvaCliente = ( cliente, arrayClientes ) => { // PEGA COMO PARAMETRO O CLIENTE NOVO E O ARRAY COM OS CLIENTES CADASTRADOS
    arrayClientes.push ( cliente ); // ELE ADICIONA AS INFORMÇÕES DO NOVO CLIENTE NO ARRAY DE CLIENTES EXISTENTES
    salvaStorage( arrayClientes ); // ELE MANDA O ARRAY DE CLIENTES SALVOS PARA O STORAGE

    alert( ` Parabéns ${ arrayClientes[ arrayClientes.length-1].nome }, seu cadastro foi efetuado com sucesso com o plano: ${ arrayClientes[ arrayClientes.length-1 ].plano }` );
    window.location.href = 'index.html'
}
//=========================================================================================================


// ESCOLHA DO PLANO
//=========================================================================================================
const conferindoPlano = () =>{
    for (let i = 0; i < inputs.length; i++) { // ELE BUSCA EM TODOS OS INPUS
        if( inputs[i].checked === true){ // SE O INPUT TIVER TICADO (SOMENTE OS DOS PLANOS PODEM SER TICADOS)
            return inputs[i].value ; // ELE TRAS O VALOR DETERMINADO NO INPUT, NO HTML PODE VER DENTRO DA PROPRIA TAG
        }    
    }
}
//=========================================================================================================

//MENSAGEM ALERTANDO O CLIENTE REFERENTE A ALGUM ERRO DURANTE O CADASTRO
//====================================================================================================
const alertaUsuario = ( input, text ) => {
    input.focus();
    $( '.validador' ).text( text ).css( 'color', 'red' );
}
//=====================================================================================================


//CONFERINDO TODOS OS CAMPOS
//========================================================================================================
const conferindoDados = () =>{
    if( !nome.val() || !email.val() || !senha.val() || !rg.val() || !cep.val() ){// CONFERE SE TODOS OS CAMPOS ESTÃO PREENCHIDOS
        alertaUsuario( nome, 'Preencha corretamente todos os campos !!' )
    }
    else if( senha.val() !== senhaConfirmacao.val() ){ // CONFERE SE AS SENHAS SÃO IGUAIS
        alertaUsuario( senha, 'As senhas não conferem !!' )
    }
    else if ( rg.val().length !== 10 ){ // CONFERE SE RG É MAIOR QUE 10
        alertaUsuario( rg, 'Tamanho do rg é invalido !!' );
    }
    else if( !email.val().includes( '@' && '.com' ) ){ // CONFERE SE EMAIL POSSUI @ E .COM
        alertaUsuario( email, 'Insira um email valido !!' );
    }
    else{ // SE NÃO TIVER NENHUM PROBLEMA COM AS CONDIÇÕES A CIMA ELE EXECUTA O PROCESSO DE CADASTRO
        salvaCliente( criaCliente( criaEndereco(), conferindoPlano() ), clientesStorage() );
    }
}
//======================================================================================================


// CONFERINDO SE O EMAIL JÁ ESTA CADASTRADO NO STORAGE
//======================================================================================================
const confereEmailCadastrado = ( clientes ) => {
    let emailExistente = false; // BOLENO QUE A GENTE VAI USAR PARA VERIFICAR SE O EMAIL JÁ ESTÁ CADASTRADO
    
    if( clientes.length >= 1){ // SE O ARRAY CLIENTES TIVER ALGUM ELEMENTO ELE EXECUTA O CODIGO ABAIXO
        for (let i = 0; i < clientes.length ; i++) { // FOR PARA PASSAR POR TODOS OS ELEMENTOS DO ARRAY
            if ( clientes[i].email === email.val() ) { //ELE FAZ UMA COMPARAÇÃO DOS EMAILS DOS ELEMENTOS, COM O EMAIL DIGITADO NO INPUT EMAIL
                emailExistente = true; // EMAILEXISTENTE PASSA A SER VERDADEIRO
                break
            }else{
                emailExistente = false; // EMAIL EXISTENTE CONTINUA SENDO FALSO
            }
        }
    }
    
    //CONDICIONAL BASEADO NO EMAILEXISTENTE, O BOLEANO
    if ( emailExistente ) {// SE EMAIL EXISTENTE FOR VERDADEIRO, ELE AVISA A O USUARIO
        alertaUsuario( email, 'Email já está em uso, tente outro !!' )
    } else {
        conferindoDados(); // SE FOR FALSO ELE EXECUTA O PROCESSO DE CADASTRO
    }
}
//=====================================================================================================


// CRIANDO CLASSES
//=====================================================================================================
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
//======================================================================================================