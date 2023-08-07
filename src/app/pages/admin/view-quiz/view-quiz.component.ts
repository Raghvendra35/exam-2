import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit
 {

  quizzes:any;
   qId: any;

  constructor(private quizService: QuizService){}

  ngOnInit(): void
    {   

      this.getAllQuiz();

       }


       getAllQuiz()
       {
        this.quizService.quizzes().subscribe((data: any)=>
        {
          console.log("quiz....................");
          console.log(data);
          this.quizzes=data;
              
        },
        (error)=>
        {
          console.log(error);
          Swal.fire('Error !!',"Error in loading data !",'error')
          
        })

       }


       //Delete Quiz
       deleteQuiz(quizId: any)
       {
      console.log("Printing quiz id....................");
      console.log(quizId);
      Swal.fire({
        icon:'info',
        'title':"Are you sure ?",
        confirmButtonText:'Delete',
        showCancelButton: true
      }).then((result)=>
      {
        if(result.isConfirmed)
        {

          this.quizService.deleteSingleQuiz(quizId).subscribe((data)=>
          {
    
            //when we delete the quiz then quiz will remove when we refresh the page 
            //So we are using filter which current and database id will not that will be delete
          this.quizzes=this.quizzes.filter((quiz)=>quiz.quizId!=quizId);
           
          Swal.fire("Success",'Quiz deleted successfuly !!!','success');
            
          },(error)=>
          {
            console.log(error);
            Swal.fire('Error !!','Error in deleting quiz.','error')
            
          })
        }
      })

      
       }
}
