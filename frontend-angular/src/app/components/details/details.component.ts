import { isNgTemplate } from '@angular/compiler';
import { Component, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import {TodosService} from '../../services/todos.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  item: Todo = new Todo();
  error = '';
  success = '';
  todoForm = new FormGroup({
    id: new FormControl(''),
    task: new FormControl(''),
    due: new FormControl(''),
    status: new FormControl('')
  });

  constructor(private todoService: TodosService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //console.log(this.route.snapshot.params.id);
    this.getTodo(this.route.snapshot.params.id);
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
          status: this.item.status
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
  }

  updateTodo():void
  {
    console.log(this.todoForm.value);
    this.todoService.update(this.todoForm.value).subscribe(
      (response) => {                           //next() callback
        this.item = response; 
        this.todoForm.value.task = response.task;
        this.todoForm.value.due = response.due;
        this.todoForm.value.status = response.status;
        this.router.navigate(['/todos']);
      },
      (error) => {                              //error() callback
        console.error(error)
        this.error = error;
      });
  }
}
