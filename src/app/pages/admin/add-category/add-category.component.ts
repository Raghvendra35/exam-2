import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit 
{
  
  category={
    title:'',
    description:''
  }
  
  constructor(private categoryService: CategoryService,
              private  snak: MatSnackBar){}

  ngOnInit(): void 
  {
    
  }

  formSubmit()
  {
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      this.snak.open("Title is Required !!",'',{
        duration:3000
      })
      return ;
    }

    //Add Done
    this.categoryService.addCategory(this.category).subscribe((data:any)=>
    {
    //Here Data has been saved...

    // After Save the data then clear the value of fields 
    //title and description 
      this.category.title='';
      this.category.description='';

      Swal.fire("Success !!",'Category Added Successfuly','success')
    },
    (error)=>
    {
      console.log(error);
      Swal.fire("Error !!",'Server error!!','error')
    })
  }

}
