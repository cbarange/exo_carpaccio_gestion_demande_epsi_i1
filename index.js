const readline = require('readline')
const rl = readline.createInterface({input: process.stdin, output: process.stdout})
const question = question_text =>  new Promise((resolve, reject) => rl.question(question_text, answer => resolve(answer))) 

async function main(){
  console.log("Hello World!")

  rl.close()
}

if(process.env.NODE_ENV!='test')
  main()

module.exports = main