import {Component, signal} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Task} from "../../models/task.models";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: "Crear Proyecto",
      completed: true
    },
    {
      id: Date.now(),
      title: "Crear Componente",
      completed: false
    }
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update((tasks) => [...tasks, newTask]);

  }

  addTask(title: string) {
    const newTasl={
      id:Date.now(),
      title,
      completed:false
      
    }

  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position != index));
  }
}
