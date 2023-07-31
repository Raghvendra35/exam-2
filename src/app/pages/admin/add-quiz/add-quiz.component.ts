import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit
 {

  categories: any;

   quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:
    {
      categoryId:''
    }

   }

  constructor(private categoryService: CategoryService,
              private snack: MatSnackBar,
              private quizService: QuizService){}

  ngOnInit(): void  {
    this.categoryService.categories().subscribe((data)=>
    {
      //load categories
     this.categories=data;
     console.log("Add quiz...................");
     
    },(error)=>{
     console.log(error);
     Swal.fire('Error !!','error in loading data from Server','error')
    }
    )
  }


  addQuiz()
  {
    if(this.quizData.title.trim()=='' || this.quizData.title==null)
    {
     this.snack.open("Title is  required !!!",'',{
      duration:3000,
     });
     return;
    }
    

    this.quizService.addNewQuiz(this.quizData).subscribe((data:any)=>
    {
      console.log(data);
      Swal.fire('Success','Quiz added successfuly','success');

      //Clear the form data
      this.quizData={
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:true,
        category:
             {
                    categoryId:''
                 }
    
       }
    
    },(error)=>
    {
      Swal.fire('Error!!','Error while adding quiz','error');
      console.log(error);
      
    })
  }

}
