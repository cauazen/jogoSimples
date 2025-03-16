// Pegar o elemento canvas pelo id
const canvas = document.getElementById('jogo');
const ctx = canvas.getContext('2d');

const gravidade = 0.5;
let gameOver = false;

// Carregar imagens
const imgPersonagem = new Image();
imgPersonagem.src = './static/download.jpg';

const imgObstaculo = new Image();
imgObstaculo.src = './static/Herobrine.png';

// Classe base para entidades
class Entidade {
    constructor(x, y, largura, altura, imagem) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.imagem = imagem;
    }

    desenhar() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }
}

// Classe para o personagem
class Personagem extends Entidade {
    #pulando
    #velocidadey
    constructor(x, y, largura, altura, imagem) {
        super(x, y, largura, altura, imagem);
        this.#velocidadey = 0;
        this.#pulando = false;
    }

    saltar() {
        if (!this.#pulando) {
            console.log('clicou para pular');
            this.#velocidadey = 15;
            this.#pulando = true;
        }
    }

    atualizar() {
        if (this.#pulando) {
            this.#velocidadey -= gravidade;
            this.y -= this.#velocidadey;
            if (this.y >= canvas.height - this.altura) {
                this.#velocidadey = 0;
                this.#pulando = false;
                this.y = canvas.height - this.altura;
            }
        }
    }
}

// Classe para o obstáculo
class Obstaculo extends Entidade {
    #velocidadex
    constructor(x, y, largura, altura, imagem) {
        super(x, y, largura, altura, imagem);
        this.#velocidadex = 5;
    }

    atualizar() {
        this.x -= this.#velocidadex;
        if (this.x <= 0 - this.largura) {
            this.x = canvas.width;
            this.#velocidadex += 0.2;
            let nova_altura = (Math.random() * 50) + 100;
            this.altura = nova_altura;
            this.y = canvas.height - nova_altura;
        }
    }
}

// Criar instâncias do personagem e obstáculo
const personagem = new Personagem(100, canvas.height - 50, 50, 50, imgPersonagem);
const obstaculo = new Obstaculo(canvas.width - 50, canvas.height - 100, 60, 100, imgObstaculo);

// Eventos de entrada
document.addEventListener('keypress', (e) => {
    if (e.code === 'Space') {
        personagem.saltar();
    }
});

document.addEventListener('click', () => {
    if (gameOver) {
        gameOver = false;
        personagem.x = 100;
        personagem.y = canvas.height - 50;
        personagem.velocidadey = 0;
        personagem.pulando = false;
        obstaculo.x = canvas.width - 50;
        obstaculo.y = canvas.height - 100;
        obstaculo.velocidadex = 5;
        requestAnimationFrame(loop);
    }
});

// Verificar colisão
function verificarColisao() {
    if (personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y) {
        gameOver = true;
    }
}

// Exibir Game Over
function houveColisao() {
    ctx.fillStyle = 'red';
    ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 50, 400, 100);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.fillText('Game Over', (canvas.width / 2) - 120, (canvas.height / 2));
    gameOver = true;
}

// Loop principal
function loop() {
    if (gameOver) {
        houveColisao();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    personagem.atualizar();
    personagem.desenhar();
    obstaculo.atualizar();
    obstaculo.desenhar();
    verificarColisao();
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
