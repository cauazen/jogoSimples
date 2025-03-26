class Loja {
    constructor(){
        this.assinantes = []
    }
    assinar(usuario){
        this.assinantes.push(usuario)
    }
    cancelarAssinatura(){
        // remover o usuario da lista
    }
    notificar(){
        this.assinantes.forEach(assinante => assinante.update(novaMSG))
    }
}
class Pessoa{
    constructor(nome){
        this.nome = nome
    }
    update(novaMSG){
        console.log(`${this.nome} foi notificado com ${novaMSG}`)
    
    }
}

const loja = new Loja()
const pessoa = new Pessoa('jorge')
const pessoa2 = new Pessoa('bruno')
const pessoa3 = new Pessoa('dio')
loja.assinar(pessoa)
loja.assinar(pessoa3)
loja.notificar('enviando a primeira notificação')