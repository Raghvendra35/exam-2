import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit
{
  
  qId;
  quiz;


 constructor(private route: ActivatedRoute,
             private quizService: QuizService){}

  ngOnInit(): void {
   
    this.qId=this.route.snapshot.params['qid'];
   // alert(this.qId)

   this.quizService.getSinleQuiz(this.qId).subscribe((data:any)=>
   {
    console.log("Instruction..................");
    console.log(data);
    this.quiz=data;
    
   },(error)=>
   {
    console.log(error);
    
   })
  }

}
