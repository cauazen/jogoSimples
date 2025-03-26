class Notificacao{
    enviarNotif(mensagem){
        console.log(mensagem) // enviar a notificação
    }
}
class NotificacaoSMS extends Notificacao{
    enviarNotif(mensagem){
        console.log(`mensagem via SMS ${mensagem}`) // enviar a notificação
    }
}
class NotificacaoEMAIL extends Notificacao{
    enviarNotif(mensagem){
        console.log(`mensagem via EMAIL ${mensagem}`) // enviar a notificação
    }
}
class FactoryNotificacao{
    static criarNotificacao(tipo){
        switch(tipo){
            case 'sms':
                return new NotificacaoSMS()
            case 'email':
                return new NotificacaoEMAIL()
            default:
                throw new Error("tipo desconhecido")
        }
    }
}
const notif = new NotificacaoSMS()
notif.enviarNotif('aqui vai uma mensagem')

const notif2 =FactoryNotificacao.criarNotificacao('email').enviarNotif('aqui vai o email')