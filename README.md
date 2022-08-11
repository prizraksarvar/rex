# Rex - Highlight or Collapse Text

This extension allows to use regular expressions to highlight or collapse text on a web page. It was developed to facilitate log analysis (e.g. highlight important parts of stacktraces, collapsing framework noise)

Install from [Chrome Web Store](https://chrome.google.com/webstore/detail/rex-regex-highlight-or-co/eejlhekkafpkffbhpidchepheodkgnib)

## Features

- Use regex to highlight text
- Use regex to collapse text
- Define different colors for each regex
- Profiles to organize regex in groups 
- Url matcher to define on which pages profile should be active
- Temporarily enable/disable regex

## Todo

- Allow to collapse text that contains other dom nodes (e.g. span for styling, images, ...)
- Export settings and import them from URL (e.g. store settings in git with code)
- (Auto?)-update imported settings
- Execute custom JS


## Why Rex?

The name is inspired by the austrian tv show "Inspector Rex". The main character, a german shephard named Rex, is a police dog that helps find evidence and solve crimes (https://en.wikipedia.org/wiki/Inspector_Rex).

## Screenshots

**Extension active**
![Screenshot](screenshots/Example_1.png)

**Extension options**
![Options](screenshots/Example_2.png)


## Credits

This extension was inspired by [linkuha/ext-resh](https://github.com/linkuha/ext-resh).


## Export profiles hack

    chrome.storage.sync.get(['profiles'], async ({profiles}) => {
      console.log(JSON.stringify(profiles))
    })

## import profiles hack
    let a = JSON.parse('[{"collapse":[{"active":false,"color":"#CCC","startRegEx":"at com.sun.jersey.api","stopRegEx":"at com.apache.catalina","title":"Framework noise"}],"highlight":[{"active":true,"color":"#c2cc4e","regEx":"lorem"},{"active":true,"color":"#b1f6a0","regEx":"ipsum"}],"id":"1","name":"Default","pages":[{"active":true,"regEx":"google"}]},{"collapse":[{"active":true,"color":"#d0c7ff","startRegEx":"\\"url\\":\\"[^\\"]{90}","stopRegEx":"[^\\"]+\\"","title":"url"}],"highlight":[{"active":true,"color":"#fcffbd","regEx":"\\"level\\":\\"warn\\""},{"active":true,"color":"#ffa3a3","regEx":"\\"level\\":\\"error\\""},{"active":true,"color":"#d1ffe7","regEx":"\\"msg\\":\\"[^\\"]*\\""}],"id":"7620BE30-9F09-FC3F-AA3D-71E7D1573CE3","name":"kibana","pages":[{"active":true,"regEx":"(http://10.20.199.51:5601|https://paywb.com/kibana/app/).*"}]}]');
    chrome.storage.sync.set({a}, () => {console.log("completed")});