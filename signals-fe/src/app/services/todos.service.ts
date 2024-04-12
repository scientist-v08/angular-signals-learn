import { Injectable, inject, signal } from "@angular/core";
import { TodoInterface } from "../types/todo.interface";
import { messageInterface } from "../types/message.interface";
import { HttpClient } from "@angular/common/http";
import { FilterEnum } from "../types/filter.enum";
import { Observable, Subscription } from "rxjs";
import { TodosInterface } from "../types/todos.interface";

@Injectable({
  providedIn:"root"
})
export class TodosService{

  todoSig = signal<TodoInterface[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);
  private http = inject(HttpClient);
  private unsubscribe$ : Subscription | null = null;
  private unsubscribeGet$ : Subscription | null = null;

  changeFilter(filterName: FilterEnum): void {
    this.filterSig.set(filterName);
  }

  addTodo(textMessage:string) : void{
    const newTodo:TodoInterface = {
      text:textMessage,
      completed:false
    };
    this.postTheTodo(newTodo);
  }

  getAllTodos() : Observable<TodosInterface> {
    return this.http.get<TodosInterface>("http://localhost:6060/api/todos");
  }

  changeTodo(_id:number|undefined,textMessage:string) : void {
    // Send a request to the DB to update the values
    const editedTodo:TodoInterface = {
      id:_id,
      text:textMessage,
      completed:false
    };
    this.postTheTodo(editedTodo);
  }

  removeTodo(_todo:TodoInterface):void{
    // Update the values in the signal
    const copiedTodoSig:TodoInterface[] = this.todoSig();
    const index = copiedTodoSig.findIndex(todo => todo.id === _todo.id);
    if (index >= 0 && index < copiedTodoSig.length) {
      const updatedTodos = [...copiedTodoSig.slice(0, index), ...copiedTodoSig.slice(index + 1)];
      this.todoSig.set(updatedTodos);
    }
    // Send a delete request to the Db
    const uri : string = "http://localhost:6060/api/todos?id="+_todo.id?.toString();
    this.unsubscribe$ = this.http.delete<messageInterface>(uri)
                        .subscribe({next: () => {
                          this.postUnsubscribe();
                        }});
  }

  toggleTodo(_id:number | undefined):void{
    // Update the values in the signal
    const copiedTodoSig:TodoInterface[] = this.todoSig();
    const index = copiedTodoSig.findIndex(todo => todo.id === _id);
    if (index !== -1) {
      const editedTodo:TodoInterface = {
        id:_id,
        text:copiedTodoSig[index].text,
        completed:true
      };
      const updatedTodos:TodoInterface[] = [...copiedTodoSig.slice(0, index), editedTodo, ...copiedTodoSig.slice(index + 1)];
      this.todoSig.set(updatedTodos);
      // Send a request to the DB to update the values
      this.unsubscribe$ = this.http.post<messageInterface>("http://localhost:6060/api/todos/complete",editedTodo)
                        .subscribe({next: () => {
                          this.postUnsubscribe();
                        }});
    }
  }

  private postTheTodo(todo:TodoInterface):void{
    this.unsubscribe$ = this.http.post<messageInterface>("http://localhost:6060/api/todos",todo)
                        .subscribe({next: () => {
                          this.postUnsubscribe();
                          this.getAllUpdatedTodos();
                        }});
  }

  private postUnsubscribe() : void {
    if(this.unsubscribe$ !== null){
      this.unsubscribe$.unsubscribe();
    }
  }

  private getAllUpdatedTodos() : void {
    this.unsubscribeGet$ = this.getAllTodos()
                            .subscribe((res:TodosInterface)=>{
                              this.todoSig.set(res.allTodos);
                              this.getUnsubscribe();
                            })
  }

  private getUnsubscribe(): void{
    if(this.unsubscribeGet$ !== null){
      this.unsubscribeGet$.unsubscribe();
      this.unsubscribe$=null;
    }
  }

}
