import { Component, OnDestroy, OnInit, computed, inject } from "@angular/core";
import { TodosService } from "../services/todos.service";
import { Subject, takeUntil } from "rxjs";
import { TodosInterface } from "../types/todos.interface";
import { FilterEnum } from "../types/filter.enum";
import { TodoComponent } from "../todo/todo.component";

@Component({
  selector:'app-main',
  imports: [TodoComponent],
  standalone:true,
  templateUrl:'./main.component.html'
})
export class MainComponent implements OnInit,OnDestroy {

  editingId : number | null = null;
  private unsubscribe$ = new Subject<void>();
  visibleTodos = computed(() => {
    const todos = this.provideTodoService.todoSig();
    const filter = this.provideTodoService.filterSig();
    if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.completed);
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  });
  private provideTodoService = inject(TodosService);

  ngOnInit(): void {
    this.getAllTodos();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getAllTodos():void{
    this.provideTodoService.getAllTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res:TodosInterface) => this.provideTodoService.todoSig.set(res.allTodos),
        error: ()=> console.log("Error")
      })
  }

  setEditingId(editingid:number|null):void{
    this.editingId = editingid;
  }

}
