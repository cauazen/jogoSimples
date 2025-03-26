class Database{
    constructor(){
        if(!Database.instance){ // se nao existir uma instancia na db
            Database.instance = this // criar ela
        }
        return Database.instance // se existir, retorna a instancia que ja existe

    }
}

const db1 = new Database()
const db2 = new Database()
console.log(db1 === db2)