import { closeDB, openDB } from './configDB.js'

export async function getMenuData(idRestaurant, category)
{
    try {
        const db = await openDB()
        const data = await db.all(`SELECT ID, id_restaurant, dish_name, description, image, price, activated FROM menuData WHERE id_restaurant = '${idRestaurant}' AND category= '${category}' LIMIT 100`)
        await closeDB()
        return data
    } catch (err) {
        console.log(err)
        return err
    }
}