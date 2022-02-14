const botaoCaminhadaBasica = $( '#btnCaminhadaBasica' );
const botaoCaminhadaSuficiente = $( '#btnCaminhadaSuficiente' );
const botaoCaminhadaCompleta = $( '#btnCaminhadaCompleta' );

const dadosStorage = JSON.parse( localStorage.getItem( 'clientes' ) );

botaoCaminhadaBasica.on( 'click', function(event) {
    event.preventDefault()
    dadosStorage[dadosStorage.length-1].plano = 'Caminhada Basica';
})

botaoCaminhadaSuficiente.on( 'click', function(event) {
    event.preventDefault()
    dadosStorage[dadosStorage.length-1].plano = 'Caminhada Suficiente';
})

botaoCaminhadaCompleta.on( 'click', function(event) {
    event.preventDefault()
    dadosStorage[dadosStorage.length-1].plano = 'Caminhada Completa';
})