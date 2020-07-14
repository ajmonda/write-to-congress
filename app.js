

const addressForm = document.querySelector('form')

addressForm.addEventListener('submit', async (e) => {
  const url = getAddress(e)
  await testAPI(url)
})

const streetForm = document.querySelector('#street')
const cityForm = document.querySelector('#city')
const stateForm = document.querySelector('#state')


function getAddress(e) {
  e.preventDefault()

  const address = `${streetForm.value}%20${cityForm.value}%20${stateForm.value}`
  const key = `AIzaSyC6r1AUum2tYX_mkkG_GNAJbbNlHq4s-ek`
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`

  return url
}

async function testAPI(url) {

  try {
    const response = await axios.get(url)
    function renderSenator() {

      const senatorName = response.data.officials[2].name
      const senatorTitle = response.data.offices[2].name
      const senatorAddressObj = response.data.officials[2].address[0]

      const h1 = document.createElement('h1')
      const h2 = document.createElement('h2')
      const h3 = document.createElement('h3')

      h1.append(senatorName)
      h2.append(senatorTitle)

      for (const key in senatorAddressObj) {
        h3.append(`${senatorAddressObj[key]}`)
      }

      const body = document.querySelector('body')

      body.append(h1)
      body.append(h2)
      body.append(h3)
    }

    renderSenator()

  } catch (err) {
    console.log(`error: ${err}`)
  } finally {
    console.log(`if successful, response displayed`)
  }
}