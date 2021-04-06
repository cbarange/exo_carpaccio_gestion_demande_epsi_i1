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

  console.log(['--- Tableau TVA ---',...tva_by_countrycode.map(e=>`${e.code} = ${e.value}`)].join`\n`)

  let articles = []
  let article
  do{
    article=await question(`Saisir article ${articles.length+1}: `)
    if(article && article!='fin'){
      let price
      do{
        price = await question(`Saisir le prix de l'article ${articles.length+1}: `)
      }while(isNaN(price))

      let quantity
      do{
        quantity = await question(`Saisir la quantité de l'article ${articles.length+1}: `)
      }while(isNaN(quantity))

      articles.push({article:article, price:price, quantity:quantity})
    }
  }while(article!=='fin')

  console.log(`La somme total H.T : ${articles.reduce((r,e)=>r+=e.price*e.quantity,0)}`)
  console.log(`La TVA total : ${articles.reduce((r,e)=>r+=e.price*e.quantity,0)*((state_code.value/100))}`)
  console.log(`La somme total T.T.C : ${articles.reduce((r,e)=>r+=e.price*e.quantity,0)*(1+(state_code.value/100))}`)

  rl.close()
}

if(process.env.NODE_ENV!='test')
  main()

module.exports = main