# prog-cw2-node
### Second term coursework for the "programming" module

# Tasks:

## Task summary

- Construct a dynamic web-site for an application of your choosing
- Use static HTML pages loading dynamic JSON content from server via AJAX
- Server written in nodejs to provide JSON through REST API
- Optional use of externally provided web service and/or cloud hosting


## Dynamic web-site

- Any application domain as long as it includes two kinds of entities e.g.
  - people
  - places
  - events
  - comments
  - pictures
- Could be e.g. club, diary, social, health, gallery


## Static HTML loading JSON via AJAX

- 'Single page app'
- Can have more than one page e.g. for user and admin
- Should provide clean and simple User Experience (UX)
- Should be responsive i.e. work well on desktop and mobile
- Recommend using framework such as Bootstrap, semantic-ui


## Message sequence chart

![Message Sequence Chart showing Client server interaction with AJAX](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgQ2xpZW50L3NlcnZlciBpbnRlcmFjdGlvbgoKABUGLT5TABcFOiBTdGF0aWMgcGFnZSByZXF1ZXN0CgAWBi0-AEEGOiBIVE1MCmxvb3AgZWFjaCB1c2VyIABJBwA_EER5bmFtaWMgY29udGVudABLCCAoQUpBWCkASRFKU09OAIEKCQBnCFJlbmRlcgAXBQA_CWFzAIEBBSB3aXRoaW4gRE9NCmVuZAoK&s=roundgreen)


## Server provides JSON through a REST API

Each entity type (e.g. person) has 

- GET method to list/search 
- GET method for individual details 
- POST method to add new (with authentication)


- Response provided as JSON
- Content-type needs to be correct
- HTTP codes should be correct: use 200, 400 or 403 (with authentication)


## Server written in nodejs

- Use npm for management
- Make sure you use --save or --save-dev option with packages you add
- Write jest test cases: run with `npm test`
- Use eslint: run with `npm pretest`
- Recommended using express


## Extension 1: cloud deployment

- Local installation must not use database: use in-memory model
- You can choose cloud deployment platform e.g. OpenShift, BlueMix, Heroku 
- Local deployment with `npm start`
- You don't need to include cloud deployment instructions
- Include url of running system


## Extension 2: external web service

Find something appropriate at

- <https://any-api.com/>
- <https://www.programmableweb.com/>
- google/facebook authentication

Integrate it into your web server


## Submission

Source code (all zipped)

- HTML and CSS and any media
- Client and server side JavaScript
- package.json including test and pretest scripts
- .eslintrc 
- jest test cases e.g. app.test.js
- README.md explaining how to use the site and API

Should not include `node_modules` in submission

