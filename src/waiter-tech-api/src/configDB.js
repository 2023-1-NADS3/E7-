import pkg from 'sqlite3'
const { sqlite3 } = pkg
import { open } from 'sqlite'

export async function openDB ()
{
    return open ({
        filename: './restaurantUserTable.db',
        driver: pkg.Database
    })
}

export async function closeDB() {
    const db = await openDB()
    await db.close()
}