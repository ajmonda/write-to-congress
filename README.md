# Project Overview

## Civic Letter Generator (working title)

## Project Description

The purpose of this project is to simplify and make more accessible the process of civic action. The portal will provide general information about a pressing issue, and asks the user to input their address. The app then pulls the office information of the relavent elected offical that represents the inputted address, and generates a letter within a text box with options to edit, copy to the clipboard, or email directly. The desgn of the web app will be clean and direct, in order to reinforce the simplicity of the task. Due to the project's timeline, I will select only one issue to focus on in the landing page (it assumes the user has accessed the app with a general awareness of its purpose). Fully realized, the web app would provide multiple letters customized to pertinant topics or issues, and offer the user an interactve selection of representatives to contact.

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

* Full clarity on navigating the Civic Information IPA's arrays.
* Use of HTML input forms and using JavaScript to store and implement user's address.
* Render desired content on DOM after user's input.


#### PostMVP  

* Leter renders in an editable text box.
* Button that automatically copies text in generated letter/text box.
* Customized letter that includes user's name.
* JS transition between classes (info and input/returned letter and address)
* "For more information" and resources
* More than one issue for user to select, and
* User input generates results with options for every level of governance relavent to the issue.
* Randomized nonprofit links.

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|July 10-12| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|July 13| Project Approval | Incomplete
|July 13| Core Application Structure (HTML, CSS, etc.) | Incomplete
|July 14| Pseudocode / actual code | Incomplete
|July 15| Initial Clickable Model  | Incomplete
|July 16| MVP | Incomplete
|July 17| Presentations | Incomplete

## Priority Matrix

![priority matrix](/assets/images/priority_matrix.png)

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Researching issue, writing web copy and letter | H | 2hr | | |
| API navigation | H | 2hrs | | |
| Form submission & attaching input to API | H | 3hrs | | |
| API rendering | H | 2hrs | | |
| Initial mobile DOM layout | H | 3hrs | | |
| Mobile CSS styling | H | 3hrs | | |
| Flexbox | H | 2hr | | |
| Styling for desktop | H | 2hrs | | |
| Media query | H | 2hrs | | |
| Dynamic submit/email buttons | M | 2hrs | | |
| Animation or transition/class toggling | M | 3hrs | | |
| Randomized relavent nonprofit at bottom | L | 2hrs | | |
| Resources | L | 1hr | | |
| Choice of more than one government office, and relavent issue/letter | L | 3hrs | | |
| Total ||32hrs | | |

## Code Snippet



## Change Log

