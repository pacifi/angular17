import {Component, signal} from '@angular/core';

import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [
    ReactiveFormsModule
],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {
  welcome = 'todoapp';

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true
  })
  nameCtrl = new FormControl('Bonnier',
    {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }
  )

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  tasks = [
    'Instalar Angular CLI',
    'Crear Proyecto',
    'Crear Componentes',
    'Crear Servicio'
  ];
  tasksSingnal = signal([
    'Instalar Angular CLI',
    'Crear Proyecto',
    'Crear Componentes',
    'Crear Servicio'
  ]);


  name = "Bonnier";
  nameSingal = signal('Bonnier')
  age = 33;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png'

  person = {
    name: 'Bonnier',
    age: 33,
    avatar: 'https://w3schools.com/howto/img_avatar.png'

  }

  clickHandler() {
    alert('Hola');

  }

  changeHandler(event: Event) {
    console.log(event)

  }


  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value)
  }

  changeHandler2(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value
    this.nameSingal.set(newValue);
    console.log(input.value);
  }


}
