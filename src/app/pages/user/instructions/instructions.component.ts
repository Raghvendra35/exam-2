import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

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
             private quizService: QuizService,
             private router: Router){}

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


  startQuiz()
  {
    
    Swal.fire({
      title: 'Do you want to start the test ?',
     
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't start`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
          
        this.router.navigate(['/start/'+this.qId]);
      } else if (result.isDenied) {
        Swal.fire('Test is not started', '', 'info')
      }
    })
  }
}
