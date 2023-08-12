import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit
 {

   categoryId;
   quizzes;

  constructor(private route: ActivatedRoute,
              private quizService: QuizService){}


  ngOnInit(): void
   {
   // this.categoryId=this.route.snapshot.params['catId'];
    
   this.route.params.subscribe((params)=>
   {
    this.categoryId=params['catId'];

    if(this.categoryId==0)
    {
      //then we have to load all quiz
      this.quizService.getActiveQuiz().subscribe((data:any)=>
      {
        console.log(data);
        this.quizzes=data;
      })
   
    }else{
      //load specific quiz
      this.quizService.getActiveQuizzesOfCategory(this.categoryId).subscribe((data:any)=>
      {
        this.quizzes=data;
      })
    }
   })
  

  }

}
