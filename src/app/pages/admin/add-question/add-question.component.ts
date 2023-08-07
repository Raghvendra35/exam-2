import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit
{

  qId;
  qTittle;

  question={
    quiz:{
  
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }


  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private snack: MatSnackBar){}

  ngOnInit(): void 
  {
    this.qId=this.route.snapshot.params['qid'];
    this.question.quiz['quizId']=this.qId;
    this.qTittle=this.route.snapshot.params['title']

  // alert(this.qTittle);
  }


  formSubmit()
  {
    //Validation

     this.questionService.addQuestion(this.question).subscribe((data: any)=>
     {
      Swal.fire('Success','Quiz updated successfuly','success')
     },(error)=>
     {
      Swal.fire('Error','Error Or something went wrong !!','error')
     }
     )
  }
}
