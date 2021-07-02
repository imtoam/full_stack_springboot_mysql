import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import {TodosService} from '../../services/todos.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  newTodoForm = new FormGroup({
    task: new FormControl(''),
    due: new FormControl(''),
    status: new FormControl('')
  });

  constructor(private todoService: TodosService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  addTodo():void{
    var input = this.newTodoForm.value;
    this.todoService.add(input).subscribe(
      (response) => {                           //next() callback
        var id = response; 
        console.log('ID '+ id + ' is added');
        this.router.navigate(['/todos']);
      },
      (error) => {                              //error() callback
        console.error(error)
      });
  }

}
