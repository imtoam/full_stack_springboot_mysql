import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import {TodosService} from '../../services/todos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  todos: Todo[] = [];
  selectedTodo: Todo = new Todo();
  error = '';
  success = '';

  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() : void 
  {
    this.todoService.getAll().subscribe(
      (response) => {                           //next() callback
        console.log(response)
        this.todos = response; 
      },
      (error) => {                              //error() callback
        console.error(error)
        this.error = error;
      });
  }

  onSelect(id: number){
    for(let todo of this.todos){
      if(todo.id == id){
        this.selectedTodo = todo;
      }
    }
  }

}
