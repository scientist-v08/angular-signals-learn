import { Component, computed, inject } from "@angular/core";
import { TodosService } from "../services/todos.service";
import { FilterEnum } from "../types/filter.enum";
import { CommonModule } from "@angular/common";

@Component({
  selector:'app-footer',
  imports:[CommonModule],
  standalone:true,
  templateUrl:'./footer.component.html'
})
export class FooterComponent {

  todosService = inject(TodosService);
  filterSig = this.todosService.filterSig;
  filterEnum = FilterEnum;

  activeCount = computed(() => {
    return this.todosService.todoSig().filter((todo) => !todo.completed)
      .length;
  });

  noTodosClass = computed(() => this.todosService.todoSig().length === 0);

  itemsLeftText = computed(
    () => `item${this.activeCount() !== 1 ? 's' : ''} left`
  );

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
    console.log('after changeFilter', this.todosService.filterSig());
  }

}
