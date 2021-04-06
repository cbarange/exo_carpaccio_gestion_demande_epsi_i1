const readline = require('readline')
const rl = readline.createInterface({input: process.stdin, output: process.stdout})
const question = question_text =>  new Promise((resolve, reject) => rl.question(question_text, answer => resolve(answer))) 

const tva_by_countrycode = [{code:'BE', value:21},{code:'FR', value:20},{code:'US', value:8.75},{code:'CH', value:7.7},{code:'UK', value:17.5},{code:'ES', value:21}]

async function main(){
  let state_code
  do{
    state_code = await question(`Veuillez saisir le code d'état ? ${tva_by_countrycode.map(e=>e.code).join`/`}`).then(response=>tva_by_countrycode.reduce((r,e)=>e.code.toLowerCase()==response.toLowerCase().trim()?r=e:r=r,undefined))
  }while(!state_code || !tva_by_countrycode.map(e=>e.code.toLowerCase()).includes(state_code.code.toLowerCase().trim()))

  console.log("La tva du pays choisi est :")
  console.log(state_code.value)

  rl.close()
}

if(process.env.NODE_ENV!='test')
  main()

module.exports = main