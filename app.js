const addressForm = document.querySelector('form')

addressForm.addEventListener('submit', async (e) => {
  const url = getURL(e)
  await writeLetter(url)
})

const streetForm = document.querySelector('#street')
const cityForm = document.querySelector('#city')
const stateForm = document.querySelector('#state')

function getURL(e) {

  e.preventDefault()

  const address = `${streetForm.value}%20${cityForm.value}%20${stateForm.value}`
  const key = `AIzaSyC6r1AUum2tYX_mkkG_GNAJbbNlHq4s-ek`
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`
  return url
}

async function writeLetter(url) {

  try {
    const response = await axios.get(url)

    const senatorName = response.data.officials[2].name
    const senatorTitle = response.data.offices[2].name
    const senatorAddressObj = response.data.officials[2].address[0]

    const form = document.querySelector('form')
    form.remove()

    const topicsPage = document.getElementById('topics-page')
    document.querySelector('h1').innerText = "These topics need your voice."

    // // div 1
    const breatheDiv = document.getElementById('breathe-div')

    const breatheTitle = document.createElement('h2')
    breatheTitle.innerText = 'Federal BREATHE Act'
    const breatheBlurb = document.createElement('h3')
    breatheBlurb.innerText = 'The BREATHE Act aims to divest federal resources from incarceration and policing and invest in a "new vision of public safety."'
    const breatheButton = document.createElement('button')
    breatheButton.classList.add('topic-button')
    breatheButton.innerText = 'Select'
    
    const breatheMore = document.createElement('a')
    breatheMore.classList.add('more')
    breatheMore.href = 'https://breatheact.org/'
    breatheMore.innerText = 'Learn More'

    breatheDiv.appendChild(breatheTitle)
    breatheDiv.appendChild(breatheMore)
    breatheDiv.appendChild(breatheBlurb)
    breatheDiv.appendChild(breatheButton)
    

    // // div 2
    const extendDiv = document.getElementById('extend')

    const extendTitle = document.createElement('h2')
    extendTitle.innerText = 'COVID-19 Unemployment'
    const extendBlurb = document.createElement('h3')
    extendBlurb.innerText = 'Support the petition to extend the weekly additional unemployment assistance until at least December 31, 2020 or longer, if necesary.'
    const extendButton = document.createElement('button')
    extendButton.classList.add('topic-button')
    extendButton.innerText = 'Select'
    const extendMore = document.createElement('a')
    extendMore.classList.add('more')
    extendMore.href = 'https://sign.moveon.org/petitions/extend-unemployment-600-per-week-additional-assistance-through-at-least-dec-31-2020/'
    extendMore.innerText = 'Learn More'

    extendDiv.appendChild(extendTitle)
    extendDiv.appendChild(extendMore)
    extendDiv.appendChild(extendBlurb)
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

      document.querySelector('h1').innerText = 'That\'s it. Edit, sign, and copy your call to action below.'

      const letter = document.createElement('input')
      letter.value = `${senatorName} ${senatorTitle} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

      // log keys in address object:
      for (const key in senatorAddressObj) {
        console.log(senatorAddressObj[key])
      } // need to add to letter.value

      const finalPage = document.getElementById('final')

      const copyButton = document.createElement('button')
      copyButton.id = 'copy'
      copyButton.innerText = 'COPY'

      const h4 = document.createElement('h4')
      h4.innerHTML = 'To easily contact Kentucky legislators in defense of Breonna Taylor\'s life, go to <span id "for-breonna"><a href="http://www.forbreonna.com/">ForBreonna.com</a></span>'

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