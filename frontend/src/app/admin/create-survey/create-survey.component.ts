
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { environment as env } from '../../../environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../popup/popup.component';



interface Question {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {


  private url = `${env.baseUrl}`;

  questionnaire:FormGroup;
  questionnaires:any=[];
  questionnaireJSON: any;
  section:FormArray;
  question:FormArray;
  answer:FormArray;

  secNum: number = 1;
  queNum:number=1;
  ansNum:number=1;
  dropdownOpen: boolean = false;


  showAnswer:boolean=false;
  selectedSurveyName:string;

  demo1TabIndex:number= 0;

  NgdialogRef:NgbModalRef;
  dialogRef:NgbModalRef;

  questionsArray : Question []= [
    {
    value: 'NEXT',
    viewValue:'Next'
  },
  {
    value: 'SUBMIT',
    viewValue:'Submit form'
  },
];
  filterSurveys: any=[];
  stepNum:number =1;
  specificSection: any;
  lastQuestion : boolean=false;
  additionalStep:number=0;

  constructor(private fb:FormBuilder,private http:HttpClient,public ngbModal:NgbModal) {
    
  
   }


  ngOnInit() {

    let newQuestion=this.createQuestion();
    this.questionnaire=this.fb.group({ 
      questionnaireID:['QQ_'+this.generateUUID()],
      questionnaireTitle: [''],
      keywords: [],      
      questions : this.fb.array([newQuestion])
    })


     }


    questions(): FormArray {
      return this.questionnaire.get('questions') as FormArray;

    }

   
     getFilterQuestions(queIndex:number)
     {
       return this.questionsArray.filter((x:any)=>{
         return x.value!="Q"+(queIndex+1);
       });
     } 

  

    createQuestion():FormGroup{
      
      this.ansNum=1;

      this.questionsArray.push({
        value: 'Q'+this.queNum,
        viewValue: 'Question'+this.queNum
      })

      let groupQuestion=this.fb.group({
        qID: 'Q'+this.queNum,
        qtext:[''],
        required: ['FALSE'],
        type:[''],
        options:this.fb.array([this.createAnswer()])
      })

      groupQuestion.controls.qtext.valueChanges.subscribe(
        (value:any) => {
          let item=this.questionsArray.filter((x:any)=>{
            return x.value=="Q"+this.queNum;
          })[0];

          item.viewValue=value;
        });


         return groupQuestion;
       }
       
    addQuestion(){
         let arrayQuestion=this.questionnaire.get("questions") as FormArray;
         this.queNum=arrayQuestion.length;
         this.queNum++;
         arrayQuestion.push(this.createQuestion());
       }

    removeQuestion(queIndex:number){
        let ArrayQuestion=this.questionnaire.get("questions") as FormArray;
        if(ArrayQuestion.length>1)
        ArrayQuestion.removeAt(queIndex);
      }


       
     createAnswer():FormGroup
     {
         return this.fb.group({
           optID:'Q'+this.queNum+'A'+this.ansNum,
           opttxt:[''],
           optvalue:['false'],
           nextqID: ['NEXT']
         })
       }
       
      addAnswer(groupQuestion:FormArray)
      {
           const arrayAnswer=groupQuestion.get('options') as FormArray
           this.ansNum=arrayAnswer.length;
           this.ansNum++;
           arrayAnswer.push(this.createAnswer())
       }

      removeAnswer(groupQuestion:FormArray,posIndex:number)
       {
        const arrayAnswer=groupQuestion.get('options') as FormArray
        if(posIndex>0)
        arrayAnswer.removeAt(posIndex);
       }


       getQuestion(pos:number)
       {
        let ArrayQuestion=this.questionnaire.get("questions") as FormArray;
        return [ArrayQuestion.at(pos-1)];
       }


      onChange(event:any)
      {
        if(event.value!="")
        {
      
        if(event.value.MainInsured==true)    //his.iceModel.elements["customer.details.FullName"].getValue().forIndex(null)
        {
        
        }
        else
        {
        
        }
      
        
        }
      }

    onChangeQuestionnaire(event:any)
    {
      this.selectedSurveyName=event.value;
      this.filterSurveys=this.questionnaires.filter((x:any)=>
      {
        return x.questionnaireTitle==this.selectedSurveyName
      })

    }


    onFileSelect(event:any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.questionnaire.get('questionnaireID').setValue(file);
      }
    }
    
    onUpload()
    {
      const formData = new FormData();
      formData.append('content', this.questionnaire.get('questionnaireID').value);
  

      this.http.post<any>(`${this.url}/admin/questionnaire_upd`,formData)
  		.subscribe({
        next:
          (response:any) => {
              console.log(response)
              },
        error:
        (err:any) => 
          {
            console.log(err);
          }
      });
    }
       
    onSubmit(){

         console.log(this.questionnaire.value); 
         this.questionnaires=[];
         this.questionnaireJSON=JSON.stringify(this.questionnaire.value);
         this.questionnaires.push(this.questionnaire.value);

         if(this.questionnaires.length==1)
         {
          this.filterSurveys=this.questionnaires;
          this.selectedSurveyName=this.filterSurveys[0].questionnaireTitle;
         }
         this.stepNum=1; //reset

         /////////////////save to Mongo

         this.http.post<any>(`${this.url}/questionnaire/save`,this.questionnaire.value)
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

                this.NgdialogRef.componentInstance.qID=this.questionnaire.value.questionnaireID;
               
                this.demo2BtnClick()

                 },
           error:
           (err:any) => 
             {
               console.log(err);
             }
         });
       
       }

  send(values:any) {
    console.log(values);
  }

 goPrev()
 {
this.stepNum=this.stepNum-(this.additionalStep);
 }

 goNext()
 {
  this.stepNum=this.stepNum+this.additionalStep;;
 }

 isLast() {
      // let survey=  this.questionnaires.filter((x:any)=>{
      //   return x.questionnaireTitle==this.selectedSurveyName;
      // })
      let surveyQuestions=this.questionnaire.get('questions');

      let queLength=surveyQuestions.value.length;
      if(this.stepNum==queLength)
      {
       this.lastQuestion=true;
       return true;
      }
       else 
       {
        this.lastQuestion=false;
         return false
       }

  }

  radioChange(event:any,row:any)
  {
    
  }



  isFirst() {
     let survey=  this.questionnaires.filter((x:any)=>{
        return x.questionnaireTitle==this.selectedSurveyName;
      })

      if(this.stepNum>1) return false;
      else return true;
   
  }


  generateUUID()
  {
    {
      var i, random;
      var result = '';
  
      for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
          result += '-';
        }
        result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
          .toString(16);
      }
      return result;
    }
  }

  answerChange(j:number,k:number) 
  {
  

    let survey= this.questionnaires.filter((x:any)=>{
      return x.questionnaireTitle==this.selectedSurveyName;
    })


    for(let index=0;index < survey[0].questions[j].options.length;index++)   //reset
    survey[0].questions[j].options[index].optvalue='false';


    survey[0].questions[j].options[k].optvalue='true';  //set answer value

    this.additionalStep=1;

    ///algorithm/submit form
    if(survey[0].questions[j].options[k].nextqID=="SUBMIT")
    {
     this.lastQuestion=true;
     return;
    }
  
     ///algorithm/next section
  
    if(survey[0].questions[j].options[k].nextqID=="NEXT")
    return;

    if(survey[0].questions[j].options[k].nextqID.split('Q')[1]==this.stepNum+1)
    {
     return;
    }
    else
    this.additionalStep=parseInt(survey[0].questions[j].options[k].nextqID.split('Q')[1])-1;
      


  }


  //change tab

  public demo2BtnClick() {
    const tabCount = 2;
    //this.demo1TabIndex=1;
    this.demo1TabIndex = (this.demo1TabIndex + 1) % tabCount;
  }

}
