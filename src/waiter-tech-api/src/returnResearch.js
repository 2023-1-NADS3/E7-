import { closeDB, openDB } from './configDB.js'

export async function returnResearch(search)
{
    try {
        const db = await openDB()
        const data = await db.all(`SELECT restaurant_name, image, contact, ID FROM restaurantUserData WHERE restaurant_name LIKE '%${search}%'`)
        await closeDB()
        return data
    } catch (err) {
        console.log(err)
        return err
    }
}