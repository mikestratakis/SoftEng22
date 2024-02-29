import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/popup/popup.component';
import { NoanswerpopupComponent } from 'src/app/noanswerpopup/noanswerpopup.component';
import { environment as env } from '../../../environments/environment';




interface Question {
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {


  //http://localhost:4200/user/home/test1234



  questionnaire:FormGroup;
  questionnaireID:string
  questionnaireJSON: any;
  survey:any;
  section:FormArray;
  question:FormArray;
  answer:FormArray;

  secNum: number = 1;
  queNum:number=1;
  ansNum:number=1;
  dropdownOpen: boolean = false;
  stepNum:number =1;
  demo1TabIndex:number=0;
  private url = `${env.baseUrl}`;
  lastQuestion : boolean=false;
  showForm:boolean=false;
  additionalStep:any=0;
  counterQuestion:number=1;
  NgdialogRef: any;
  ordinality:number[]=[this.stepNum]
  hasChecked:boolean=false;

  
  constructor(private route:ActivatedRoute,private http:HttpClient,private fb:FormBuilder,public ngbModal:NgbModal) { }

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      if (params["qid"])
      {
            this.questionnaireID=params["qid"];

            this.http.get<any>(`${this.url}/questionnaire/${this.questionnaireID}`,{})
            .subscribe({
              next:
                (response:any) => {
                  this.questionnaireJSON=response;
                  this.questionnaire=this.fb.group({ 
                    questionnaireID:[response.questionnaireID],
                    questionnaireTitle: [response.questionnaireTitle],
                    keywords: [response.keywords],      
                    questions : this.fb.array(response.questions.map((question:any)=>{
                     
                      const group = this.addQuestion(question);
                      return group ;

                    }))
                  })
                  this.showForm=true;
                    },
              error:
              (err:any) => 
                {
                  console.log(err);
                }
            });
       }
      })
      

  }

  addQuestion(question:any): FormGroup {

   
    let groupQuestion=this.fb.group({
      qID: question.qID,
      qtext:[question.qtext],
      required: [question.required],
      type:[question.type],
      options:this.fb.array([])
    })

    let options=groupQuestion.get("options") as FormArray;

    question.options.map((option:any)=>{
      options.push(this.createAnswer(option))
     })

    return groupQuestion;
  }

  goPrev()
  {
  this.ordinality.pop();
  this.stepNum=this.ordinality.at(-1);
  this.counterQuestion--;
  this.lastQuestion=false;
  this.hasChecked=false;
  }
 
  goNext()
  {
   if(!this.hasChecked)
   {
    this.NgdialogRef = this.ngbModal.open(NoanswerpopupComponent,{
      windowClass: 'popupModal',
      centered:true,
      backdrop  : 'static',
      keyboard  : false
    });
    return;
   }    
  

    if(this.stepNum>=1 && !isNaN(this.additionalStep))
    {
   this.stepNum=this.additionalStep;
   this.ordinality.push(this.stepNum)
   this.counterQuestion++;

    }
    else
    {
    this.stepNum=this.stepNum+1;
    this.ordinality.push(this.stepNum)
    this.counterQuestion++;
    }

    this.hasChecked=false;
  }
 

 


  openForm():boolean
  {
    return this.showForm;
  }



  createAnswer(response:any):FormGroup
  {
      let answer= this.fb.group({
        optID: response.optID,
        opttxt:[response.opttxt],
        optvalue:[response.optvalue],
        nextqID: [response.nextqID]
      })
      return answer;
    }
    


  getQuestion(pos:number)
  {
   let ArrayQuestion=this.questionnaire.get("questions") as FormArray;
   return [ArrayQuestion.at(pos-1)];
   
  }

  isFirst() {
  
     if(this.stepNum>1) return false;
     else return true;
  
 }

 isLast() {

  return this.lastQuestion;

}

answerChange(j:number,k:number) 
{

  this.hasChecked=true;

  this.survey= this.questionnaireJSON;


  for(let index=0;index < this.survey.questions[j].options.length;index++)   //reset
  this.survey.questions[j].options[index].optvalue='false';


  this.survey.questions[j].options[k].optvalue='true';  //set answer value

  this.additionalStep=parseInt(this.survey.questions[j].options[k].nextqID.split('Q')[1]);;

  ///algorithm/submit form
  if(this.survey.questions[j].options[k].nextqID=="SUBMIT" || this.survey.questions[j].options[k].nextqID=="NaN")
  {
   this.lastQuestion=true;
  }


}

onSubmit(){

  
  this.stepNum=1; //reset
  this.counterQuestion=1;//reset
  let SessionUser={
    questionnaireID:this.questionnaireID,
    session: this.makeSessionId(4),
    answers:[] as any
  }

  //add answers
  for(let i=0;i < this.survey.questions.length;i++)   
  {
    let question=this.survey.questions[i];
    let answer= question.options.find((opt:any)=>
      {
       if(opt.optvalue=="true")
       return opt.optID;
      })
      if(answer==undefined)
      {
        SessionUser.answers[i]={
          qID: question.qID,
          ans: ""
        }
      }
      else
      {
        SessionUser.answers[i]={
          qID: question.qID,
          ans: answer.optID
        }
      }

  }

  console.info(SessionUser)


  /////////////////save to Mongo

  this.http.post<any>(`${this.url}/user/questionnaire/session/save`,SessionUser)
  .subscribe({
    next:
      (response:any) => {
          console.info(response);
          ////start
       
          this.NgdialogRef = this.ngbModal.open(PopupComponent,{
           windowClass: 'popupModal',
           centered:true,
           backdrop  : 'static',
           keyboard  : false
         });  

        // this.NgdialogRef.componentInstance.qID=this.questionnaire.value.questionnaireID;
        
         this.demo2BtnClick()
         this.hasChecked=false;
         this.lastQuestion=false;

          },
    error:
    (err:any) => 
      {
        console.log(err);
      }
  });

}


makeSessionId(length:number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
  //change tab

  demo2BtnClick() {
    this.demo1TabIndex=1;
  }

}
