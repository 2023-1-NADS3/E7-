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
                return "Esse usuário existe no sistema, porém, sua senha está incorreta!!!"
            }
        }
        else
        {
            return "Esse email não está cadastrado no sistema!!!"
        }
        } catch (err) {
            return err
        }
  }


  async function testVerificationUser(user, esp)
  {
    const enc = await verificationUser(user)
    if(enc.status === esp)
    {
        return "Esse usuário existe no sistema, e os dados de acessos estão corretos"
    }
    else
    {
        return enc
    }
  }

  console.log(await testVerificationUser({password: "@Jd090722", email: "alphabeta@gmail.com"}, true))
  //Retorna um OK, já que existe
  console.log(await testVerificationUser({password: "@Jd09072022", email: "alphabeta@gmail.com"}, true))
  //Retorna um erro, já que a senha está incorreta
  console.log(await testVerificationUser({password: "@Jd090722", email: "alphabetagama@gmail.com"}, true))
  //Retorna um erro, já que o email está incorreto