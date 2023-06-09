import { closeDB, openDB } from './configDB.js'

export async function addItemOnMenu(itemData)
{
    let activated = 0
    if(itemData.activated)
    {
        activated = 1
    }
    try {
        const db = await openDB()
        await db.run("INSERT INTO menuData (id_restaurant, dish_name, description, image, category, price, activated) VALUES (?,?,?,?,?,?,?)",
        [
            itemData.idRestaurant,
            itemData.dishName,
            itemData.description,
            itemData.imageURL,
            itemData.category,
            itemData.price,
            activated
        ])
        await closeDB()
        return true
    } catch (error) {
        console.log(error)
        return error
    }
}


async function testAddItemOnMenu(item, esp)
  {
    const enc = await addItemOnMenu(item)
    if(enc === esp)
    {
      return "Pedido cadastrado com sucesso no banco de dados!!!"
    }
    else
    {
      return `Erro ao cadastrar o pedido. Erro: ${enc}!!!`
    }
  }

  const item = {
    idRestaurant: 1,
    dishName: 'Macarrão',
    description: 'Macarrão com Molho Verde',
    imageURL: '1DBGw5tyRTCz538sQEBG2gB19d7BnOTCZ',
    price: 12,
    activated: true,
  }

console.log(await testAddItemOnMenu(item, true))