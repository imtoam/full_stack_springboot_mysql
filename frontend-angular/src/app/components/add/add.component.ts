import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import {TodosService} from '../../services/todos.service';
import { futureDateValidator } from '../futureDateValidator';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  newTodoForm = this.fb.group({
    task: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    due: ['', [Validators.required, futureDateValidator()]],
    isdone: [false],
  });

  get task() {return this.newTodoForm.get('task');}
  get due() {return this.newTodoForm.get('due');}

  constructor(private todoService: TodosService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  addTodo():void{
    var input = this.newTodoForm.value;
    this.todoService.add(input).subscribe(
      (response) => {                           //next() callback
        var todo = response; 
        console.log('ID '+ todo.id + ' is added');
        this.router.navigate(['/todos']);
      },
      (error) => {                              //error() callback
        console.error(error)
      });
  }

}
