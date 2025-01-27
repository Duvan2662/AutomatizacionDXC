import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  constructor(private fb: FormBuilder) { }

  public myform: FormGroup = this.fb.group({
    testCase: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]]
  });

}





