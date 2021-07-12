import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import {TodosService} from '../../services/todos.service';
import { TokenStorageService } from '../../services/token-storage.service';

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
  authEdit: boolean = false;

  constructor(private todoService: TodosService, 
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getTodos();
    this.authEdit = this.tokenStorageService.getUser().roles.includes('ROLE_EDIT');
  }

  getTodos() : void 
  {
    this.todoService.getAll().subscribe(
      (response) => {                           
        console.log(response)
        this.todos = response; 
      },
      (error) => {                              
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
