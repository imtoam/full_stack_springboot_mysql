import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import {TodosService} from '../../services/todos.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  item: Todo = new Todo();
  error = '';
  success = '';
  authEdit: boolean = false;
  todoForm = this.fb.group({
    id: [''],
    task: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    due: ['', [Validators.required]],
    isdone: [false],
  });

  get task() {return this.todoForm.get('task');}
  get due() {return this.todoForm.get('due');}

  constructor(private todoService: TodosService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    //console.log(this.route.snapshot.params.id);
    this.getTodo(this.route.snapshot.params.id);
    this.authEdit = this.tokenStorageService.getUser().roles.includes('ROLE_EDIT');
  }
  getTodo(id: any) : void 
  {
    this.todoService.get(id).subscribe(
      (response) => {                           //next() callback
        this.item = response; 
        console.log(this.item);
        this.todoForm.setValue({
          id:  this.item.id,
          task: this.item.task,
          due: this.item.due,
          isdone: this.item.isdone
        });
      },
      (error) => {                              //error() callback
        console.error(error)
        this.error = error;
      });
  }

  deleteTodo():void
  {
    //console.log("deleting...")
    if(this.authEdit){
      this.todoService.delete(this.item.id).subscribe(
        (response) => {                           //next() callback
          this.success = response; 
          console.log(this.success);
          this.router.navigate(['/todos']);
  ;      },
        (error) => {                              //error() callback
          console.error(error)
          this.error = error;
        });
    }else{
      this.error = "You are not authorized to perform this operation.";
    }
    
  }

  updateTodo():void
  {
    if(this.authEdit){
      console.log(this.todoForm.value);
      this.todoService.update(this.todoForm.value).subscribe(
        (response) => {                           //next() callback
          this.item = response; 
          this.todoForm.value.task = response.task;
          this.todoForm.value.due = response.due;
          this.todoForm.value.isdone = response.isdone;
          this.router.navigate(['/todos']);
        },
        (error) => {                              //error() callback
          console.error(error)
          this.error = error;
        });
    }else{
      this.error = "You are not authorized to perform this operation.";
    }

  }
}
