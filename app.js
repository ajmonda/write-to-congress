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
  await getCongress(url)
  // const senator = await getSenator(url)
  // showSenator(senator)
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

    function getIndex() {
      for (let i = 0; i < offices.length; i++) {
        if (offices[i].name === `${state.value} State Senator`) {
          const senIndex = offices[i].officialIndices[0]
          console.log(senIndex)
        } else if (offices[i].name === 'U.S. Representative') {
          const repIndex = offices[i].officialIndices[0]
          console.log(repIndex)
          // function only returns value if input is CAP, need drop-down menu for state input
        } else {
          // if state drop-down menu no need for user error message
          console.log('nope')
        }
      }
    }

    getIndex()
    
  
      // const deets = response.data.officials[getIndex()]

      // const senator = {
      //   name: deets.name,
      //   party: deets.party,
      //   email: deets.emails[0],
      //   address: deets.address
      // }

      // return senator

    } catch (err) {
      console.log(`error: ${err}`)
    } finally {
      console.log(`made it`)
    }
  }


// don't use body, use "senator-confirm" div
function showSenator(senator) {
  form.remove()

  h1.innerText = 'Your senator is'
  const body = document.querySelector('body')

  const h2 = document.createElement('h2')
  h2.innerText = senator.name
  body.append(h2)

  const h3 = document.createElement('h3')
  h3.innerText = senator.party
  body.append(h3)

  const button = document.createElement('button')
  button.innerText = 'OK!'
  body.append(button)
}