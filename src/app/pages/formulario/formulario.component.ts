import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule,ReactiveFormsModule],
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
    password2: ['', [Validators.required]],
    favoriteGames:this.fb.array([])
  });
  public newFavorite:FormControl = new FormControl('',Validators.required)

  public onAddToFavorite = ():void => {
    if (this.newFavorite.invalid) {
      return
    }
    const newGame = this.newFavorite.value;
    
    this.favoriteGames.push(
      this.fb.control(newGame,Validators.required)
    );


    this.newFavorite.reset();

  }

}





