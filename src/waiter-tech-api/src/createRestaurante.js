import { openDB } from './configDB.js'
import { encrypt } from './crypt.js'

export async function createAccount(restaurantData) {
    try {
      const db = await openDB()
      await db.run(
        "INSERT INTO restaurantUserData (email, restaurant_name, cpf_cnpj, password, address, contact, time, image) VALUES (?,?,?,?,?,?,?,?)",
        [
          restaurantData.email,
          restaurantData.restaurantName,
          restaurantData.cpf_cnpj,
          restaurantData.password,
          '-',
          '-',
          '-',
          '1DBGw5tyRTCz538sQEBG2gB19d7BnOTCZ'
        ]
      )
      return {
        response: `${restaurantData.restaurantName} cadastrado com sucesso!!!`,
        status: true
      }
    } catch (err) {
        const error =  err.message.split(": ")[2].split(".")[1]
        return error
    }
  }

  async function testCreateAccount(user, esp)
  {
    user.password = encrypt(user.password)
    const enc = await createAccount(user)
    if(enc.status === esp)
    {
      return "Restaurante cadastrado com sucesso no banco de dados!!!"
    }
    else
    {
      return `Erro ao cadastrar novo restaurante. Erro: ${enc} já cadastrado!!!`
    }
  }

  const user = {
    email: 'alphaTeste@gmail.com',
    restaurantName: 'Teste teste',
    cpf_cnpj: '123414454214',
    password: '@Teste1234'
  }

console.log(await testCreateAccount(user, true))