// Pegar o elemento canvas pelo id
const canvas = document.getElementById('jogo');
// Inicializar o canvas / ctx igual ao contexto do canvas
const ctx = canvas.getContext('2d');
const gravidade = 0.5;

// Evento para pular com a tecla 'Space'
document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && personagem.pulando == false) {
        console.log('clicou para pular');
        personagem.velocidadey = 15;
        personagem.pulando = true;
    }
});

// Evento de clique para reiniciar o jogo
document.addEventListener('click', (e) => {
    if (gameOver) {
        // Reinicia o estado do jogo
        gameOver = false;
        personagem.x = 100;
        personagem.y = canvas.height - 50;
        personagem.velocidadey = 0;
        personagem.pulando = false;
        obstaculo.x = canvas.width - 50;
        obstaculo.y = canvas.height - 100;
        obstaculo.velocidadex = 5;

        // Reinicia o loop
        requestAnimationFrame(loop);
    }
});

// Carregar imagens
const imgPersonagem = new Image();
imgPersonagem.src = './static/download.jpg'; // Substitua pelo caminho da sua imagem

const imgObstaculo = new Image();
imgObstaculo.src = './static/Herobrine.png'; // Substitua pelo caminho da sua imagem

// Definição do personagem
const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidadey: 0,
    pulando: false
};

// Definição do obstáculo
const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 100,
    largura: 50,
    altura: 100,
    velocidadex: 5
};

let gameOver = false; // Variável que controla o estado do jogo

// Função para desenhar o personagem
function desenharPersonagem() {
    ctx.drawImage(imgPersonagem, personagem.x, personagem.y, personagem.largura, personagem.altura);
}

// Função para desenhar o obstáculo
function desenharObstaculo() {
    ctx.drawImage(imgObstaculo, obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

// Função para atualizar a posição do personagem
function atualizarPersonagem() {
    if (personagem.pulando == true) {
        personagem.velocidadey -= gravidade;
        personagem.y -= personagem.velocidadey;
        if (personagem.y >= canvas.height - 50) {
            personagem.velocidadey = 0;
            personagem.pulando = false;
            personagem.y = canvas.height - 50;
        }
    }
}

// Função para atualizar a posição do obstáculo
function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadex; // Muda posição
    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width; // Reposiciona ao final da tela
        obstaculo.velocidadex += 0.2; // Altera a velocidade a cada ciclo
        let nova_altura = (Math.random() * 50) + 100;
        obstaculo.altura = nova_altura; // Atualiza altura
        obstaculo.y = canvas.height - nova_altura;
    }
}

// Função para desenhar o Game Over
function houveColisao() {
    personagem.velocidadey = 0;
    obstaculo.velocidadex = 0; 
    
    // Desenha o fundo de Game Over (um retângulo vermelho)
    ctx.fillStyle = 'red';
    ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 50, 400, 100); // Posiciona o retângulo no centro da tela
    
   
    ctx.fillStyle = 'white'; // Cor do texto
    ctx.font = '48px Arial';
    ctx.fillText('Game Over', (canvas.width / 2) - 120, (canvas.height / 2)); // Posiciona o texto no centro
    
    
    gameOver = true; 
}

// Função para verificar colisão entre o personagem e o obstáculo
function verificarColisao() {
    if (personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y) {
        // Colisão detectada
        gameOver = true; // Ativa o estado de game over
    }
}

// Loop principal
function loop() {
    // Se o jogo acabou, exibe "Game Over" e para o loop
    if (gameOver) {
        houveColisao(); // Exibe Game Over
        return; // Não chama requestAnimationFrame se o jogo acabou
    }

    // Apagar a tela anterior
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar novamente
    desenharPersonagem();
    desenharObstaculo();

    // Atualizar posições
    atualizarPersonagem();
    atualizarObstaculo();

    // Verificar colisão
    verificarColisao();

    // Chama o loop novamente
    requestAnimationFrame(loop);
}

// Iniciar o loop
requestAnimationFrame(loop);
