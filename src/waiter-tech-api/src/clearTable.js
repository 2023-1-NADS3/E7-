import { openDB } from './configDB.js'

export async function clearTable()
{
  try {
    openDB().then(db => {
      db.run('DELETE FROM restaurantUserData');
      db.run("DELETE FROM sqlite_sequence WHERE name='restaurantUserData'")
    })
  } catch (error) {
    console.log(error)
  }
}

clearTable()