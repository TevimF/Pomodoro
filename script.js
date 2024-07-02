
// aqui nós referenciamos as variaveis que vamos usar no código com o querySelector ultilizando o seletor de classe e id
// o querySelector é uma função que nos permite selecionar um elemento do DOM, neste caso, pegamos a classe do elemento que queremos selecionar
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarImg = document.querySelector('#start-pause img')
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioEnd = new Audio('/sons/beep.mp3');
const tempoNaTela = document.querySelector('#timer')
let tempoDecorridoEmSegundos = 1500;
let intervaloId;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
  if(musica.paused){
    musica.play();
  }else {
    musica.pause();
  }
})

focoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto('foco');
  focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto('descanso-curto');
  curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto('descanso-longo');
  longoBt.classList.add('active');
})

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto){
    contexto.classList.remove('active')
  })

  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src', `/imagens/${contexto}.png`);
  switch (contexto){
    // o innerHTML adiciona um conteúdo dentro da tag especificada
    case "foco":
      titulo.innerHTML = ` 
      Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong> `
      break;

    case "descanso-curto":
      titulo.innerHTML = `
      Que tal dar uma respirada? 
        <strong class="app__title-strong">Faça uma pausa curta!</strong>
      ` 
      break;

    case "descanso-longo":
      titulo.innerHTML = `
      Hora de voltar à superfície.
        <strong class="app__title-strong"> Faça uma pausa longa.</strong>
      `
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0){
    audioEnd.play();
    alert('Tempo finalizado');
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -=1;
  mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
  //pause
  if (intervaloId){
    audioPause.play();
    zerar();
    return;
  }
  //play
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarImg.setAttribute('src', '/imagens/pause.png');
  iniciarOuPausarBt.innerHTML = "<strong>Pausar<strong>";
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
  iniciarOuPausarImg.setAttribute('src', '/imagens/play_arrow.png');
  iniciarOuPausarBt.innerHTML = "<strong>Começar<strong>";
}

function mostrarTempo(){
  const tempo = new Date(tempoDecorridoEmSegundos* 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();