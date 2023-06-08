import { closeDB, openDB } from './configDB.js'
import { removeFile } from "./saveDrive.js"

export async function getDishes(userID)
{
    try {
        const db = await openDB()
        const data = await db.all(`SELECT ID, dish_name, image FROM menuData WHERE id_restaurant='${userID.id}' LIMIT 100`)
        await closeDB()
        return data
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function removeDish(data)
{
    try
    {
        const db = await openDB()
        const image = await db.get(`SELECT image FROM menuData WHERE id='${data.id}'`)
        await db.all(`DELETE FROM menuData WHERE id='${data.id}'`)
        await closeDB()
        removeFile(image.image)
        return JSON.stringify('Prato excluído com sucesso!!!')
    } catch (err){
        return err
    }
}

export async function getDish(userID)
{
    try {
        const db = await openDB()
        const data = await db.get(`SELECT * FROM menuData WHERE ID='${userID}'`)
        await closeDB()
        return data
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function updateItem(data)
{
    let activated = 0
    if(data.activated)
    {
        activated = 1
    }
    let alterated = false
    try {
        const db = await openDB()
        const oldData = await db.get(`SELECT * FROM menuData WHERE ID='${data.ID}'`)
        if(data.dish_name != oldData.dish_name)
        {
            db.run(`UPDATE menuData SET dish_name = '${data.dish_name}' WHERE ID = ${data.ID}`)
            alterated = true
        }

        if(data.description != oldData.description)
        {
            db.run(`UPDATE menuData SET description = '${data.description}' WHERE ID = ${data.ID}`)
            alterated = true
        }

        if(data.price != oldData.price)
        {
            db.run(`UPDATE menuData SET price = '${data.price}' WHERE ID = ${data.ID}`)
            alterated = true
        }

        if(activated != oldData.activated)
        {
            db.run(`UPDATE menuData SET activated = '${activated}' WHERE ID = ${data.ID}`)
            alterated = true
        }
        await closeDB()
        return alterated
    } catch (err) {
        console.log(err)
        return err
    }
}