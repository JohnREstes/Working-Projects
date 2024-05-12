"use strict"
const api = require('growatt')

const user="Johnnie321"
const passwort="133Utica"
const options={}

async function test() {
  const growatt = new api({})
  let login = await growatt.login(user,passwort).catch(e => {console.log(e)})
  console.log('login:',login)
  let getAllPlantData = await growatt.getAllPlantData(options).catch(e => {console.log(e)})
  console.log('getAllPlatData:',JSON.stringify(getAllPlantData,null,' '));
  let logout = await growatt.logout().catch(e => {console.log(e)})
  console.log('logout:',logout)
}

test()