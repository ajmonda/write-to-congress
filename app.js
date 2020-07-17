// https://docs.opencivicdata.org/en/latest/proposals/0002.html

// divisions.(key).officeIndices[] // (array) List of indices in the 'offices' array, one for each office elected from this division.

// offices[].name	// (string) The human-readable name of the office.

// offices[].officialIndices // (array) List of indices in the 'officials' array of people who presently hold this office.

// officials[] // here are thepeople
// // officials[].name // (string) official's name
// // officials[].emails // (array)	The direct email addresses for the official.
// // officials[].address // (array of obj) snail mail

const h1 = document.querySelector('h1')
const footer = document.querySelector('footer')

const form = document.querySelector('form')
const street = document.querySelector('#street')
const city = document.querySelector('#city')
const state = document.querySelector('#state')

const confirm = document.getElementById('confirm')
const repInfo = document.getElementById('rep-info')
const senInfo = document.getElementById('sen-info')
const compose = document.getElementById('compose')

form.addEventListener('submit', async (e) => {

  const url = getURL(e)
  const congress = await getCongress(url)
  form.remove()
  showCongress(congress)

})

function getURL(e) {

  e.preventDefault()

  const address = `${street.value}%20${city.value}%20${state.value}`

  const key = `AIzaSyC6r1AUum2tYX_mkkG_GNAJbbNlHq4s-ek`
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`

  console.log(url)

  return url

}

async function getCongress(url) {

  try {

    const response = await axios.get(url)
    const offices = response.data.offices

    console.log(response.data)

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

    rep.office = 'Representative'
    sen.office = `Senator`

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

function showCongress(congress) {

  h1.innerText = 'Select recipient'

  congress.forEach(member => {

    const name = isLink(member)

    const office = document.createElement('h3')
    office.innerText = member.office

    const party = document.createElement('h3')
    party.innerText = member.party
    party.style.fontWeight = '200'

    repInfo.append(name)
    repInfo.append(office)
    repInfo.append(party)

    function isLink(member) {
      const name = document.createElement('h2')
      if (member['urls']) {
        const link = document.createElement('a')
        link.href = member.urls[0]
        link.innerText = member.name
        name.append(link)
      } else {
        name.innerText = member.name
      }
      return name
    }

  });

  whichButton(congress)

}

function whichButton(congress) {

  for (let i = 0; i < congress.length; i++) {
    const contactButton = document.createElement('button')
    contactButton.id = `${congress[i].office}`
    contactButton.innerText = `Contact ${congress[i].office}`
    repInfo.append(contactButton)
  }

  const contactRep = document.getElementById('Representative')
  const contactSen = document.getElementById('Senator')

  contactRep.addEventListener('click', (e) => {
    e.preventDefault()
    writeLetter(congress[0])

  })

  contactSen.addEventListener('click', (e) => {
    e.preventDefault()
    writeLetter(congress[1])

  })

}

function writeLetter(congress) {

  confirm.remove()

  h1.innerText = 'Compose your letter'

  const letter = document.createElement('textarea')

  console.log(congress)

  letter.value = `The Honorable ${congress.name}\n${congress.address[0].line1}\n${congress.address[0].city}, ${congress.address[0].state} ${congress.address[0].zip}\n\nDear ${congress.office}:`

  const email = document.createElement('button')
  const copy = document.createElement('button')
  const back = document.createElement('button')

  email.innerText = 'EMAIL'
  copy.innerText = 'COPY'
  back.innerText = 'BACK'

  copy.addEventListener('click', function copyLetter() {
    letter.select()
    document.execCommand('copy')
    alert('Copied!')

  })

  compose.append(letter)
  compose.append(email)
  compose.append(copy)

  const h4 = document.createElement('h4')
  h4.innerHTML = 'To easily contact Kentucky justice officials in defense of Breonna Taylor\'s life, got to <a target="_blank" href="http://www.forbreonna.com">ForBreonna.com</a>.'
  footer.append(h4)
}