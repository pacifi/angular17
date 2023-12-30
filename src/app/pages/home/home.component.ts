import {Component, computed, signal, WritableSignal} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {Task} from "../../models/task.models";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms"


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    NgIf, ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: "Crear Proyecto",
      completed: false
    },
    {
      id: Date.now(),
      title: "Crear Componente",
      completed: false
    }
  ]);

  filter: WritableSignal<'all' | 'pending' | 'completed'> = signal('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed)
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed)
    }
    return tasks;

  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true, validators: [Validators.required]
  })

  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }


  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false

    }
    this.tasks.update((tasks) => [...tasks, newTask]);


  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position != index));
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task, completed: !task.completed
          }
        }
        return task
      })
    });
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task, editing: true
          }
        }
        return {
          ...task, editing: false
        }
      })
    });

  }

  updateTaskTitle(index: number, event: Event) {
    const input = event.target as HTMLInputElement;

    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task, title: input.value, editing: false
          }
        }
        return task
      })
    });

  }


  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this
      .filter
      .set(filter);
  }
}
