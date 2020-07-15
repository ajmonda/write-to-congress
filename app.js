

const addressForm = document.querySelector('form')


addressForm.addEventListener('submit', (e) => {
  // console.log(e) // e(vent) = 'submit'
  // passing event (submit) to getURL
  const url = getURL(e)
   // async unnecessary as it is last step in function
  writeLetter(url)
})


const streetForm = document.querySelector('#street')
const cityForm = document.querySelector('#city')
const stateForm = document.querySelector('#state')


function getURL(e) {

  // console.log(e) // 'submit'

  e.preventDefault()

  const address = `${streetForm.value}%20${cityForm.value}%20${stateForm.value}`
  const key = `AIzaSyC6r1AUum2tYX_mkkG_GNAJbbNlHq4s-ek`
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`
  return url
}

async function writeLetter(url) {

  try {

    const response = await axios.get(url)

    // console.log(response.data) --->
     
      // divisions.(key) //	The unique Open Civic Data identifier for this division.
      // // https://docs.opencivicdata.org/en/latest/proposals/0002.html
      // // 'ocd-division/country:<country_code>(/<type>:<type_id>)*'
      
      // divisions.(key).officeIndices[] // (array) List of indices in the 'offices' array, one for each office elected from this division.
    
      // offices[].name	// (string) The human-readable name of the office.
      // i need "<state> State Senator"
    
      // offices[].officialIndices // (array) List of indices in the 'officials' array of people who presently hold this office.
    
      // officials[] // here are thepeople
      // // officials[].name // (string) official's name
      // // officials[].emails // (array)	The direct email addresses for the official.
      // // officials[].address // (array of obj) snail mail
    
    const offices = response.data.offices
    const officials = response.data.officials

    function getIndex() {
      for (let i = 0; i < offices.length; i++) {
        if (offices[i].name === `${stateForm.value} State Senator`) {
          const index = offices[i].officialIndices
          // function only returns value if input is cap, need drop-down menu for state input
          return index[0]
        } else {
          // if state drop-down menu no need for user error message
            console.log('nope')
          }
        }
      }
       
    // keys i need: name(str), emails(arr), address(obj) <-- maybe
    const senator = officials[getIndex()] 

    const senatorName = senator.name
    const senatorEmail = senator.emails[0]

    //works
    console.log(`name ${senatorName}`)
    console.log(`email ${senatorEmail}`)

    const form = document.querySelector('form')
    form.remove()

    const topicsPage = document.getElementById('topics-page')
    document.querySelector('h1').innerText = "These topics need your voice"

    // // div 1
    const breatheDiv = document.getElementById('breathe-div')

    const breatheTitle = document.createElement('h2')
    breatheTitle.innerText = 'Federal BREATHE Act'
    const breatheBlurb = document.createElement('h3')
    breatheBlurb.innerText = 'A proposed bill that aims to significantly divest from incarceration and policing'
    const breatheButton = document.createElement('button')
    breatheButton.classList.add('topic-button')
    breatheButton.innerText = 'SELECT'
    const breatheMore = document.createElement('button')
    breatheMore.classList.add('topic-button')
    breatheMore.innerText = 'LEARN MORE'

    breatheDiv.appendChild(breatheTitle)
    breatheDiv.appendChild(breatheBlurb)
    breatheDiv.appendChild(breatheMore)
    breatheDiv.appendChild(breatheButton)
    

    // // div 2
    const extendDiv = document.getElementById('extend')

    const extendTitle = document.createElement('h2')
    extendTitle.innerText = 'COVID-19 Unemployment'
    const extendBlurb = document.createElement('h3')
    extendBlurb.innerText = 'In support of the petition to extend the weekly additional $600'
    const extendButton = document.createElement('button')
    extendButton.classList.add('topic-button')
    extendButton.innerText = 'SELECT'
    const extendMore = document.createElement('button')
    extendMore.classList.add('topic-button')
    extendMore.innerText = 'LEARN MORE'

    extendDiv.appendChild(extendTitle)
    extendDiv.appendChild(extendBlurb)
    extendDiv.appendChild(extendMore)
    extendDiv.appendChild(extendButton)
    


    // // div 3
    const numThreeDiv = document.getElementById('number-three')

    const numThreeTitle = document.createElement('h2')
    numThreeTitle.innerText = 'Number Three'
    const numThreeBlurb = document.createElement('h3')
    numThreeBlurb.innerText = 'Information will go here for the user to read'
    const numThreeButton = document.createElement('button')
    numThreeButton.classList.add('topic-button')
    numThreeButton.innerText = 'Select'
    const numThreeMore = document.createElement('a')
    numThreeMore.href = 'https://breatheact.org/'
    numThreeMore.innerText = 'Learn More'

    numThreeDiv.appendChild(numThreeTitle)
    numThreeDiv.appendChild(numThreeBlurb)
    numThreeDiv.appendChild(numThreeMore)
    numThreeDiv.appendChild(numThreeButton)
    

    breatheButton.addEventListener('click', (e) => {
      compose(e)
    })
    extendButton.addEventListener('click', (e) => {
      compose(e)
    })
    // breatheButton.addEventListener('click', (e) => {
    //   compose(e)
    // })

    compose = (e) => {
      e.preventDefault()
      topicsPage.remove()

      document.querySelector('h1').innerText = 'Edit, sign, copy'

      const letter = document.createElement('input')
      letter.value = `${senatorName} ${senatorEmail}`
      // log keys in address object:
      for (const key in senatorAddressObj) {
        console.log(senatorAddressObj[key])
      } // need to add to letter.value

      const finalPage = document.getElementById('final')

      const copyButton = document.createElement('button')
      copyButton.id = 'copy'
      copyButton.innerText = 'COPY'

      const h4 = document.createElement('h4')
      h4.innerHTML = 'To easily contact Kentucky legislators in defense of Breonna Taylor\'s life, go to <span id "for-breonna"><a href="http://www.forbreonna.com/">ForBreonna.com</a></span>.'

      finalPage.appendChild(letter)
      finalPage.appendChild(copyButton)
      finalPage.appendChild(h4)

    }

  } catch (err) {
    console.log(`error: ${err}`)
  } finally {
    console.log(`if successful, response displayed`)
  }

}