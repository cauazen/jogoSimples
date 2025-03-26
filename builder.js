class Hamburguer{
    constructor(pao, carne, queijo, salada, molho){
        this.pao = pao;
        this.carne = carne;
        this.queijo = queijo;
        this.salada = salada;
        this.molho = molho

    }

    getDescricao(){
        return `Hamburguer com pao ${this.pao}, carne ${this.carne}, queijo ${this.queijo}, 
         ${this.salada? 'com salada': 'sem salada'}, molho ${this.molho}`
    }
}
const burguer = new Hamburguer('trigo', 'carne', 'prato', false, 'maionese verde')
console.log(burguer.getDescricao())


// metodo  builder

class HamburguerBuilder{
    constructor(){
        this.pao = 'tradicional';
        this.carne = 'bovina';
        this.queijo = 'mussarela';
        this.salada = true;
        this.molho = 'ketchup'
    }
    setPao(pao){
        this.pao = pao;
        return this;
    }
    setCarne(carne){
        this.carne = carne;
        return this;
    }
    setQueijo(queijo){
        this.queijo = queijo;
        return this;
    }
    setMolho(molho){
        this.molho = molho;
        return this;
    }
    addSalada(){
        this.salada = !this.salada
        return this
    }
}
const burguer2 = new HamburguerBuilder()
burguer2.setPao('integral')
burguer2.setMolho('maionese')
console.log(burguer2)