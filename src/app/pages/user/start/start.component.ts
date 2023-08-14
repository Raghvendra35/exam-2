import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit 
{

  qId;
  questions;
  
  marksGot=0;
  correctAnswers=0;
  attempted=0;  //how many question attempted
  isSubmit=false;

   timer: any;

constructor(private locationStategy: LocationStrategy,
            private route: ActivatedRoute,
            private questionService: QuestionService,
            private router: Router){}
   
  ngOnInit(): void
  {
    // this.preventBackButton();
    this.qId=this.route.snapshot.params['qid'];
   // alert(this.qId)
   this.loadQuestions();
  }

  //prevent thepage to back
  preventBackButton()
  {
    history.pushState(null,null, location.href);
    this.locationStategy.onPopState(()=>
    {
      history.pushState(null, null, location.href);
    })
  }

  loadQuestions()
  {
    this.questionService.getQuestionOfQuizForTest(this.qId).subscribe((data: any)=>
    {
     // console.log(data);
      this.questions=data; 
    
      //timer hold time in second 
      this.timer=this.questions.length*2*60;

    
      // this.questions.forEach((q) => 
      //   {
      //     q['givenAnswer']='';
      // });
      
      console.log(this.questions);
       this.startTimer();

    },(error)=>
    {
      Swal.fire("Error","Error in loading questions of quiz",'error');
    })
  }

  submitQuiz()
  {
    Swal.fire({
      title: 'Do you want to Submit the test ?',
     
      showCancelButton: true,
      confirmButtonText: 'Submit',
 
      icon:'info'
    }).then((result) => {

      if (result.isConfirmed)
       {
        //Calculation   
          this.evalQuiz();
        } 
    })
  }

  startTimer()
  {
   let t= window.setInterval(()=>
    {
      if(this.timer<=0)
      {
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }

    },1000);
  }

getFormattedTime()
{
  let mm=Math.floor(this.timer/60);
  let ss=this.timer-mm*60;
  return `${mm} min : ${ss} sec`
}


//this method for not asking do you want to submit test when time will complete
evalQuiz()
{
  
   // Call to server

   this.questionService.evalQuiz(this.questions).subscribe((data:any)=>
   {
    console.log("lllllllllllllllllllllllllllllllll");
    


    console.log(data.Attempted);
    this.marksGot=parseFloat(Number(data.marksGot).toFixed(2)) ;
    this.correctAnswers=data.correctAnswers;
    this.attempted=data.attempted;
    this.isSubmit=true; 

   },(error)=>
   {
    console.log(error);
    
   })


        // this.questions.forEach(q=>
        //   {
        //     if(q.givenAnswer==q.answer)
        //     {
        //       this.correctAnswers++;
        //     let markSingle=this.questions[0].quiz.maxMarks/this.questions.length;
        //     this.marksGot+=markSingle;
        //     }
        //     if(q.givenAnswer.trim()!='')
        //     {
        //       this.attempted++;
        //     }
                     
           
        //   }) 

        //   console.log("correct ans.."+this.correctAnswers);
        //   console.log("marksGot...."+this.marksGot);
        //   console.log("Attempted.."+this.attempted);
}


printPage()
{
  window.print();
}
}
