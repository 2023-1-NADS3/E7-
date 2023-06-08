import { closeDB, openDB } from './configDB.js'

export async function removeDishControl(infos)
{
    try {
        const db = await openDB()
        await db.all(`DELETE FROM checkData WHERE id_restaurant='${infos.idRestaurant}' AND board='${infos.board}'`)
        await closeDB()
        return true
    } catch (err) {
        console.log(err)
        return err
    }
}