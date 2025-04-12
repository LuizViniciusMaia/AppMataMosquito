//Verificando as dimensões da página caso haja uma mudança de tamanho
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var nivel = window.location.search // .search verifica tudo que há a direita da interrogação, no caso aqui está sendo passado o nivel do game, por exemplo ?normal
nivel = nivel.replace('?','') //apenas substituindo o ? dos niveis e para NULL

var tempoCriaMosquito = 1500


if(nivel === 'normal') {
    tempoCriaMosquito = 1500
} else if(nivel === 'dificil') {
    tempoCriaMosquito = 1000
} else if(nivel === 'chucknorris') {
    tempoCriaMosquito = 750
}

function DimensaoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

DimensaoJogo()

//Lógica para o Cronometro
var cronometro = setInterval(function() {
    
    tempo -= 1
    if(tempo < 0){
        clearInterval(cronometro) //utilizado para não ficar repetindo o fluxo de vitoria
        clearInterval(criaMosquito) //encerrando o fluxo de criação de mosquito aṕos vencer o game
        window.location.href = 'vitoria.html'   
    } else {
        document.getElementById('cronometro').innerHTML = tempo //O atributo innerHTML serve para verificar tudo que está dentro das TAGS, nesse exemplo dentro da tag <span>
    }    
}, 1000)




//Lógica de Randomização do mosquito

function PosicaoRandomica(){
   
    //Removendo o mosquito anterior (caso exista, já que se for a primeira execução, não haverá mosquito)]
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()
        //Lógica para a troca de coração cheio para coração vazio
        
        if (vidas > 3) {
           window.location.href = 'fim_de_jogo.html'
        }else{
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png" //a cada ciclo que passa o valor de vida sobe, formando v1, v2 e v3, que são meus IDs, substituindo a origem da imagem para a imagem de coração vazio.
            vidas++
        }
    }       
   
    var posicaoX = Math.floor(Math.random() * largura)  - 90 //o comando Math atua entre 0 e 1, para que atue dentro de toda a area da pagina, foi necessario multiplicar pelas dimensões
    var posicaoY = Math.floor(Math.random() * altura)  - 90 // foi-se necessário subtrair -90 porque as vezes a imagem ia muito para o canto, e devido o tamanho, uma parte ficava fora da tela, criando uma barra de rolagem.

    posicaoX = posicaoX < 0 ? 0 : posicaoX //lógica para nunca ter valores menores que 0.
    // se X for menor do que 0, recebe 0, se não, recebe o proprio X.
    posicaoY = posicaoY < 0 ? 0 : posicaoY
    // se Y for menor do que 0, recebe 0, se não, recebe o proprio Y.

    console.log(posicaoX, posicaoY)

    //Criar Elemento HTML
    var mosquito = document.createElement('img') //usando o metodo document.creatElement para criar de forma dinâmica
    mosquito.src = 'imagens/mosquito.png' //importando a imagem do mosquito
    mosquito.className = TamanhoAleatorio() + ' ' + LadoAleatorio() //Chamando minha função com mosquitos diferentes e olhando para lados diferentes. É necessário concatenar com um espaço no meio, porque ao receber mosquito1ladoA, o interpretador irá entender como String.
    mosquito.style.left = posicaoX + 'px' //Javascript espera que seja informado a medida, seja px, % ou em. //.style.left serve para movimentar o elemento na horizontal
    mosquito.style.top = posicaoY + 'px' // .style.top serve para movimentar o elemento na vertical
    mosquito.style.position = 'absolute' // é necessário que seja absolute para que os comandos .left e .top funcionem, o elemento será movido a partir do elemento pai, caso não haja um, será usado o <body>
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        this.remove() //this é usado para ajustar o contexto de um atributo ou metodo, ele faz referencia ao proprio elemento html que executa a função.
    }


// Sempre que for usar .style.top, .style.left, .style.right ou .style.bottom, você precisa definir .style.position com um valor diferente de static, 
// caso contrário, esses comandos não terão efeito.

    document.body.appendChild(mosquito)

// O comando document.body.appendChild(elemento) em JavaScript adiciona um elemento ao final do corpo (<body>) da página. 
// Isso significa que o novo elemento será colocado depois de todos os outros elementos dentro de <body>    

}

function TamanhoAleatorio(){ //função criada para variar o tamanho da mosca
    var classe = Math.floor(Math.random() * 3) // como os valores variam de 0 até bem proximo de 1, é multiplicado por 3 para que seja entre 0 e 2

    switch(classe){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }

}

function LadoAleatorio(){ //Função criada para que o mosquito aparece olhando as vezes para a direita ou esquerda, criando dinamismo na aplicação.
    var classe = Math.floor(Math.random() * 2) 

    switch(classe){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
