import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

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
              private questionService: QuestionService){}

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

}
