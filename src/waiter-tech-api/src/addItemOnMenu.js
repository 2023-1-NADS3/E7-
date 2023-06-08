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