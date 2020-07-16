

// https://docs.opencivicdata.org/en/latest/proposals/0002.html

// divisions.(key) //	The unique Open Civic Data identifier for this division.
// // 'ocd-division/country:<country_code>(/<type>:<type_id>)*'

// divisions.(key).officeIndices[] // (array) List of indices in the 'offices' array, one for each office elected from this division.

// offices[].name	// (string) The human-readable name of the office.

// offices[].officialIndices // (array) List of indices in the 'officials' array of people who presently hold this office.

// officials[] // here are thepeople
// // officials[].name // (string) official's name
// // officials[].emails // (array)	The direct email addresses for the official.
// // officials[].address // (array of obj) snail mail

const form = document.querySelector('form')

const street = document.querySelector('#street')
const city = document.querySelector('#city')

// need to get value from drop down selector 
const state= document.querySelector('#state')

const h1 = document.querySelector('h1')
const confirm = document.getElementById('confirm')

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
    const offices = response.data.offices

    const indices = []

    for (let i = 0; i < offices.length; i++) {
      if (offices[i].name === 'U.S. Representative') {
        indices.push(offices[i].officialIndices[0])
      } else if (offices[i].name === `${state.value} State Senator`) {
        indices.push(offices[i].officialIndices[0])
      } else {
        console.log('nope')
      }
    }

    indices.sort()

    const repIndex = indices[0]
    const senIndex = indices[1]

    const rep = response.data.officials[repIndex]
    const sen = response.data.officials[senIndex]

    const congress = []
    congress.push(rep)
    congress.push(sen)

    console.log(congress)

    return congress

  } catch (err) {
    console.log(`error: ${err}`)
  } finally {
    console.log(`made it`)
  }
}

function showCongress(congress) {

  const blurb = document.querySelector('#blurb')
  blurb.remove()

  form.remove()

  h1.innerText = 'Your representatives are'

  const repName = document.createElement('h2')
  repName.innerText = congress[0].name
  confirm.append(repName)

  const repOffice = document.createElement('h3')
  repOffice.innerText = 'U.S. Representative'
  repOffice.style.fontWeight = '500'
  confirm.append(repOffice)

  const repParty = document.createElement('h3')
  repParty.innerText = congress[0].party
  confirm.append(repParty)

  const emailRep = document.createElement('button')
  emailRep.innerText = 'EMAIL!'
  confirm.append(emailRep)

  const senName = document.createElement('h2')
  senName.innerText = congress[1].name
  confirm.append(senName)

  const senOffice = document.createElement('h3')
  senOffice.innerText = `${state.value} Senator`
  senOffice.style.fontWeight = '500'
  confirm.append(senOffice)

  const senParty = document.createElement('h3')
  senParty.innerText = congress[1].party
  confirm.append(senParty)


  const emailSen = document.createElement('button')
  emailSen.innerText = 'EMAIL!'
  confirm.append(emailSen)

}
