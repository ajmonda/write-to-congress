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
  const senator = await getSenator(url)
  showSenator(senator)
})

function getURL(e) {
  e.preventDefault()
  const address = `${street.value}%20${city.value}%20${state.value}`
  const key = `AIzaSyC6r1AUum2tYX_mkkG_GNAJbbNlHq4s-ek`
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`
  return url
}

async function getCongre(url) {

  try {

    const response = await axios.get(url)

    console.log(response)

    const offices = response.data.offices

    function getSenatorIndex() {
      for (let i = 0; i < offices.length; i++) {
        if (offices[i].name === `${state.value} State Senator`)
          const senatorIndex = offices[i].officialIndices[0]
          return senatorIndex
          // function only returns value if input is CAP, need drop-down menu for state input
        } else {
          // if state drop-down menu no need for user error message
          console.log('nope')
        }
    }
    
    function getRepIndex() {
      for (let i = 0; i < offices.length; i++) {
        if (offices[i].name === 'U.S. Representative')
          const repIndex = offices[i].officialIndices[0]
          return repIndex
          // function only returns value if input is CAP, need drop-down menu for state input
        } else {
          // if state drop-down menu no need for user error message
          console.log('nope')
        }
    }
    
    const deets = response.data.officials[getSenatorIndex()]

    const senator = {
      name: deets.name,
      party: deets.party,
      email: deets.emails[0],
      address: deets.address
    }

    return senator

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

//event listener on "ok" to bring up issues page









// function showSenator() {

//   form.remove()
//   h1.innerText = 'Your senator is'

//   const h2 = document.createElement('h2')
//   h2.innerText = senator.deets.name

//   const h3 = document.createElement('h3')
//   h3.innerText = senator.deets.party

// }
//     form.remove()

//     const topicsPage = document.getElementById('topics-page')
//     document.querySelector('h1').innerText = "These topics need your voice"

//     // // div 1
//     const breatheDiv = document.getElementById('breathe-div')

//     const breatheTitle = document.createElement('h2')
//     breatheTitle.innerText = 'Federal BREATHE Act'
//     const breatheBlurb = document.createElement('h3')
//     breatheBlurb.innerText = 'A proposed bill that aims to significantly divest from incarceration and policing'
//     const breatheButton = document.createElement('button')
//     breatheButton.classList.add('topic-button')
//     breatheButton.innerText = 'SELECT'
//     const breatheMore = document.createElement('button')
//     breatheMore.classList.add('topic-button')
//     breatheMore.innerText = 'LEARN MORE'

//     breatheDiv.appendChild(breatheTitle)
//     breatheDiv.appendChild(breatheBlurb)
//     breatheDiv.appendChild(breatheMore)
//     breatheDiv.appendChild(breatheButton)


//     // // div 2
//     const extendDiv = document.getElementById('extend')

//     const extendTitle = document.createElement('h2')
//     extendTitle.innerText = 'COVID-19 Unemployment'
//     const extendBlurb = document.createElement('h3')
//     extendBlurb.innerText = 'In support of the petition to extend the weekly additional $600'
//     const extendButton = document.createElement('button')
//     extendButton.classList.add('topic-button')
//     extendButton.innerText = 'SELECT'
//     const extendMore = document.createElement('button')
//     extendMore.classList.add('topic-button')
//     extendMore.innerText = 'LEARN MORE'

//     extendDiv.appendChild(extendTitle)
//     extendDiv.appendChild(extendBlurb)
//     extendDiv.appendChild(extendMore)
//     extendDiv.appendChild(extendButton)



//     // // div 3
//     const numThreeDiv = document.getElementById('number-three')

//     const numThreeTitle = document.createElement('h2')
//     numThreeTitle.innerText = 'Number Three'
//     const numThreeBlurb = document.createElement('h3')
//     numThreeBlurb.innerText = 'Information will go here for the user to read'
//     const numThreeButton = document.createElement('button')
//     numThreeButton.classList.add('topic-button')
//     numThreeButton.innerText = 'Select'
//     const numThreeMore = document.createElement('a')
//     numThreeMore.href = 'https://breatheact.org/'
//     numThreeMore.innerText = 'Learn More'

//     numThreeDiv.appendChild(numThreeTitle)
//     numThreeDiv.appendChild(numThreeBlurb)
//     numThreeDiv.appendChild(numThreeMore)
//     numThreeDiv.appendChild(numThreeButton)


//     breatheButton.addEventListener('click', (e) => {
//       compose(e)
//     })
//     extendButton.addEventListener('click', (e) => {
//       compose(e)
//     })
//     // breatheButton.addEventListener('click', (e) => {
//     //   compose(e)
//     // })

//     compose = (e) => {
//       e.preventDefault()
//       topicsPage.remove()

//       document.querySelector('h1').innerText = 'Edit, sign, copy'

//       const letter = document.createElement('input')
//       letter.value = `${senatorName} ${senatorEmail}`
//       // log keys in address object:
//       for (const key in senatorAddressObj) {
//         console.log(senatorAddressObj[key])
//       } // need to add to letter.value

//       const finalPage = document.getElementById('final')

//       const copyButton = document.createElement('button')
//       copyButton.id = 'copy'
//       copyButton.innerText = 'COPY'

//       const h4 = document.createElement('h4')
//       h4.innerHTML = 'To easily contact Kentucky legislators in defense of Breonna Taylor\'s life, go to <span id "for-breonna"><a href="http://www.forbreonna.com/">ForBreonna.com</a></span>.'

//       finalPage.appendChild(letter)
//       finalPage.appendChild(copyButton)
//       finalPage.appendChild(h4)

//     }

//   } catch (err) {
//     console.log(`error: ${err}`)
//   } finally {
//     console.log(`if successful, response displayed`)
//   }

// }
