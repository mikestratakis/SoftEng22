import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { environment as env } from '../../../environments/environment';
import _ from 'underscore';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  private url = `${env.baseUrl}`;
   

  columnChartOptions:any[]=[] 
  pieChartOptions: any[]=[]



  questionnaires:any=[];
  selectedSurveyId: any;
  selectedQuestionaire:any;
  sessions: any[]=[];
  lengthQuestions:number;
  currentTabIndex = 0;
  showTabs:boolean=false;
  showSpinner:boolean=false;
  questionaireDefault:string=''


  constructor(private http:HttpClient,private authService:AuthService) { }

  ngOnInit(): void {

    this.http.get<any>(`${this.url}/questionnaire/allquestionnaires`)
    .subscribe({
      next:
        (response:any) => {

          this.questionnaires=response;
          this.questionaireDefault = this.questionnaires[0].questionnaireID;
          this.selectedSurveyId=  this.questionnaires[0].questionnaireID;

          this.setQuestionnaire(this.selectedSurveyId);

          //initialize
          for(let i=0;i<response[0].questions.length;i++)
          {

                this.columnChartOptions[i] = {
                  animationEnabled: true,
                  title: {
                    text: 'Απαντήσεις Ερωτηματολογίου',
                  },
                  data: [
                    {
                      type: 'column',
                      dataPoints: [],
                    },
                  ],
                };
                
                this.pieChartOptions[i] = {
                  animationEnabled: true,
                  title: {
                    text: 'Απαντήσεις Ερωτηματολογίου',
                  },
                  theme: 'light2', // "light1", "dark1", "dark2"
                  data: [
                    {
                      type: 'pie',
                      dataPoints: [],
                    },
                  ],
                };
              
           

          }

            
            },
      error:
      (err:any) => 
        {
          console.info(err);
        }
    });
  

    
  }


  getQuestionnaires()
  {
    return this.questionnaires;
  }

  getQuestionnaireDefaullt()
  {
    return this.questionaireDefault;
  }

  onChangeQuestionnaire(event:any)
  {
    this.showTabs=false;
    this.showSpinner=true;
    this.sessions=[];
    //check
  
    this.selectedSurveyId=event.value;

    this.selectedQuestionaire=this.questionnaires.find((x:any)=>
    {
     return (x.questionnaireID==this.selectedSurveyId);
    })

    //initialize charts

    this.initCharts( this.selectedQuestionaire);



    let queryParams = new HttpParams();
    queryParams = queryParams.append("token",this.authService.Token);

    this.http.get<any>(`${this.url}/getallsessions/`+this.selectedSurveyId,{params:queryParams}) 
    .subscribe({
      next:
        (response:any) => {
          

          response.forEach((element:any)=> {

           element.answers.map((item:any)=>
            {
              let answer={
                qID:item.qID,
                ans:item.ans
              }
              this.sessions.push(answer);
            })
          
        });
          
        


             ////count answers

          let answers= _.countBy(this.sessions, function(data) { return data.ans; });
          delete answers[''];

          for(let [index,question] of this.selectedQuestionaire.questions.entries())
          {

                let filterdAnswers=Object.fromEntries(Object.entries(answers).filter(([key]) => key.includes(question.qID)));
                let DataPoints:any[]=[]

                if(filterdAnswers==undefined || _.isEmpty(filterdAnswers))
                {
                 DataPoints.push(
                    {
                      label: '',
                      y: 0
                    }
                   )
                }

               
               
                for (let k in filterdAnswers) 
                {
                let yyy:any=this.findNestedObj(this.selectedQuestionaire,"optID",k);
                DataPoints.push(
                        {
                    label: yyy.opttxt,
                    y: answers[k]
                  }
                )
                }
                this.columnChartOptions[index].data[0].dataPoints=[...DataPoints];
                this.pieChartOptions[index].data[0].dataPoints=[...DataPoints];

          }

          this.showTabs=true;
          this.showSpinner=false;

      
          
            
            },
      error:
      (err:any) => 
        {
          if(err.error.reason=="Sessions not found")
          {
            this.sessions=[];
          }
          
        }
    });

    

  }

  setQuestionnaire(surveyId:string)
  {
    this.showTabs=false;
    this.showSpinner=true;
    this.sessions=[];
  
    this.selectedSurveyId=surveyId;
    this.selectedQuestionaire=this.questionnaires.find((x:any)=>
    {
     return (x.questionnaireID==this.selectedSurveyId);
    })

    //initialize charts

    this.initCharts( this.selectedQuestionaire);



    let queryParams = new HttpParams();
    queryParams = queryParams.append("token",this.authService.Token);

    this.http.get<any>(`${this.url}/getallsessions/`+this.selectedSurveyId,{params:queryParams}) 
    .subscribe({
      next:
        (response:any) => {
          

          response.forEach((element:any)=> {

           element.answers.map((item:any)=>
            {
              let answer={
                qID:item.qID,
                ans:item.ans
              }
              this.sessions.push(answer);
            })
          
        });
          
        


             ////count answers

          let answers= _.countBy(this.sessions, function(data) { return data.ans; });
          delete answers[''];

          for(let [index,question] of this.selectedQuestionaire.questions.entries())
          {

                let filterdAnswers=Object.fromEntries(Object.entries(answers).filter(([key]) => key.includes(question.qID)));
                let DataPoints:any[]=[]

                if(filterdAnswers==undefined || _.isEmpty(filterdAnswers))
                {
                 DataPoints.push(
                    {
                      label: '',
                      y: 0
                    }
                   )
                }

               
               
                for (let k in filterdAnswers) 
                {
                let yyy:any=this.findNestedObj(this.selectedQuestionaire,"optID",k);
                DataPoints.push(
                        {
                    label: yyy.opttxt,
                    y: answers[k]
                  }
                )
                }
                this.columnChartOptions[index].data[0].dataPoints=[...DataPoints];
                this.pieChartOptions[index].data[0].dataPoints=[...DataPoints];

          }

          this.showTabs=true;
          this.showSpinner=false;

      
          
            
            },
      error:
      (err:any) => 
        {
          if(err.error.reason=="Sessions not found")
          {
            this.sessions=[];
          }
          
        }
    });

  }

  onTabChange(event: MatTabChangeEvent) {
    const tabCount = 3;
    this.currentTabIndex = (event.index + 1) % tabCount;
  //  this.appService.currentTabIndex = event.index
}

getSelectedIndex()
{
  return this.currentTabIndex;
}


  public demo1BtnClick(index:number) {
    const tabCount = 3;
    this.currentTabIndex=(index + 1) % tabCount;
  }

  initCharts(survey:any){

       //initialize
       for(let i=0;i<survey.questions.length;i++)
       {

             this.columnChartOptions[i] = {
               animationEnabled: true,
               title: {
                 text: 'Απαντήσεις Ερωτηματολογίου',
               },
               data: [
                 {
                   type: 'column',
                   dataPoints: [],
                 },
               ],
             };
             
             this.pieChartOptions[i] = {
               animationEnabled: true,
               title: {
                 text: 'Απαντήσεις Ερωτηματολογίου',
               },
               theme: 'light2', // "light1", "dark1", "dark2"
               data: [
                 {
                   type: 'pie',
                   dataPoints: [],
                 },
               ],
             };
           

       }

 


  }

  getQuestions(qid:any)
  {
    let questionnaire:any=this.questionnaires.find((x:any)=>
    {
     return (x.questionnaireID==qid);
    })

    if(questionnaire==undefined)
    return []
    else
    {
    this.lengthQuestions=questionnaire.questions.length;
    return questionnaire.questions;
    }
  }





  //find in depth
  findNestedObj(entireObj:any, keyToFind:any, valToFind:any) {
    let foundObj;
    JSON.stringify(entireObj, (_, nestedValue) => {
      if (nestedValue && nestedValue[keyToFind] === valToFind) {
        foundObj = nestedValue;
      }
      return nestedValue;
    });
    return foundObj;
  };
  

  
}
