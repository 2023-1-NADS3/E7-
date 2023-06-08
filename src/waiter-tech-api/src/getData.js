import { closeDB, openDB } from './configDB.js'
import { sendMail } from './sendEmail.js'

export async function returnName(userID)
{
    try {
        const db = await openDB()
        const data = await db.get(`SELECT restaurant_name FROM restaurantUserData WHERE ID='${userID.id}'`)
        await closeDB()
        return data 
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function optionsData(userID)
{
    try {
        const db = await openDB()
        const data = await db.get(`SELECT * FROM restaurantUserData WHERE ID='${userID.id}'`)
        await closeDB()
        return data 
    } catch (err) {
        return err
    }
}

export async function restaurantData(userID)
{
    try {
        const db = await openDB()
        const data = await db.get(`SELECT restaurant_name, address, contact, time, image FROM restaurantUserData WHERE ID='${userID}'`)
        await closeDB()
        return data 
    } catch (err) {
        return err
    }
}

export async function getRestaurantId(userID)
{
    try {
        const db = await openDB()
        if(await db.get(`SELECT ID FROM restaurantUserData WHERE ID='${userID}'`))
        {
            await closeDB()
            return true
        }
        else
        {
            await closeDB()
            return false
        }
    } catch (err) {
        return err
    }
}

export async function checkEmail(email)
{
    console.log(email)
    try {
        const db = await openDB()
        const data = await db.get(`SELECT ID, email FROM restaurantUserData WHERE email='${email}'`)
        if(data)
        {
            sendMail(data.ID, data.email)
            await closeDB()
            return true
        }
        else
        {
            await closeDB()
            return false
        }
    } catch (err) {
        return err
    }
}