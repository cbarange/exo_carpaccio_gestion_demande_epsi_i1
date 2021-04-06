const readline = require('readline')
const rl = readline.createInterface({input: process.stdin, output: process.stdout})
const question = question_text =>  new Promise((resolve, reject) => rl.question(question_text, answer => resolve(answer))) 

const tva_by_countrycode = [{code:'BE', value:21},{code:'FR', value:20},{code:'US', value:8.75},{code:'CH', value:7.7},{code:'UK', value:17.5},{code:'ES', value:21}]

async function main(){
  let state_code
  do{
    state_code = await question(`Veuillez saisir le code d'état ? ${tva_by_countrycode.map(e=>e.code).join`/`}`).then(response=>tva_by_countrycode.reduce((r,e)=>e.code.toLowerCase()==response.toLowerCase().trim()?r=e:r=r,undefined))
  }while(!state_code || !tva_by_countrycode.map(e=>e.code.toLowerCase()).includes(state_code.code.toLowerCase().trim()))

  console.log(`La tva du pays choisi est : ${state_code.value}`)

  let articles = []
  let article
  do{
    article=await question(`Saisir article ${articles.length+1}: `)
    if(article && article!='fin'){
      let price
      do{
        price = await question(`Saisir le prix de l'article ${articles.length+1}: `)
      }while(isNaN(price))
      articles.push({article:article,price:price})
    }
  }while(article!=='fin')

  rl.close()
}

if(process.env.NODE_ENV!='test')
  main()

module.exports = main