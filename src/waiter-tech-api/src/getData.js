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


async function testGetIDFunction(id, esp)
{
    const idEnc = await getRestaurantId(id)
    if(idEnc === esp)
    {
        return "O Restaurante com esse ID está cadastrado no banco de dados do sistema!"
    }
    else
    {
        return "Não existe nenhum usuário cadastrado com esse ID no banco de dados!"
    }
}

// console.log(await testGetIDFunction(1, true))
// //Retorna OK, pois existe um restaurante com esse ID
// console.log(await testGetIDFunction(12, true))
// //Retorna um erro, dizendo que o restaurante não existe no sistema

async function testReturnNameFunction(id, esp)
{
    const nameEnc = await returnName(id) || ''
    if(nameEnc.restaurant_name != undefined)
    {
        if(nameEnc.restaurant_name === esp)
        {
            return `Nome do Restaurante: ${nameEnc.restaurant_name}`
        }
        else if(nameEnc.restaurant_name != esp)
        {
            return `O ID informado retorna ${nameEnc.restaurant_name}, e não ${esp}!!!`
        }
    }
    else
    {
        return "Não existe nenhum restaurante cadastrado com o ID informado!!!"
    }
}

console.log(await testReturnNameFunction({id: 1}, "Teste Alpha/Beta"))
//Retorna ok, já que o ID é de um restaurante cadastrado, e o nome para comparação está correto
console.log(await testReturnNameFunction({id: 1}, "Teste Alpha"))
//Retorna um erro, já que o ID informado existe no banco de dados, mas o nome comparado está errado
console.log(await testReturnNameFunction({id: 12}, "Teste Alpha/Beta"))
////Retorna um erro, já que o ID informado não existe no banco de dados, mesmo o nome estando correto

