const readline = require('readline')
const rl = readline.createInterface({input: process.stdin, output: process.stdout})
const question = question_text =>  new Promise((resolve, reject) => rl.question(question_text, answer => resolve(answer))) 

const tva_by_countrycode = [{code:'BE', value:21},{code:'FR', value:20},{code:'US', value:8.75},{code:'CH', value:7.7},{code:'UK', value:17.5},{code:'ES', value:21}]
const reduction_by_price = [{price:'1000', value:3}, {price:'5000', value:5}, {price:'7000', value:7}, {price:'10000', value:10}, {price:'50000', value:15}]


async function main(){
  let state_code
  do{
    state_code = await question(`Veuillez saisir le code d'état ? ${tva_by_countrycode.map(e=>e.code).join`/`} `).then(response=>tva_by_countrycode.reduce((r,e)=>e.code.toLowerCase()==response.toLowerCase().trim()?r=e:r=r,undefined))
  }while(!state_code || !tva_by_countrycode.map(e=>e.code.toLowerCase()).includes(state_code.code.toLowerCase().trim()))
  console.log(`La tva du pays choisi est : ${state_code.value}`)

  console.log(['--- Tableau TVA ---',...tva_by_countrycode.map(e=>`${e.code} = ${e.value}`)].join`\n`)

  let articles = []
  let article
  do{
    article=await question(`Saisir article ${articles.length+1} ou 'fin': `)
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

  let price_ht = articles.reduce((r,e)=>r+=e.price*e.quantity,0)
  console.log(`La somme total H.T avant reduction: ${price_ht}`)

  console.log(`--- Tableau Reduction ---\n${reduction_by_price.map(e=>` >${e.price}=${e.value}`).join`\n`}`)

  let reduction
  reduction = reduction_by_price.reduce((r,e)=>parseInt(e.price)<=price_ht?r=e.value:r=r,undefined)

  console.log(`\n Reduction suggérer : ${reduction?reduction:0}`)
  do{
    reduction = await question(`Saisir le pourcentage de reduction: `)
  }while(isNaN(reduction))
  price_ht = price_ht * (1-(parseFloat(reduction)/100))

  console.log(`La somme total H.T: ${price_ht}`)

  let price_ttc = price_ht*(1+(state_code.value/100))
  console.log(`La TVA total : ${price_ht*((state_code.value/100))}`)
  console.log(`La somme total T.T.C : ${price_ttc}`)

  rl.close()
}

if(process.env.NODE_ENV!='test')
  main()

module.exports = main