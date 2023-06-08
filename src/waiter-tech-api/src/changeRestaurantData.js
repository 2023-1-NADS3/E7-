import { closeDB, openDB } from './configDB.js'
import { removeFile } from './saveDrive.js'

export async function changeData(data)
{
    let dbString = 'UPDATE restaurantUserData SET'

    if(data.restaurantName)
    {
        dbString += ` restaurant_name = '${data.restaurantName}',`
    }
    if(data.address)
    {
        dbString += ` address = '${data.address}',`
    }
    if(data.contact)
    {
        dbString += ` contact = '${data.contact}',`
    }
    if(data.time)
    {
        dbString += ` time = '${data.time}',`
    }

    dbString = dbString.slice(0, -1)
    dbString += ` WHERE id = ${data.id}`

    try {
        const db = await openDB()
        await db.run(dbString)
        await closeDB()
        return 'Dados alterados com sucesso'
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function changePhoto(data)
{
    try {
        const db = await openDB()
        const oldImage = await db.get(`SELECT image from restaurantUserData WHERE ID='${data.idRestaurant}'`)
        
        if(oldImage.image === '1DBGw5tyRTCz538sQEBG2gB19d7BnOTCZ')
        {
            await db.run(`UPDATE restaurantUserData SET image='${data.idPhoto}' WHERE ID='${data.idRestaurant}'`)
        }
        else
        {
            await db.run(`UPDATE restaurantUserData SET image='${data.idPhoto}' WHERE ID='${data.idRestaurant}'`)
            console.log(await removeFile(oldImage.image))
        }

        return true
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function changePassword(password, id)
{
    try {
        const db = await openDB()
        await db.run(`UPDATE restaurantUserData SET password='${password}' WHERE ID='${id}'`)
        return true
    } catch (error) {
        console.log(error)
        return error
    }
}