

const addressForm = document.querySelector('form')

addressForm.addEventListener('submit', getAddress)
addressForm.addEventListener('submit', testAPI)

const streetForm = document.querySelector('#street')
const cityForm = document.querySelector('#city')
const stateForm = document.querySelector('#state')


function getAddress(e) {
  e.preventDefault()

  const address = `${streetForm.value}%20${streetForm.value}%20${stateForm.value}`

  const key = `AIzaSyC6r1AUum2tYX_mkkG_GNAJbbNlHq4s-ek`
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`

  console.log(address)
  console.log(url)
}

async function testAPI(url) {
  try {
    const response = await axios.get(url)

    const govtName = response.data.officials[4].name
    const govtTitle = response.data.offices[4].name
    const govtAddress = response.data.officials[4].address[0] // returns object

    console.log(govtName)
    console.log(govtTitle)
    console.log(govtAddress)

    const h1 = document.createElement('h1')
    const h2 = document.createElement('h2')
    const h3 = document.createElement('h3')

    h1.innerText = govtName
    h2.innerText = govtTitle
    h3.innerText = govtAddress

    const body = document.querySelector('body')

    body.append(h1)
    body.append(h2)
    body.append(h3)

  } catch (err) {
    console.log(`error: ${err}`)
  } finally {
    console.log(`if successful, response displayed`)
  }
}