#! /usr/bin/env node
const {login} = require('../Cli-Controller/loginCli.js');
const {logout} = require('../Cli-Controller/logoutCli.js');
const {healthcheck} = require('../Cli-Controller/healthcheck.js');
const {questionnaire_upd} = require('../Cli-Controller/questionnaire_upd.js');
const {resetq} = require('../Cli-Controller/resetq.js');
const {questionnaire} = require('../Cli-Controller/questionnaire.js');
const {question} = require('../Cli-Controller/question.js');
const {doanswer} = require('../Cli-Controller/doanswer.js');
const {getsessionanswers} = require('../Cli-Controller/getsessionanswers.js');
const {getquestionanswers} = require('../Cli-Controller/getquestionanswers.js');
const {showquestionnaire} = require('../Cli-Controller/showquestionnaire.js');
const {session_upd} = require('../Cli-Controller/session_upd.js');
const {admin} = require('../Cli-Controller/admin.js');
const {resetall} = require('../Cli-Controller/resetall.js');

var default_flag = 0;

async function cases() {
    switch(process.argv[2]) {
        case 'login':
            if (process.argv[3] == "--username" && process.argv[5] == "--password" && process.argv[7] == "--format" && process.argv[8] == "json" && process.argv.length == 9){
                const args = {
                    "username": `${process.argv[4]}`,
                    "password": `${process.argv[6]}`
                };
                login(args)
            }
            else{
                default_flag = 1
            }
            break;
        case 'logout':
            if (process.argv.length == 3){
                logout()
            }
            else{
                default_flag = 1
            }
            break;
        case 'healthcheck':
            if (process.argv[3] == "--format" && process.argv[4] == 'json' && process.argv.length == 5){
                healthcheck()
            }
            else{
                default_flag = 1
            }
            break;
        case 'resetall':
            if (process.argv.length == 3){
                resetall()
            }
            else{
                default_flag = 1
            }
            break;
        case 'questionnaire_upd':
            if (process.argv[3] == "--source" && process.argv[5] == "--format" && process.argv[6] == "json" && process.argv.length == 7){
                questionnaire_upd(process.argv[4])
            }
            else{
                default_flag = 1
            }
            break;
        case 'resetq':
            if (process.argv[3] == "--questionnaire_id" && process.argv[5] == "--format" && process.argv[6] == "json" && process.argv.length == 7){
                resetq(process.argv[4])
            }
            else{
                default_flag = 1
            }
            break;
        case 'questionnaire':
            if (process.argv[3] == "--questionnaire_id" && process.argv[5] == "--format" && process.argv[6] == "json" && process.argv.length == 7){
                questionnaire(process.argv[4])
            }
            else{
                default_flag = 1
            }
            break;
        case 'question':
            if (process.argv[3] == "--questionnaire_id" && process.argv[5] == "--question_id" && process.argv[7] == "--format" 
                && process.argv[8] == "json" && process.argv.length == 9){
                    const args = {
                        "questionnaire_id": `${process.argv[4]}`,
                        "question_id": `${process.argv[6]}`
                    };
                    question(args)
                }
            else{
                default_flag = 1
            }
            break;
        case 'doanswer':
            if (process.argv[3] == "--questionnaire_id" && process.argv[5] == "--question_id" && process.argv[7] == "--session" && 
                process.argv[9] == "--optionID" && process.argv[11] == "--format" && process.argv[12] == "json" && process.argv.length == 13){
                const args = {
                    "questionnaire": `${process.argv[4]}`,
                    "question": `${process.argv[6]}`,
                    "session": `${process.argv[8]}`,
                    "option": `${process.argv[10]}`,
                };
                doanswer(args)
            }
            else{
                default_flag = 1
            }
            break;
        case 'getsessionanswers':
            if (process.argv[3] == "--questionnaire_id" && process.argv[5] == "--session" && 
                process.argv[7] == "--format" && process.argv[8] == "json" && process.argv.length == 9){
                const args = {
                    "questionnaire_id": `${process.argv[4]}`,
                    "session_id": `${process.argv[6]}`,
                };
                getsessionanswers(args)
            }
            else{
                default_flag = 1
            }
            break;
        case 'getquestionanswers':
            if (process.argv[3] == "--questionnaire_id" && process.argv[5] == "--question_id" && 
                process.argv[7] == "--format" && process.argv[8] == "json" && process.argv.length == 9){
                const args = {
                    "questionnaire_id": `${process.argv[4]}`,
                    "question_id": `${process.argv[6]}`,
                };
                getquestionanswers(args)
            }
            else{
                default_flag = 1
            }
            break;
        case 'showquestionnaire':
            if (process.argv[3] == "--questionnaire_id" && process.argv[5] == "--format" 
                && process.argv[6] == "json" && process.argv.length == 7){
                showquestionnaire(process.argv[4])
            }
            else{
                default_flag = 1
            }
            break;
        case 'session_upd':
            if (process.argv[3] == "--source" && process.argv[5] == "--format" && process.argv[6] == "json" && process.argv.length == 7){
                session_upd(process.argv[4])
            }
            else{
                default_flag = 1
            }
            break;
        case 'admin':
            if (process.argv[3] == "--usermod" && process.argv[4] == "--username" && process.argv[6] == "--passw" && process.argv[8] == "--format" && process.argv[9] == "json" && process.argv.length == 10){
                const args = {
                    "username": `${process.argv[5]}`,
                    "password": `${process.argv[7]}`
                };
                admin(args)
            }
            else if (process.argv[3] == "--users" && process.argv[5] == "--format" && process.argv[6] == "json" && process.argv.length == 7){
                admin(process.argv[4])
            }
            else{
                default_flag = 1
            }
            break;
        default:
            default_flag = 1
        } 
    }

cases().then(() => {
    if (default_flag){
        myArray = [
            {
                scope: 'login',
                AuthRequired: 'False', 
                Parameters: '--username --password',
                Returns: 'JSON Object',
                Example: 'se2284 login --username mike --password 654321 --format json'
            }, 
            {
                scope: 'logout', 
                AuthRequired: 'True (Must Be Logged In)', 
                Parameters: '',
                Returns: '',
                Example: 'se2284 logout'
            },
            {
                scope: 'healthcheck', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '',
                Returns: 'JSON Object',
                Example: 'se2284 healthcheck --format json'
            },
            {
                scope: 'resetall', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '',
                Returns: 'JSON Object',
                Example: 'se2284 resetall'
            },
            {
                scope: 'questionnaire_upd', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '--source file (file must be saved in home directory of your system)',
                Returns: 'JSON Object',
                Example: 'se2284 questionnaire_upd --source test --format json'
            },
            {
                scope: 'resetq', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '--questionnaire_id id',
                Returns: 'JSON Object',
                Example: 'se2284 resetq --questionnaire_id QQ010 --format json'
            },
            {
                scope: 'questionnaire', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '--questionnaire_id id',
                Returns: 'JSON Object',
                Example: 'se2284 questionnaire --questionnaire_id QQ010 --format json'
            },
            {
                scope: 'question', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '--questionnaire_id id --question_id id',
                Returns: 'JSON Object',
                Example: 'se2284 question --questionnaire_id QQ010 --question_id P01 --format json'
            },
            {
                scope: 'doanswer', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '--questionnaire_id id --question_id id --session_id id --option_id',
                Returns: 'JSON Object',
                Example: 'se2284 doanswer --questionnaire_id QQ010 --question_id P01 --session 4WEQ --optionID P01A3 --format json'
            },
            {
                scope: 'getsessionanswers', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '--questionnaire_id id --session id',
                Returns: 'JSON Object',
                Example: 'se2284 getsessionanswers --questionnaire_id QQ010 --session 4WEQ --format json'
            },
            {
                scope: 'getquestionanswers', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '--questionnaire_id id --question_id id',
                Returns: 'JSON Object',
                Example: 'se2284 getquestionanswers --questionnaire_id QQ010 --question_id Q05 --format json'
            },
            {
                scope: 'showfullquestionnaire', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '--questionnaire_id id',
                Returns: 'JSON Object',
                Example: 'se2284 showquestionnaire --questionnaire_id QQ001 --format json'
            },
            {
                scope: 'session_upd', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '--source file (file must be saved in home directory of your system)',
                Returns: 'JSON Object',
                Example: 'se2284 session_upd --source test --format json'
            },
            {
                scope: 'admin --usermod', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: '--username username --passw password',
                Returns: 'JSON Object',
                Example: 'se2284 admin --usermod --username mike --passw password --format json'
            },
            {
                scope: 'admin --users', 
                AuthRequired: 'True (Must Be Logged In As Admin)', 
                Parameters: 'username name',
                Returns: 'JSON Object',
                Example: 'se2284 admin --users mike --format json'
            }]
        console.log('\nYou Have Typed Wrong Command, Please See The Info Below About The Available Calls\n')
        console.table(myArray, ['scope', 'AuthRequired', ['Parameters'], ['Returns']])
        console.table(myArray, ['scope', 'Example'])
    }});


