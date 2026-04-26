setTimeout(()=>{
    console.log('hello word')
}) //в последнюю очередь


const ls = {
    user: {
        theme: 'light',
        lang: 'en',
        age: 23, 
        userName: 'alex'
    },
    tokens: {
        token1: 'mudamuda'
    }
}

console.log(JSON.stringify(ls))

const jsonls = JSON.stringify(ls)
console.log(JSON.parse(jsonls));



// setTimeout(()=>{
//     console.log('hello word')
// }, 1000)

// setInterval(()=>{
//     console.log('hello word')
// }, 1000)

const newAssyncFn = new Promise((resolve, reject)=> {
    const succes = true
    if(succes){
        resolve('gut')
        console.log('gut')
    }else{
        // return 'eror' - not working, function stop
        console.log('test')
        reject('eror')
    }
}).then().catch((error) => console.log(error));

