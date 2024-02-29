const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const path = require('path');
const error = require( path.resolve( __dirname, "./error.js" ) );
const signInRouter= require("./routes/signin.route");
const signOutRouter= require("./routes/signout.route");
const signUpRouter= require("./routes/signup.route");
const questionnaireRouter= require("./routes/questionnaire.route");
const {requireAuth, checkUser, isAdmin } = require('./middleware/authMiddleware');
const { async } = require("rxjs");
const app = express();
const cors = require('cors');
require('./models/session')


mongoose
  .connect(
    "mongodb+srv://gkit:eBEHaH%402i3%40xpVZ@cluster0.rmvpre9.mongodb.net/softeng_22_84"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((e) => {
    console.log("Connection failed!");
  });

const conn = mongoose.createConnection("mongodb+srv://gkit:eBEHaH%402i3%40xpVZ@cluster0.rmvpre9.mongodb.net/softeng_22_84");


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use cookieParser to read cookies when requesting them
app.use(cookieParser());

//login/register/logout
app.use("/api/login", signInRouter);
app.use("/api/logout", signOutRouter);
app.use("/api/users", signUpRouter);
/////Client user
app.use("/api/questionnaire", questionnaireRouter);


//------Admin Api Requeirements------//
const User = mongoose.model('User')
const QuestionnaireDb = mongoose.model('Questionnaire')
const SessionDb = mongoose.model('Session')

//healthcheck
const serverStatus = () => {
  return { 
     state: 'OK', 
     dbState: mongoose.STATES[mongoose.connection.readyState],
     connectionstring: mongoose.connections[0]._connectionString
  }
};
app.get('/api/admin/healthcheck',isAdmin, require('express-healthcheck')(
{
  healthy: serverStatus
}));

//resetall
app.get('/api/admin/showusers', async (req, res) => {
  const users = await User.find();
  res.send(users)
});

//Deletes everything in database
app.post('/api/admin/resetall', isAdmin, async (req, res) => {
  try 
    {
        // we delete users, questionnaires and sessions
        const users = await User.deleteMany({});
        const questionnaires = await QuestionnaireDb.deleteMany({});
        const sessions = await SessionDb.deleteMany({});
        if (!users && !questionnaires && !sessions)
            return next(new error.NotFoundError('user-questionnaires-sessions'))
        var data = {
          state: 'OK',
          usersDeleted: users,
          questionnairesDeleted: questionnaires,
          sessionsDeleted: sessions
        };
        res.status(200).send(data)
    } catch (err) {
      var data = {
        state: 'Failed',
        reason: new error.BadRequestError(err)
      };
      res.status(400).send(data)
    }
});

//Deletes all questionnaires
app.post('/api/admin/resetallquestions', isAdmin, async (req, res) => {
  try 
    {
        const questionnaires = await QuestionnaireDb.deleteMany({});
        if (!questionnaires)
            return next(new error.NotFoundError('user-questionnaires'))
        var data = {
          state: 'OK',
          questionnairesDeleted: questionnaires
        };
        //QuestionnaireDb.collection.drop();
        res.status(200).send(data)
    } catch (err) {
      var data = {
        state: 'Failed',
        reason: err
      };
      res.status(400).send(data)
    }
});

//Deletes one specific questionnaire
app.post('/api/admin/resetonequestionnaire/:questionnaireID', isAdmin, async (req, res) => {
  try 
    {
        const questionnaires = await QuestionnaireDb.deleteMany({questionnaireID: req.params.questionnaireID});
        if (!questionnaires)
            return next(new error.NotFoundError('user-questionnaires'))
        var data = {
          state: 'OK',
          questionnairesDeleted: questionnaires
        };
        //QuestionnaireDb.collection.drop();
        res.status(200).send(data)
    } catch (err) {
      var data = {
        state: 'Failed',
        reason: err
      };
      res.status(400).send(data)
    }
});

//POST {baseURL}/admin/questionnaire_upd
app.post('/api/admin/questionnaire_upd', isAdmin, async (req, res) => {
  try 
    {
        console.info("try to save!")
        var questionnaire_json = JSON.parse(JSON.stringify(req.body));
        const questionnaire = await QuestionnaireDb.create(questionnaire_json)
        res.json({
              id: questionnaire._id,
              save: "Successfully Saved Questionnaire"
          });
    }
    catch (err) {
      var data = {
        state: 'Failed',
        reason: err
      };
      res.status(400).send(data)
    }
});

app.post('/api/user/questionnaire/session/save', async (req, res) => {
  try 
    {
        console.info("try to save session!")
        var session_json = JSON.parse(JSON.stringify(req.body));
        const session = await SessionDb.create(session_json)
        res.json({
              id: session._id,
              save: "Successfully Saved Questionnaire"
          });
    }
    catch (err) {
      var data = {
        state: 'Failed',
        reason: err
      };
      res.status(400).send(data)
    }
});

// show all questionnaire info, uploaded as objects, as they exist in db
app.get('/api/admin/show_all_questionnaires', isAdmin, async (req, res) => {
  try{
    const questionnaire = await QuestionnaireDb.find().exec()
    if (questionnaire.length >= 1){
      res.status(200).send(questionnaire)
    }
    else{
      var data = {
        state: 'Failed To Find Questionnaires',
      };
      res.status(200).send(data)
    }
  }
  catch (err) {
    var data = {
      state: 'Failed',
      reason: err
    };
    res.status(400).send(data)
  }
});

// show one specific questionnaire info, uploaded as objects, as they exist in db
app.get('/api/admin/show_one_questionnaire/:questionnaireID', isAdmin, async (req, res) => {
  try{
    const questionnaire = await QuestionnaireDb.findOne({questionnaireID: req.params.questionnaireID}).exec()
    if (questionnaire){
      res.status(200).send(questionnaire)
    }
    else{
      var data = {
        state: `Failed To Find Questionnaire with id: ${req.params.questionnaireID}`,
      };
      res.status(200).send(data)
    }
  }
  catch (err) {
    var data = {
      state: 'Failed',
      reason: err
    };
    res.status(400).send(data)
  }
});

//POST {baseURL}/admin/resetq/:questionnaireID, e.x questionnaireID = QQ001
app.post('/api/admin/resetq/:questionnaireID', isAdmin, async (req, res) => {
  try{
    const questionnaire = await QuestionnaireDb.findOne({questionnaireID: req.params.questionnaireID}).exec()
    if (questionnaire){
      // Delete options field for every question
      questionnaire.questions.forEach(question => {
      question.options = undefined
    });
    await questionnaire.save()
    var data = {
      state: 'OK',
      info: `Answers have been deleted for Questionnaire with id: ${req.params.questionnaireID}`
    };
    res.status(200).send(data)
  }
  else{
    var data = {
      state: `Failed To Find Questionnaire with id ${req.params.questionnaireID}`,
    };
    res.status(200).send(data)
  }
}
catch (err) {
  var data = {
    state: 'Failed',
    reason: err
  };
  res.status(400).send(data)
}
});

// προαιρετικά api
// {baseURL}/admin/usermod/:username/:password
// here this function does not require to be logged in as admin, because after resetting the system we cannot create new users
// before deployment make sure to add isAdmin middleware for safety reasons
app.post('/api/admin/usermod/:username/:password/', async (req, res) => {
  try 
    {
      const user = await User.findOneAndUpdate(
        {username: req.params.username}, 
        {password: req.params.password},
        {new: true}).exec()
      if (user){
        res.status(200).json({
          passwordChanged: "OK",
          username: req.params.username,
          newPassword: req.params.password
        });
      }
      else{
        const user = new User({
          username: req.params.username,
          password: req.params.password,
          role: "administrator"
        });
        try{
          user.save();
          res.status(200).json({
            userCreated: "OK",
            username: req.params.username,
            password: req.params.password,
            role: "administrator"});
        }
        catch (err){
          console.log(err);
          res.status(400).json({
            userCreated: "Failed",
            error: err});
        }
      }
    } catch (err) {
      var data = {
        state: 'Failed',
        reason: err
      };
      res.status(400).send(data)
    }
});

//{baseURL}/admin/users/:username
app.get('/api/admin/users/:username', isAdmin, async (req, res) => {
  try{
    const user = await User.findOne({username: req.params.username}).exec();
    if (user){
      res.status(200).json({
        userFound: "OK",
        username: user.username,
        password: user.password,
        role: user.role,
        id: user._id
      });
    }
    else{
      res.status(404).json({
        userFound: "Failed",
        reason: "User Not Found",
      });
    }
  }
  catch (err) {
    var data = {
      state: 'Failed',
      reason: err
    };
    res.status(400).send(data)
  }
});


//------System Api Requeirements------//
// GET {baseURL}/questionnaire/:questionnaireID, e.x: questionnaireID = QQ001
app.get('/api/questionnaires/:questionnaireID', isAdmin, async (req, res) => {
  try{
    //select everything except id and options
    const questionnaire = await QuestionnaireDb.findOne(
      {
        questionnaireID: req.params.questionnaireID
      }).select('-_id -questions.options').exec()
    if (questionnaire){
      res.status(200).send(questionnaire)
    }
    else{
      var data = {
        state: `No questionnaire with id ${req.params.questionnaireID} was found.`
      }
      res.status(404).send(data)
    }
  }
  catch(err){
    var data = {
      state: 'Failed To Find Questionnaire',
      reason: err
    };
    res.status(400).send(data)
  }
});

// GET {baseURL}/question/:questionnaireID/:questionID
app.get('/api/question/:questionnaireID/:questionID', isAdmin, async (req, res) => {
  try{
    //here we search for the specific questionID that belongs to a specific questionnaire
    //and afterwards we select only the nested question object that includes the answers
    const questionnaire = await QuestionnaireDb.findOne(
      {
        questionnaireID: req.params.questionnaireID,
        questions:{
          $elemMatch:{
            qID: req.params.questionID},
          }
      }).select('questionnaireID')
        .select({questions: {$elemMatch: {qID: req.params.questionID}}});
    
    if (questionnaire){
      var data = {
        questionnaireID: questionnaire.questionnaireID,
        qID: questionnaire.questions[0].qID,
        qtext: questionnaire.questions[0].qtext,
        required: questionnaire.questions[0].required,
        type: questionnaire.questions[0].type,
        options: questionnaire.questions[0].options
      }
      res.status(200).send(data)
    }
    else{
      var data = {
        state: 'Failed',
        reason: 'Check the given parameters. No questionnaire was found'
      };
      res.status(404).send(data)
    }
  }
  catch(err){
    var data = {
      state: 'Failed To Find Questionnaire',
      reason: err
    };
    res.status(400).send(data)
  }
});

//POST {baseURL}/doanswer/:questionnaireID/:questionID/:session/:optionID
app.post('/api/doanswer/:questionnaireID/:questionID/:session/:optionID', isAdmin, async (req, res) => {
  try{
    // first we search for the requested session, and for the specific questionID we update the optionID
    const session = await SessionDb.updateOne({
      session: req.params.session,
      "questionnaireID": req.params.questionnaireID,
      answers:{
        $elemMatch:{
          qID: req.params.questionID},
        },
      },
      {
        $set: {"answers.$.ans": req.params.optionID}
      });
      if (session.matchedCount >=1){
        res.status(200).send(session)
      }    
      else{
        var data = {
          state: 'Failed',
          reason: 'Check the given parameters. No session was found'
        };
        res.status(404).send(data)
      }
  }
  catch(err){
    var data = {
      state: 'Failed',
      reason: err
    };
    res.status(400).send(data)
  }
});

//GET {baseURL}/getsessionanswers/:questionnaireID/:session
app.get('/api/getsessionanswers/:questionnaireID/:session', isAdmin, async (req, res) => {
  try{
    const session = await SessionDb.findOne(
      {
        "questionnaireID": req.params.questionnaireID,
        "session": req.params.session
      }).select('-_id').exec()
    if(session){
      res.status(200).send(session)
    }
    else{
      var data = {
        state: 'Failed',
        reason: 'Session not found'
      };
      res.status(404).send(data)
    }
  }
  catch(err){
    var data = {
      state: 'Failed',
      reason: err
    };
    res.status(400).send(data)
  }
});

//GET {baseURL}/getallsessions/:questionnaireID
app.get('/api/getallsessions/:questionnaireID', isAdmin, async (req, res) => {
  try{
    const sessions = await SessionDb.find(
      {
        "questionnaireID": req.params.questionnaireID
      }).select('-_id').exec()
    if(sessions){
      res.status(200).send(sessions)
    }
    else{
      var data = {
        state: 'Failed',
        reason: 'Sessions not found'
      };
      res.status(402).send(data)
    }
  }
  catch(err){
    var data = {
      state: 'Failed',
      reason: err
    };
    res.status(400).send(data)
  }
});


//GET {baseURL}/getquestionanswers/:questionnaireID/:questionID
app.get('/api/getquestionanswers/:questionnaireID/:questionID', isAdmin, async (req, res) => {
  try{
    // we search for the session that has info about the specific questionnaire and question
    // afterward we sort the results by id, so we sort from the oldest sessions to the newer
    const session = await SessionDb.find(
      {
        questionnaireID: req.params.questionnaireID,
        answers:{
          $elemMatch:{
            qID: req.params.questionID},
          }
      }).select('questionnaireID session -_id')
        .select({answers: {$elemMatch: {qID: req.params.questionID}}})
        .sort('-_id').exec();

      if(session){
        // if session exists we create and respond with the required object
        var session_answers = []
        session.forEach( session_iter => {
        var temp = {
          session: session_iter.session,
          ans: session_iter.answers[0].ans
        }
        session_answers.push(temp)
      });
      var data = {
        questionnaireID: session[0].questionnaireID,
        questionID: req.params.questionID,
        answers: session_answers
      }
        res.status(200).send(data)
      }
      else{
        var data = {
          state: 'Failed',
          reason: 'Session not found'
        };
        res.status(404).send(data)
      }
  }
  catch(err){
    var data = {
      state: 'Failed',
      reason: err
    };
    res.status(400).send(data)
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  if (!('status' in err))
      err.status = 400
  if (err.status === 500)
      err.message = undefined
  res.status(err.status).json({
      name: err.name,
      message: err.message
  })
})

// Session checks
app.get('/api/admin/showsessions', isAdmin, async (req, res) => {
  const sessions = await SessionDb.find();
  res.send(sessions)
});

app.post('/api/admin/session_upd', isAdmin, async (req, res) => {
  try 
    {
      // before saving the session we check that the session info exists in some questionnaire
      // meaning the questionnaireID, the questions and the answers exist
      console.info("try to save session!")
      const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      var session_json = JSON.parse(JSON.stringify(req.body));
      var correct_session_id = 0
      const questionnaire = await QuestionnaireDb.findOne({questionnaireID: req.body.questionnaireID}).exec()
      if (questionnaire){
        questionnaire.questions.forEach(questanswer => {
          req.body.answers.forEach(answer => {
            if (answer.qID == questanswer.qID){
              questanswer.options.forEach(optID => {
                if (answer.ans == optID.optID){
                  //console.log(answer.ans)
                  correct_session_id += 1
                }
                else{
                  // if the answers don't match then maybe we have the question that requests mail from the user
                  if (regexExp.test(answer.ans)){
                    //console.log(answer.ans)
                    correct_session_id += 1
                  }
                }
              })
            }
          })
        });
        if (correct_session_id == req.body.answers.length){
          const session = await SessionDb.create(session_json)
          res.json({
            id: session._id,
            save: "Successfully Saved Session"
          });
        }
        else{
          var data = {
            state: 'Failed',
            reason: 'Session info does not match with questionnaire info'
          };
          res.status(400).send(data)
        }
      }
      else{
        var data = {
          state: 'Failed',
          reason: 'QuestionnaireID does not exist hence there cannot be any sessions'
        };
        res.status(400).send(data)
      }
    }
    catch (err) {
      var data = {
        state: 'Failed',
        reason: err
      };
      res.status(400).send(data)
    }
});

module.exports = app;
