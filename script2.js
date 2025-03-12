const canvas = document.getElementById('jogo');
// Inicializar o canvas / ctx igual ao contexto do canvas
const ctx = canvas.getContext('2d');
let gameOver = false;

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && !personagem.pulando) {
        personagem.saltar();
    }
});


class Entidade {
    #gravidade;
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5;
    }

    get gravidade() {
        return this.#gravidade;
    }

    desenhar(cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }

    desenharObs(cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}


class Personagem extends Entidade {
    #pulando;
    #velocidadey;

    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.#velocidadey = 0;
        this.#pulando = false;
    }

    saltar() {
        if (!this.#pulando) { 
            console.log('clicou para pular');
            this.#velocidadey = 15; 
            this.#pulando = true;
            console.log('saltou');
        }
    }

    get pulando() {
        return this.#pulando;
    }

    atualizarPersonagem() {
        if (this.#pulando) {
            this.#velocidadey -= this.gravidade; // Aplica a gravidade no personagem
            this.y -= this.#velocidadey; // Move o personagem para cima
            if (this.y >= canvas.height - this.altura) { // Quando chega no chão
                this.y = canvas.height - this.altura; // Define a posição do chão
                this.#velocidadey = 0; // Para o movimento vertical
                this.#pulando = false; // Termina o salto
            }
        }
    }
}

// Classe para Obstaculo
class Obstaculo extends Entidade {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.velocidadex = 5;
    }

    atualizarObstaculo() {
        obstaculo.x -= obstaculo.velocidadex; // Muda posição
        if (obstaculo.x <= 0 - obstaculo.largura) {
            obstaculo.x = canvas.width; // Reposiciona ao final da tela
            obstaculo.velocidadex += 0.2; // Altera a velocidade qunado conclui um ciclo
            let nova_altura = (Math.random() * 50) + 100;
            obstaculo.altura = nova_altura; // Atualiza altura
            obstaculo.y = canvas.height - nova_altura;
        }
    }
}

const personagem = new Personagem(100, canvas.height - 50, 50, 50);
const obstaculo = new Obstaculo(canvas.width - 60, canvas.height - 50, 60, 50);

// Função para o loop do jogo
function loop() {
    if (gameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    personagem.atualizarPersonagem();
    personagem.desenhar('black'); 

    obstaculo.atualizarObstaculo(); 
    obstaculo.desenharObs('red'); 

    // Continuar o loop
    requestAnimationFrame(loop);
}

// Iniciar o loop
requestAnimationFrame(loop);
