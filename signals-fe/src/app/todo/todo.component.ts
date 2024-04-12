import { Component, ElementRef, OnInit, ViewChild, inject, input, output } from "@angular/core";
import { TodoInterface } from "../types/todo.interface";
import { CommonModule } from "@angular/common";
import { TodosService } from "../services/todos.service";

@Component({
  standalone: true,
  imports:[CommonModule],
  selector:'app-todo',
  templateUrl:"./todo.component.html"
})
export class TodoComponent implements OnInit {

  todo = input.required<TodoInterface>();
  isEditing = input.required<boolean>();
  setEditingId = output<number | null>();

  @ViewChild('textInput') textInput?: ElementRef;
  todosService = inject(TodosService);
  editingText: string = '';

  ngOnInit() : void {
    this.editingText = this.todo().text;
  }

  changeText(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.todosService.changeTodo(this.todo().id, this.editingText);
    this.setEditingId.emit(null);
  }

  setTodoInEditMode(): void {
    this.setEditingId.emit(this.todo().id as number);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todo());
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todo().id);
  }

}
