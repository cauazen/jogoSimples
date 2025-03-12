class Veiculo {
    #velocidade;
    constructor(tipo, marca, cor, velocidade, passageiros) {
        this.tipo = tipo;
        this.marca = marca;
        this.cor = cor;
        this.#velocidade = velocidade;
        this.passageiros = passageiros;
    }

    acelerar() {
        this.#velocidade += 10;
        console.log(`A velocidade do veículo é ${this.#velocidade} km/hr`);
    }

    freiar() {
        if (this.#velocidade > 0) {
            this.#velocidade -= 5;
            console.log(`Velocidade reduzida para ${this.#velocidade} km/hr`);
        } else {
            console.log("O veículo já está parado");
        }
    }

    getVelocidade() {
        return this.#velocidade;
    }

    setVelocidade(velocidade) {
        this.#velocidade = velocidade;
    }
}

class Aviao extends Veiculo {
    #mach;
    constructor(tipo, marca, cor, velocidade, passageiros, companhia) {
        super(tipo, marca, cor, velocidade, passageiros);
        this.companhia = companhia;
        this.#mach = 0; 
    }

    acelerar() {
        this.#mach += 0.1;
        console.log(`A velocidade do Avião é ${this.#mach} mach`);
    }

    freiar() {
        if (this.#mach > 0) {
            this.#mach -= 0.05;
            console.log(`Velocidade reduzida para ${this.#mach} mach`);
        } else {
            console.log("O avião já está parado");
        }
    }

    getVelocidade() {
        return this.#mach;
    }

    setVelocidade(valor) {
        this.#mach = valor;
    }
}

class Barco extends Veiculo {
    #nos;
    constructor(tipo, marca, cor, velocidade, passageiros, marina) {
        super(tipo, marca, cor, velocidade, passageiros);
        this.marina = marina;
        this.#nos = 0; 
    }

    acelerar() {
        this.#nos += 2;
        console.log(`A velocidade do Barco é ${this.#nos} Nos`);
    }

    freiar() {
        if (this.#nos > 0) {
            this.#nos -= 1;
            console.log(`Velocidade reduzida para ${this.#nos} Nos`);
        } else {
            console.log("O barco já está parado");
        }
    }
}

const carro = new Veiculo('SUV', 'Renault', 'Cinza', 0, 0);
const outro_carro = new Veiculo('Sedan', 'Fiat', 'Preto', 0, 0);

outro_carro.acelerar();
carro.acelerar();
carro.acelerar();
carro.freiar();
carro.freiar();
outro_carro.freiar();

const aviao = new Aviao('Comercial', 'Boeing', 'Branco', 0, 0, 'Gol');
aviao.acelerar();
aviao.freiar();
aviao.freiar();
aviao.acelerar();
aviao.setVelocidade(50);
console.log(aviao.getVelocidade()); 

const barco = new Barco('Iate', 'Seila', 'Azul', 0, 0, 'Marina Tal');
barco.acelerar();
barco.acelerar();
barco.freiar();
