



const addressForm = document.querySelector('form')
addressForm.addEventListener('submit', logAddress)



function logAddress(e) {

  e.preventDefault()
  
const streetForm = document.querySelector('#street')
const street = streetForm.value

const cityForm = document.querySelector('#city')
const city = cityForm.value

const stateForm = document.querySelector('#state')
const state = stateForm.value

const address = `${street}%20${city}%20${state}`
  
  console.log(address)

}


async function testAPI(address) {

  const key = `AIzaSyC6r1AUum2tYX_mkkG_GNAJbbNlHq4s-ek`
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`

  try {
    const response = await axios.get(url)
    console.log(response.data)

    // each government office has a specific index attached to the results. for example, the office of governor is always asigned to index 4:

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


// testAPI(address)