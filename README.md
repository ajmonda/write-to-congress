# Project Overview

## Civic Letter Generator (working title)

## Project Description

The purpose of this project is to simplify and make more accessible the process of civic action. The portal asks the user to input their address. The app then pulls the office information of the relavent elected offical that represents the inputted address, and generates a text box with options to edit, copy to the clipboard, or email directly. Below the returned content, there will be a footer with links to related organizations with a suggestion to donate.

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
