// https://docs.opencivicdata.org/en/latest/proposals/0002.html

// divisions.(key) //	The unique Open Civic Data identifier for this division.
// // 'ocd-division/country:<country_code>(/<type>:<type_id>)*'

// divisions.(key).officeIndices[] // (array) List of indices in the 'offices' array, one for each office elected from this division.

// offices[].name	// (string) The human-readable name of the office.
// i need "<state> State Senator" and "U.S. Representaive"

// offices[].officialIndices // (array) List of indices in the 'officials' array of people who presently hold this office.

// officials[] // here are thepeople
// // officials[].name // (string) official's name
// // officials[].emails // (array)	The direct email addresses for the official.
// // officials[].address // (array of obj) snail mail


const form = document.querySelector('form')
const street = document.querySelector('#street')
const city = document.querySelector('#city')
const state = document.querySelector('#state')
const h1 = document.querySelector('h1')

form.addEventListener('submit', async (e) => {
  const url = getURL(e)
  const congress = await getCongress(url)
  showCongress(congress)
})

function getURL(e) {
  e.preventDefault()
  const address = `${street.value}%20${city.value}%20${state.value}`
  const key = `AIzaSyC6r1AUum2tYX_mkkG_GNAJbbNlHq4s-ek`
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`
  return url
}

async function getCongress(url) {

  try {

    const response = await axios.get(url)

    console.log(response)

    const offices = response.data.offices

    // function getIndex() {

    // store the indices for 'officials' array associated with senator and rep, respectively
    const indices = []

    for (let i = 0; i < offices.length; i++) {
      if (offices[i].name === 'U.S. Representative') {
        indices.push(offices[i].officialIndices[0])
      } else if (offices[i].name === `${state.value} State Senator`) {
        indices.push(offices[i].officialIndices[0])
        // function only returns value if input is CAP, need drop-down menu for state input
      } else {
        // if state drop-down menu no need for user error message
        console.log('nope')
      }
    }

    // 0: rep, 1: senator
    indices.sort()

    const repIndex = indices[0]
    const senIndex = indices[1]

    const rep = response.data.officials[repIndex]
    const sen = response.data.officials[senIndex]

    const congress = []
    congress.push(rep)
    congress.push(sen)

    return congress

  } catch (err) {
    console.log(`error: ${err}`)
  } finally {
    console.log(`made it`)
  }
}

// don't use body, use "senator-confirm" div
function showCongress(congress) {
const confirm = document.getElementById('confirm')
  form.remove()

  h1.innerText = 'Your representatives are'

  const repName = document.createElement('h2')
  repName.innerText = congress[0].name
  confirm.append(repName)

  const repOffice = document.createElement('h3')
  repOffice.innerText = 'U.S. Representative'
  confirm.append(repOffice)

  const senName = document.createElement('h2')
  senName.innerText = congress[1].name
  confirm.append(senName)

  const senOffice = document.createElement('h3')
  senOffice.innerText = `${state.value} Senator`
  confirm.append(senOffice)

  const button = document.createElement('button')
  button.innerText = 'OK!'
  confirm.append(button)
}