import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit 
{

  quizId=0;
  quiz: any;

  categories: any;

  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private categoriesService: CategoryService,
              private snack: MatSnackBar,
              private router: Router){}

  ngOnInit(): void 
  {
    this.quizId=this.route.snapshot.params['qid'];  //this qid from app routing module ->  quiz/:qid
    //alert(this.quizId);
 
    this.loadSingleQuiz();
    
    this.categoriesService.categories().subscribe((data: any)=>
    {
      console.log(data);
      this.categories=data;
      
    },(error)=>
    {
      console.log(error);
      
    })
   }


   loadSingleQuiz()
   {
      this.quizService.getSinleQuiz(this.quizId).subscribe((data)=>
      {
        console.log(data);
        this.quiz=data;
        
      })
   }


   updateQuizData()
   {

    //Validate..
    this.quizService.updateQuiz(this.quiz).subscribe((data:any)=>
    {
      Swal.fire('Success','Quiz updated successfuly','success').then((e)=>
      {
        this.router.navigate(['/admin/quizzes']);
      });

    },(error)=>
    {
      Swal.fire('Error!!','Error while updating quiz','error');
      console.log(error);
      
    })
   }
  }
