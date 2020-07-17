

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
const state = document.querySelector('#state')
const h1 = document.querySelector('h1')
const confirm = document.getElementById('confirm')
const compose = document.getElementById('compose')
const footer = document.querySelector('footer')
const repInfo = document.getElementById('rep-info')
const senInfo = document.getElementById('sen-info')

form.addEventListener('submit', async (e) => {
  const url = getURL(e)
  const congress = await getCongress(url)
  form.remove()
  showCongress(congress)
  // event listener for contact buttons
  //

  //
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

// vvvvvv scope and dry vvvvvv

// this function should start here
function showCongress(congress) {

  h1.innerText = 'Your representatives are'

  function printCongress(member) {
    for (let n = 0; member.length < i; i++) {

      const name = document.createElement('h2')
      const office = document.createElement('h3')
      const party = document.createElement('h3')
      const contact = document.createElement('button')

      
    }
  }




  // name congress[i].name // congress[i].urls[0] <-- if/then
  // office congress[i].office
  // party congress[i].party

  //contact button to next div

  //////

  document.createElement('h2')
  // append name
  // document.createElement('h3')
  // append office
  // append party
  // contact button


  congress.forEach(member => function showCongress(member) {

  })

  //////////

  // ++++++++++++++++++++++++++++++++ FUNCTION TO RENDER EACH PERSON
  // // representative
  const repName = document.createElement('h2')
  const repLink = document.createElement('a')

  repLink.href = congress[0].urls[0]
  repLink.innerText = congress[0].name
  repName.append(repLink)
  confirm.append(repName)

  const repOffice = document.createElement('h3')
  repOffice.innerText = 'U.S. Representative'
  repOffice.style.fontWeight = '500'
  confirm.append(repOffice)

  const repParty = document.createElement('h3')
  repParty.innerText = congress[0].party
  confirm.append(repParty)

  const mailRep = document.createElement('button')
  mailRep.innerText = 'CONTACT'
  mailRep.classList.add('contact')
  confirm.append(mailRep)



  // // senator
  const senOffice = document.createElement('h3')
  senOffice.innerText = 'Senator'
  senOffice.style.fontWeight = '500'
  confirm.append(senOffice)

  const senParty = document.createElement('h3')
  senParty.innerText = congress[1].party
  confirm.append(senParty)

  const mailSen = document.createElement('button')
  mailSen.innerText = 'CONTACT'
  mailSen.classList.add('contact')
  confirm.append(mailSen)

  // // // senator button
  mailSen.addEventListener('click', writeLetter = (e) => {
    e.preventDefault()
    confirm.remove()
    h1.innerText = 'Compose your letter'

    const letter = document.createElement('textarea')
    compose.append(letter)
    console.log(congress[1].address[0])
    letter.value = `${congress[1].name}\n${congress[1].address[0].line1}\n${congress[1].address[0].city}, ${congress[1].address[0].state} ${congress[1].address[0].zip}\n\nDear ${congress[1].name},`

    const email = document.createElement('button')
    email.innerText = 'EMAIL'
    compose.append(email)

    email.action = congress[1].emails[0]

    const copy = document.createElement('button')
    copy.innerText = 'COPY'
    compose.append(copy)

    copy.addEventListener('click', copyLetter = (e) => {
      letter.select()
      document.execCommand('copy')
      alert('Copied!')
    })



    const back = document.createElement('button')
    back.innerText = 'GO BACK'
    compose.append(back)

    const h4 = document.createElement('h4')
    h4.innerHTML = 'To easily contact Kentucky justice officials in defense of Breonna Taylor\'s life, got to <a target="_blank" href="http://www.forbreonna.com">ForBreonna.com</a>.'
    footer.append(h4)
  }
  )

  // // // representative button
  mailRep.addEventListener('click', writeLetter = (e) => {
    e.preventDefault()
    confirm.remove()
    h1.innerText = 'Compose your letter'

    const letter = document.createElement('textarea')
    compose.append(letter)

    letter.value = `${congress[0].name}\n${congress[0].address[0].line1}\n${congress[0].address[0].city}, ${congress[0].address[0].state} ${congress[0].address[0].zip}\n\nDear ${congress[0].name},`

    const copy = document.createElement('button')
    copy.innerText = 'COPY'
    compose.append(copy)

    copy.addEventListener('click', copyLetter = (e) => {
      letter.select()
      document.execCommand('copy')
      alert('Copied!')
    })


    const back = document.createElement('button')
    back.innerText = 'GO BACK'
    compose.append(back)

    const h4 = document.createElement('h4')
    h4.innerHTML = 'To easily contact Kentucky justice officials in defense of Breonna Taylor\'s life, got to <a target="_blank" href="http://www.forbreonna.com">ForBreonna.com</a>.'
    footer.append(h4)
  }
  )
}
