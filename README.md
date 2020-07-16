# Project Overview

## Civic Letter Generator (working title)

## Project Description

The purpose of this project is to simplify and make more accessible the process of civic action. The portal will provide general information about a pressing issue, and asks the user to input their address. The app then pulls the office information of the relavent elected offical that represents the inputted address, and generates a letter within a text box with options to edit, copy to the clipboard, or email directly. Below the returned content, there will be a footer with links to related organizations with a suggestion to donate.

The desgn of the web app will be clean and direct, in order to reinforce the simplicity of the task. Due to the project's timeline, I will select only one issue to focus on in the landing page (it assumes the user has accessed the app with a general awareness of its purpose). Fully realized, the web app would provide multiple letters customized to pertinant topics or issues, and offer the user an interactve selection of representatives to contact.

## API and Data Sample

For this project I will be using Google's Civic Information API. It is an open API that provides polling and voting information as well as data on every government representative by address. I will be pulling from the latter.

https://developers.google.com/civic-information

```json
{
      "name": "Andrew M. Cuomo",
      "address": [
        {
          "line1": "The Honorable Andrew M. Cuomo",
          "line2": "Governor of New York State",
          "line3": "NYS State Capitol Building",
          "city": "Albany",
          "state": "NY",
          "zip": "12224"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(518) 474-8390"
      ],
      "urls": [
        "https://andrewcuomo.com/"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "GovernorAndrewCuomo"
        },
        {
          "type": "Twitter",
          "id": "nygovcuomo"
        },
        {
          "type": "YouTube",
          "id": "nygovcuomo"
        }
      ]
    }
```

## Wireframes

![wireframe](/assets/images/wireframes.png)

#### MVP 

* Full clarity on navigating the Civic Information IAP's arrays.
* Use of HTML input forms and using JavaScript to store and implement user's address.
* Render desired content on DOM after user's input.


#### PostMVP  

* Letter renders in an editable text box.
* Button that automatically copies text in generated letter/text box.
* Customized letter that includes user's name.
* JS transition between classes.
* "For more information" and resources.
* More than one issue for user to select.
* User input generates results with options for every level of governance relavent to the issue.
* Randomized nonprofit links.

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|July 10-12| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|July 13| Project Approval, Gaining literacy of API, Core application structure | Complete
|July 13| Initial coding, Complete navgation and API integration | Complete
|July 14| CSS / Styling / Flexbox | Incomplete
|July 15| MVP | Incomplete
|July 16| PostMVP | Incomplete
|July 17| Presentations | Incomplete

## Priority Matrix

![priority matrix](/assets/images/priority_matrix.png)

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Researching issue, writing web copy and letter | H | 2hr | 1hr | 1hr |
| API navigation | H | 2hrs | 5hrs | 5hrs |
| Form submission & attaching input to API | H | 3hrs | 5hrs | 5hrs |
| API rendering | H | 2hrs | 4hrs | |
| Initial mobile DOM layout | H | 3hrs | 4hrs | |
| Mobile CSS styling | H | 3hrs | 3 hrs| |
| Flexbox | H | 2hr | | |
| Styling for desktop | H | 2hrs | | |
| Media query | H | 2hrs | | |
| Dynamic submit/email buttons | M | 2hrs | | |
| Animation or transition/class toggling | M | 3hrs | 5 hr| 5hr |
| Randomized relavent nonprofit at bottom | L | 2hrs | N/A | N/A |
| Resources | L | 1hr | 1hr | 1hr |
| Choice of more than one government office, and relavent issue/letter | L | 3hrs | 4hrs | 4hrs |
| Total ||32hrs | 32hrs | |

## Code Snippet

I had oversimplified the API in my mind before starting, and midway through designing I realized I was rendering incorrect data. This set me back nearly a whole day, but with that time I gained literacy in the API, as well as enough practice to compose the code below:

```js
async function getCongress(url) {

  try {

    const response = await axios.get(url)

    console.log(response)

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

    return congress

  } catch (err) {
    console.log(`error: ${err}`)
  } finally {
    console.log(`made it`)
  }
  ```

## Change Log

* Added page displaying names of congresspersons before letterbox page
* Removed page displaying information about selected topics
* Added representative to data render
* Added "email" buttons directly on second page
* Removed address fields
* Inserted drop-down select for state
