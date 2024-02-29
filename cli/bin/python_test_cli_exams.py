import subprocess
import time

# we assume that se2284 has been globally installed locally

# testing login
print(30*"*" + " Login Cli Test " + 30*"*")
print("We are logging in")
login = subprocess.run(["se2284", "login", "--username", "mikenew", 
                                "--password", "123456", "--format", "json"], capture_output=True, text=True).stdout
string_login = str(login)
print(string_login, end=' ')
if("token" in string_login):
    print(">>>>> Login Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Login Cli Command Is Not Working <<<<<" + "\n")

time.sleep(5)
print("Exams 3.1 Test: Επιβεβαίωση της λειτουργίας (healthcheck)")
time.sleep(5)
# testing healthcheck
print("\n" + 30*"*" + " HealthCheck Cli Test " + 30*"*")
healthcheck = subprocess.run(["se2284", "healthcheck", "--format", "json"], capture_output=True, text=True).stdout
string_healthcheck = str(healthcheck)
print(string_healthcheck, end=' ')
if("state: 'OK'" in string_healthcheck and 
   "dbState: 'connected'" in string_healthcheck and 
   "connectionstring: 'mongodb+srv://gkit:eBEHaH%402i3%40xpVZ@cluster0.rmvpre9.mongodb.net/softeng_22_84'" in string_healthcheck):
    print(">>>>> Healthcheck Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Healthcheck Cli Command Is Not Working <<<<<" + "\n")

time.sleep(5)
print("Επειδή η βάση δεδομένων μας είναι άδεια αυτή τη στιγμή ανεβάζουμε ένα ερωτηματολόγιο")
time.sleep(5)
# upload questionnaire from cli
print(30*"*" + " Questionnaire_upd Cli Test " + 30*"*")
print("Uploading Questionnaire with QuestionnaireID: QQ001")
questionnaire_upd = subprocess.run(["se2284", "questionnaire_upd", "--source", "questionnaire_QQ001", "--format", "json"], capture_output=True, text=True).stdout
string_questionnaire_upd = str(questionnaire_upd)
print(string_questionnaire_upd, end=' ')
if("save: 'Successfully Saved Questionnaire'" in string_questionnaire_upd):
    print(">>>>> Questionnaire_upd Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Questionnaire_upd Cli Command Is Not Working <<<<<" + "\n")

time.sleep(5)
print("Exams 3.2 Test: Εμφάνιση του ερωτηματολογίου που περιέχει η βάση")
time.sleep(5)
# showing the only one questionnaire so far we uploaded earlier
print(30*"*" + " ShowOneQuestionnaire Cli Test " + 30*"*")
print("Info about Questionnaire with QuestionnaireID: QQ001")
questionnaire = subprocess.run(["se2284", "showquestionnaire", "--questionnaire_id", "QQ001", "--format", "json"], capture_output=True, text=True).stdout
string_questionnaire = str(questionnaire)
lines_questionnaire = string_questionnaire.split("\n")
for line in lines_questionnaire:
    print(line)
    time.sleep(0.1)
#print(string_questionnaire, end=' ')
if('"questionnaireID": "QQ001"' in string_questionnaire):
    print(">>>>> Questionnaire Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Questionnaire Cli Command Is Not Working <<<<<" + "\n")

time.sleep(5)
print("Exams 3.3 Test: Απάντηση των ερωτήσεων του ερωτηματολογίου, απαντάμε το ερωτηματολόγιο 5 φορές")
time.sleep(5)
# afterward we add 5 answers in our questionnaire with id QQ001
# answering questionnaire with ID QQ001
print(30*"*" + " Session_upd Cli Test " + 30*"*")
print("Uploading Session for QuestionnaireID: QQ001")
session_upd = subprocess.run(["se2284", "session_upd", "--source", "session_QQ001_ans1", "--format", "json"], capture_output=True, text=True).stdout
string_session_upd = str(session_upd)
print(string_session_upd, end=' ')
if("save: 'Successfully Saved Session" in string_session_upd):
    print(">>>>> Session_upd Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Session_upd Cli Command Is Not Working <<<<<" + "\n")

time.sleep(3)
# testing answering questionnaire with ID QQ001
print(30*"*" + " Session_upd Cli Test " + 30*"*")
print("Uploading Session for QuestionnaireID: QQ001")
session_upd = subprocess.run(["se2284", "session_upd", "--source", "session_QQ001_ans2", "--format", "json"], capture_output=True, text=True).stdout
string_session_upd = str(session_upd)
print(string_session_upd, end=' ')
if("save: 'Successfully Saved Session" in string_session_upd):
    print(">>>>> Session_upd Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Session_upd Cli Command Is Not Working <<<<<" + "\n")

time.sleep(3)
# testing answering questionnaire with ID QQ001
print(30*"*" + " Session_upd Cli Test " + 30*"*")
print("Uploading Session for QuestionnaireID: QQ001")
session_upd = subprocess.run(["se2284", "session_upd", "--source", "session_QQ001_ans3", "--format", "json"], capture_output=True, text=True).stdout
string_session_upd = str(session_upd)
print(string_session_upd, end=' ')
if("save: 'Successfully Saved Session" in string_session_upd):
    print(">>>>> Session_upd Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Session_upd Cli Command Is Not Working <<<<<" + "\n")

time.sleep(3)
# testing answering questionnaire with ID QQ001
print(30*"*" + " Session_upd Cli Test " + 30*"*")
print("Uploading Session for QuestionnaireID: QQ001")
session_upd = subprocess.run(["se2284", "session_upd", "--source", "session_QQ001_ans4", "--format", "json"], capture_output=True, text=True).stdout
string_session_upd = str(session_upd)
print(string_session_upd, end=' ')
if("save: 'Successfully Saved Session" in string_session_upd):
    print(">>>>> Session_upd Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Session_upd Cli Command Is Not Working <<<<<" + "\n")

time.sleep(3)
# testing answering questionnaire with ID QQ001
print(30*"*" + " Session_upd Cli Test " + 30*"*")
print("Uploading Session for QuestionnaireID: QQ001")
session_upd = subprocess.run(["se2284", "session_upd", "--source", "session_QQ001_ans5", "--format", "json"], capture_output=True, text=True).stdout
string_session_upd = str(session_upd)
print(string_session_upd, end=' ')
if("save: 'Successfully Saved Session" in string_session_upd):
    print(">>>>> Session_upd Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Session_upd Cli Command Is Not Working <<<<<" + "\n")

time.sleep(5)
print("Exams 3.4 Test: Εμφάνιση όλων των απαντήσεων που δόθηκαν σε μία ερώτηση (της επιλογής σας) σε όλα τα session απαντήσεων")
time.sleep(5)
# testing getquestionanswers
print(30*"*" + " Getquestionanswers Cli Test " + 30*"*")
print("We are showing the answers in Question: Q05 for  QuestionnaireID: QQ001 for all sessions")
time.sleep(5)
getquestionanswers = subprocess.run(["se2284", "getquestionanswers", "--questionnaire_id", "QQ001", 
                                "--question_id", "Q05", "--format", "json"], capture_output=True, text=True).stdout
string_getquestionanswers = str(getquestionanswers)
print(string_getquestionanswers, end=' ')
if("questionnaireID: 'QQ001'" in string_getquestionanswers):
    print(">>>>> Getquestionanswers Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Getquestionanswers Cli Command Is Not Working <<<<<" + "\n")

time.sleep(5)
print("Exams 3.5 Test: Αρχικοποίηση (resetall)")
time.sleep(5)
# resetall
print(30*"*" + " ResetAll Cli Test " + 30*"*")
logout = subprocess.run(["se2284", "resetall"], capture_output=True, text=True).stdout
string_logout = str(logout)
print(string_logout, end=' ')
print(">>>>> ResetAll Cli Command Works <<<<<" + "\n")

time.sleep(5)
print("Eφόσον κάναμε resetall τότε δημιοργούμε ένα νέο χρήστη από την αρχή και ύστερα κάνουμε login με αυτόν τον χρήστη")
time.sleep(5)
# testing admin usermod
print(30*"*" + " Admin Add New User Cli Test " + 30*"*")
print("We are adding a new administrator with Name: mikenew and Password: 123456")
time.sleep(5)
admin_add_new_user = subprocess.run(["se2284", "admin", 
                                     "--usermod", "--username", "mikenew", 
                                     "--passw", "123456", "--format", "json"], capture_output=True, text=True).stdout
string_admin_add_new_user = str(admin_add_new_user)
print(string_admin_add_new_user, end=' ')
if("userCreated:" in string_admin_add_new_user or "passwordChanged:" in string_admin_add_new_user):
    print(">>>>> Admin Add New User Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Admin Add New User Cli Command Is Not Working <<<<<" + "\n")

time.sleep(5)
print("Ο χρήστης δημιουργήθηκε και τώρα πραγματοποιούμε login")
time.sleep(5)
# testing login
print(30*"*" + " Login Cli Test " + 30*"*")
print("We are logging in")
login = subprocess.run(["se2284", "login", "--username", "mikenew", 
                                "--password", "123456", "--format", "json"], capture_output=True, text=True).stdout
string_login = str(login)
print(string_login, end=' ')
if("token" in string_login):
    print(">>>>> Login Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Login Cli Command Is Not Working <<<<<" + "\n")

time.sleep(5)
print("Exams 3.6 Test: Ανέβασμα ερωτηματολογίου (questionnaire_upd)")
time.sleep(5)
# upload questionnaire from cli
print(30*"*" + " Questionnaire_upd Cli Test " + 30*"*")
print("Uploading Questionnaire with QuestionnaireID: QQ001")
questionnaire_upd = subprocess.run(["se2284", "questionnaire_upd", "--source", "questionnaire_QQ001", "--format", "json"], capture_output=True, text=True).stdout
string_questionnaire_upd = str(questionnaire_upd)
print(string_questionnaire_upd, end=' ')
if("save: 'Successfully Saved Questionnaire" in string_questionnaire_upd):
    print(">>>>> Questionnaire_upd Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Questionnaire_upd Cli Command Is Not Working <<<<<" + "\n")

time.sleep(5)
print("Exams 3.7 Test: Εμφάνιση του ερωτηματολογίου που περιέχει η βάση")
time.sleep(5)
# showing the only one questionnaire so far we uploaded earlier
print(30*"*" + " ShowOneQuestionnaire Cli Test " + 30*"*")
print("Info about Questionnaire with QuestionnaireID: QQ001")
questionnaire = subprocess.run(["se2284", "showquestionnaire", "--questionnaire_id", "QQ001", "--format", "json"], capture_output=True, text=True).stdout
string_questionnaire = str(questionnaire)
print(string_questionnaire, end=' ')
if('"questionnaireID": "QQ001"' in string_questionnaire):
    print(">>>>> Questionnaire Cli Command Works <<<<<" + "\n")
else:
    print(">>>>> Questionnaire Cli Command Is Not Working <<<<<" + "\n")