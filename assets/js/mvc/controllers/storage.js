export { clientesStorage, salvaCliente, buscaStorage };


// AÇÃO DE BUSCAR OS CLIENTES SALVOS NO SOTRAGE
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

// AÇÃO DE MANDAR UM CLIENTE NOVO PRO STORAGE
const salvaStorage = ( cliente ) => {
    localStorage.setItem( 'clientes', JSON.stringify( cliente ) ) ;
    // ENVIA PARA NOSSO STORAGE DE NOME CLIENTES DADOS DO OBJETO CLIENTE 
    // A GENTE PASSA O OBJETO CLIENTE COMO STRING, POR ISSO O STRINGIFY                                                          
}


 // SALVANDO OS CLIENTES DO STORAGE EM UM ARRAY
 const clientesStorage = () => {
    const clientes = buscaStorage(); // UTILIZAMOS A FUNCAO PARA PEGAR OS DADOS NO STORAGE E SALVAMOS EM CLIENTES
    return clientes; // RETORNAMOS CLIENTES
}


// SALVANDO UM CLIENTE NOVO E JUNTANDO COM OS CLIENTES JÁ CADASTRADOS
const salvaCliente = ( cliente, arrayClientes ) => { // PEGA COMO PARAMETRO O CLIENTE NOVO E O ARRAY COM OS CLIENTES CADASTRADOS
    arrayClientes.push ( cliente ); // ELE ADICIONA AS INFORMÇÕES DO NOVO CLIENTE NO ARRAY DE CLIENTES EXISTENTES
    salvaStorage( arrayClientes ); // ELE MANDA O ARRAY DE CLIENTES SALVOS PARA O STORAGE

    alert( ` Parabéns ${ arrayClientes[ arrayClientes.length-1].nome }, seu cadastro foi efetuado com sucesso com o plano: ${ arrayClientes[ arrayClientes.length-1 ].plano }` );
    window.location.href = './../index.html'
}