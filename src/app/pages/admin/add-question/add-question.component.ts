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
    if(this.question.content.trim()==''|| this.question.content==null)
    {
       return
    }

    if(this.question.option1.trim()==''|| this.question.option1==null)
    {
       return
    }

    if(this.question.option2.trim()==''|| this.question.option2==null)
    {
       return
    }

    if(this.question.answer.trim()==''|| this.question.answer==null)
    {
       return
    }


     this.questionService.addQuestion(this.question).subscribe((data: any)=>
     {
      Swal.fire('Success','Questiom added successfuly','success');
      this.question.content='';
      this.question.option2='';
      this.question.option3='';
      this.question.option4='';
      this.question.answer='';

     },(error)=>
     {
      Swal.fire('Error','Error Or something went wrong !!','error')
     }
     )
  }
}
