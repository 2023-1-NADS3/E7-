import express from "express"
const app = express()
const port = process.env.PORT || 3000
import bodyParser from 'body-parser'
import cors from 'cors'

import { encrypt } from './crypt.js'
import { createAccount } from "./createRestaurante.js"
import { verificationUser } from "./verificationUser.js"
import { checkEmail, getRestaurantId, optionsData, restaurantData, returnName } from "./getData.js"
import { changeData, changePassword, changePhoto } from "./changeRestaurantData.js"
import { getItemData } from "./getItemData.js"
import { uploadFile } from "./saveDrive.js"
import { upload } from "./configMulter.js"
import { removeDishControl } from "./deleteItemData.js"
import { addItemOnMenu } from "./addItemOnMenu.js"
import { getDish, getDishes, removeDish, updateItem } from "./editDishs.js"
import { returnResearch } from "./returnResearch.js"
import { getMenuData } from "./getMenuData.js"
import { makeAOrder } from "./makeAOrder.js"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/', function(req, res){
    res.json("Olá!!!")
})

app.post("/createAccount", async function(req, res)
{
    req.body.password = encrypt(req.body.password)
    res.json(await createAccount(req.body))
})

app.post("/login", async function(req, res)
{  
    res.json(await verificationUser(req.body.user))
})

app.post("/getRestaurantName", async function(req, res)
{
    res.json(await returnName(req.body))
})

app.post("/getRestaurantData", async function(req, res)
{
    
    res.json(await optionsData(req.body))
})

app.post("/updateData", async function(req, res)
{
    res.json(await changeData(req.body.restaurantData))
})

app.post("/getItensData", async function(req, res)
{
    res.json(await getItemData(req.body))
})

app.post("/getDishesData", async function(req, res)
{
    res.json(await getDishes(req.body))
})

app.post("/deleteDish", async function(req, res)
{
    res.json(await removeDish(req.body))
})

app.post("/addItemOnMenu", async function(req, res)
{
    res.json(await addItemOnMenu(req.body))
})

app.post("/getDishData", async function(req, res)
{
    res.json(await getDish(req.body.id))
})

app.post("/updateItem", async function(req, res)
{
    res.json(await updateItem(req.body.data))
})

app.post("/removeDishControl", async function(req, res)
{
    res.json(await removeDishControl(req.body))
})

app.post("/searchRestaurants", async function(req, res)
{
    res.json(await returnResearch(req.body.search))
})

app.post("/getRestaurantInfo", async function(req, res)
{
    res.json(await restaurantData(req.body.id))
})

app.post("/getRestaurantId", async function(req, res)
{
    res.json(await getRestaurantId(req.body.idRestaurant))
})

app.post("/getMenuData", async function(req, res)
{
    res.json(await getMenuData(req.body.id_restaurant, req.body.category))
})

app.post("/makeAOrder", async function(req, res)
{
    res.json(await makeAOrder(req.body.board, req.body.order, req.body.total))
})

app.post("/savePhoto", upload.single('image'), async(req, res) => {
    const msg = await uploadFile(req.file)
    res.json(msg)
})

app.post("/changePhoto", async(req, res) => {
    res.json(await changePhoto(req.body))

})

app.post("/checkEmail", async(req, res) => {
    res.json(await checkEmail(req.body.userEmail))
})

app.post("/newPassword", async(req, res) => {
    req.body.password = encrypt(req.body.password)
    res.json(await changePassword(req.body.password, req.body.id))
})

app.listen(port, () => {
    console.log(`Entrei!!! Porta Usada: ${port}`)
})