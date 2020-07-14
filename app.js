

const addressForm = document.querySelector('form')

addressForm.addEventListener('submit', async (e) => {
  const url = getAddress(e)
  await getAPI(url)
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

async function getAPI(url) {

  try {
    const response = await axios.get(url)
    function getGovt() {

      // const form = document.getElementById('form')

      const senatorName = response.data.officials[2].name
      const senatorTitle = response.data.offices[2].name
      const senatorAddressObj = response.data.officials[2].address[0]

      // const h1 = document.createElement('h1')
      // const h2 = document.createElement('h2')
      // const h3 = document.createElement('h3')

      // h1.append(senatorName)
      // h2.append(senatorTitle)

      // for (const key in senatorAddressObj) {
      //   h3.append(`${senatorAddressObj[key]}`)
      // }


      // console.log(h1, h2, h3)
      // const results = document.createElement('div')

      // results.append(h1)
      // results.append(h2)
      // results.append(h3)

      const form = document.querySelector('form')
      form.remove()
      document.querySelector('h1').innerText = "These topics need your voice."



      
      const h2 = document.createElement('h2')
      h2.innerText = 'The BREATHE Act'
      const h3 = document.createElement('h3')
      h3.innerText = 'The BREATHE Act aims to divest federal resources from incarceration and policing.'
      const button = document.createElement('button')
      button.innerText = 'Select'
      const a = document.createElement('a')
      a.href = 'https://breatheact.org/'
      a.innerText = 'Learn More'






      const topicsPage = document.createElement('div')
      topicsPage.id = 'topics-page'
      const letterPage = document.createElement('div')
      letterPage.id = 'letter-page'

      const main = document.querySelector('main')
      

      topicsPage.append(h2)
      topicsPage.append(h3)
      topicsPage.append(button)
      topicsPage.append(a)

      main.append(topicsPage)


      writeLetter = (e) => {
        e.preventDefault()
        topicsPage.remove()

        const letter = document.createElement('input')
        letter.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

        main.append(letter)

        document.querySelector('h1').innerText = 'That\'s it. Edit, sign, and copy your call to action below.'
      }


      button.addEventListener('click', (e) => {
        writeLetter(e)
      })

    }

    getGovt()



  } catch (err) {
    console.log(`error: ${err}`)
  } finally {
    console.log(`if successful, response displayed`)
  }
}