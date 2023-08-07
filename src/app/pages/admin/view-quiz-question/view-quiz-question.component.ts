import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit
{

  qId:any;
  qtitle:any;

  questions=[];

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private snack: MatSnackBar){}

  ngOnInit(): void 
  {
   this.qId=this.route.snapshot.params['id'];    //qId and title  variable of app routing class
   this.qtitle=this.route.snapshot.params['title']

  //  alert(this.qId)
  //  alert(this.title);
   

  this.questionService.getQuestionOfQuiz(this.qId).subscribe((data: any)=>
  {
    console.log(data);
     this.questions=data;
  },(error)=>
  {
    console.log(error);
    
  })
  }



  //delete Question

  deleteQuestion(questId)
  {
    Swal.fire({
      icon:'info',
      showCancelButton: true,
      confirmButtonText:'Delete',
      title: 'Are you sure ?, want to delete this question !!',

    }).then((result)=>
    {
    if(result.isConfirmed)
    {
      this.questionService.deleteQuestion(questId).subscribe((data:any)=>
      {
        this.snack.open('Question has been deleted !!!','',{
          duration:3000,
        });
        this.questions=this.questions.filter((q)=>q.questionId!=q.id)
      },(error)=>
      {
        this.snack.open('Error in deleting questions','',{
          duration: 3000
        });
        console.log(error);
        
      })
    }
    })
  }
}
