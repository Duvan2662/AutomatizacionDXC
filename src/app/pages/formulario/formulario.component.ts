import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formsUtils } from '../../utils/form-utils';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  constructor(private fb: FormBuilder) { }

  public myform: FormGroup = this.fb.group({
    numberCase: ['', []],
    testCase: ['', []],
    date: ['', [Validators.required]],
    id: ['', [Validators.required, Validators.min(0)]],
    device: ['No Aplica', [Validators.required]],
    additionalData: this.fb.array([])
  });

  public formUtils = formsUtils;

  public newAdditionalData = new FormControl('', Validators.required)
  public selectedFile: File | null = null;
  public fileError: string | null = null;
  public isFileLoaded: boolean = false; // Indica si el archivo ha sido completamente cargado




  public onSave() {
    if (this.myform.invalid || !this.selectedFile || !this.isFileLoaded) {
      this.myform.markAllAsTouched();
      if (!this.selectedFile) this.fileError = 'Debes seleccionar un archivo';
      if (!this.isFileLoaded) this.fileError = 'Espera a que el archivo termine de cargarse';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log('Formulario enviado con archivo:', formData);
    // Reseteamos el formulario
    this.myform.reset();

    // Eliminamos todas las propiedades adicionales en el FormArray
    while (this.additionalData.length !== 0) {
      this.additionalData.removeAt(0);
    }
    
  }



  public get additionalData() {
    return this.myform.get('additionalData') as FormArray
  }



  public onAddToAdditionalData() {
    if (this.newAdditionalData.invalid) {
      return
    }
    const newData = this.newAdditionalData.value;
    this.additionalData.push(this.fb.control(newData, Validators.required))
    this.newAdditionalData.reset();
  }


  public onDeleteAdditionalData(index: number) {
    this.additionalData.removeAt(index);
  }




  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedExtensions = ['.rar', '.zip'];
      const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        this.fileError = 'Solo se permiten archivos .rar y .zip';
        this.selectedFile = null;
        return;
      }

      // Leer el archivo para asegurarse de que se cargó
      const reader = new FileReader();
      reader.onload = () => {
        this.isFileLoaded = true; // Bandera de carga completada
      };

      reader.readAsArrayBuffer(file); // Leer el archivo
      this.selectedFile = file;
      this.fileError = null;
      this.isFileLoaded = false; // Reset de carga
    }
  }




}





