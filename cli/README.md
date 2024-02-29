# CLI Implementation

## CLI Setup
To setup CLI for the first time follow the instructions below.
- Create folder with name cli
- Execute: <ins>npm init</ins> inside cli folder
- Create: a folder with name bin and place inside a file with name server.js
- Inside package.json paste the following:
  - {<br>
      &nbsp;&nbsp;&nbsp;&nbsp;"name":"se2284",<br>
      &nbsp;&nbsp;&nbsp;&nbsp;"version":"1.0.0",<br>
      &nbsp;&nbsp;&nbsp;&nbsp;"description":"A CLI to translate between languages in the terminal",<br>
      &nbsp;&nbsp;&nbsp;&nbsp;"main":"bin/server.js",<br>
      &nbsp;&nbsp;&nbsp;&nbsp;"scripts":{<br>
          &nbsp;&nbsp;&nbsp;&nbsp;"test":"echo \"Error: no test specified\" && exit 1"<br>
      &nbsp;&nbsp;&nbsp;&nbsp;},<br>
      &nbsp;&nbsp;&nbsp;&nbsp;"keywords":["cli"],"bin":{"se2284":"./bin/server.js"},<br>
      &nbsp;&nbsp;&nbsp;&nbsp;"author":"Your Name",<br>
      &nbsp;&nbsp;&nbsp;&nbsp;"license":"ISC"<br>
  }<br>
- Place your code inside server.js
    
## CLI Run
After the project have been cloned from github follow the instructions below to execute our CLI globally on your computer:
- Execute: <ins>npm install -g</ins> => to run se2284 globally
- Execute: <ins>npm i axios</ins> => to install axios library
- Execute: <ins>npm install node-localstorage</ins> => to install localstorage library
- Execute: <ins>npm install jsonwebtoken --save</ins> => to install jsonwebtoken library
- In case operation is rejected due to administrator issues add sudo in front of the commands

## CLI Documentation
After the above have been executed run in terminal: <ins>se2284</ins> to view the available commands and examples.<br>
The table below displays the availbale commands.<br><br>
| scope | AuthRequired   | Parameters    | Returns|
| :---:   | :---: | :---: |:---:|
| login | False   | --username --password   | JSON Object|
| logout | True (Must Be Logged In)   | -   | -|
| healthcheck | True (Must Be Logged In As Admin)   | -   | JSON Object|
| resetall | True (Must Be Logged In As Admin)   | -  | JSON Object|
| questionnaire_upd | True (Must Be Logged In As Admin)   | --source file (file must be saved in home directory of your system)   | JSON Object|
| resetq | True (Must Be Logged In As Admin)   | --questionnaire_id id   | JSON Object|
| questionnaire | True (Must Be Logged In As Admin)   | --questionnaire_id id   | JSON Object|
| question | True (Must Be Logged In As Admin)   | --questionnaire_id id --question_id id   | JSON Object|
| doanswer | True (Must Be Logged In As Admin)   | --questionnaire_id id --question_id id --session_id id --option_id   | JSON Object|
| getsessionanswers | True (Must Be Logged In As Admin)   | --questionnaire_id id --session id   | JSON Object|
| getquestionanswers | True (Must Be Logged In As Admin)   | --questionnaire_id id --question_id id   | JSON Object|
| showfullquestionnaire | True (Must Be Logged In As Admin)   | --questionnaire_id id   | JSON Object|
| session_upd | True (Must Be Logged In As Admin)   | --source file (file must be saved in home directory of your system)   | JSON Object|
| admin --usermod | True (Must Be Logged In As Admin)   | --username username --passw password   | JSON Object|
| admin --users | True (Must Be Logged In As Admin)   | username name   | JSON Object|

<br>The table below displays some examples.<br><br>
| scope | Example  |
| :---:   | :---: |
| login | se2284 login --username mike --password 654321 --format json  |
| logout | se2284 logout  | 
| healthcheck | se2284 healthcheck --format json  | 
| resetall | se2284 resetall  | 
| questionnaire_upd | se2284 questionnaire_upd --source QQ001 --format json  | 
| resetq | se2284 resetq --questionnaire_id QQ010 --format json  | 
| questionnaire | se2284 questionnaire --questionnaire_id QQ010 --format json  | 
| question | se2284 question --questionnaire_id QQ010 --question_id P01 --format json  | 
| doanswer | se2284 doanswer --questionnaire_id QQ010 --question_id P01 --session 4WEQ --optionID P01A3 --format json  | 
| getsessionanswers | se2284 getsessionanswers --questionnaire_id QQ010 --session 4WEQ --format json  | 
| getquestionanswers | se2284 getquestionanswers --questionnaire_id QQ010 --question_id Q05 --format json  | 
| showfullquestionnaire | se2284 showquestionnaire --questionnaire_id QQ001 --format json  | 
| session_upd | se2284 session_upd --source QQ001Ans --format json  | 
| admin --usermod | se2284 admin --usermod --username mike --passw NtuaSofteng22_84 --format json  | 
| admin --users | se2284 admin --users mike --format json  | 
