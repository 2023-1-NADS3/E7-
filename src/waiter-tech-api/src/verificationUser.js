import { openDB } from './configDB.js'
import { comparePasswords } from './crypt.js';

export async function verificationUser(userData) {
    try {
        const db = await openDB();
        const userTeste = await db.get(`SELECT * FROM restaurantUserData WHERE email='${userData.email}'`);

        if(userTeste != undefined)
        {
            if(comparePasswords(userData.password, userTeste.password))
            {
                return {
                    id: userTeste.ID,
                    status: true,
                }
            }
            else
            {
                return "Email e/ou Senha incorretos!!!"
            }
        }
        else
        {
            return "Email e/ou Senha incorretos!!!"
        }
        } catch (err) {
            return err
        }
  }