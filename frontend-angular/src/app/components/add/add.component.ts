import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import {TodosService} from '../../services/todos.service';
import { futureDateValidator } from '../futureDateValidator';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  error = '';
  success = '';
  authEdit: boolean = false;

  newTodoForm = this.fb.group({
    task: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    due: ['', [Validators.required, futureDateValidator()]],
    isdone: [false],
  });

  get task() {return this.newTodoForm.get('task');}
  get due() {return this.newTodoForm.get('due');}

  constructor(private todoService: TodosService,
    private fb: FormBuilder,
    private router: Router, 
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.authEdit = this.tokenStorageService.getUser().roles.includes('ROLE_CREATE');
  }

  addTodo():void{
    if(this.authEdit){
      var input = this.newTodoForm.value;
      this.todoService.add(input).subscribe(
        (response) => {         
          var todo = response; 
          this.success = 'ID '+ todo.id + ' is added';
          console.log(this.success);
          this.router.navigate(['/todos']);
        },
        (error) => {                              
          console.error(error);
          this.error = error;
        });
    }else{
      this.error = "You are not authorized to perform this operation.";
    }
    
  }

}
