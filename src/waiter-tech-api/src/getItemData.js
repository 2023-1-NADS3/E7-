import { closeDB, openDB } from './configDB.js'

function transformData(data) {
    const result = []
  
    data.forEach((item) => {
      const existingResult = result.find((res) => res.board === item.board)
  
      if (existingResult) {
        existingResult.dishes.push({
          dish: item.dish,
          obs: item.obs,
          quantity: item.quantity,
        });
      } else {
        result.push({
          board: item.board,
          value: item.price,
          ID: item.board,
          dishes: [
            {
              dish: item.dish,
              obs: item.obs,
              quantity: item.quantity,
            },
          ],
        })
      }
    })
  
    return result
  }

export async function getItemData(userID)
{
    try {
        const db = await openDB()
        const data = await db.all(`SELECT * FROM checkData WHERE id_restaurant='${userID.id}' LIMIT 100`)
        await closeDB()
        return transformData(data)
    } catch (err) {
        console.log(err)
        return err
    }
}