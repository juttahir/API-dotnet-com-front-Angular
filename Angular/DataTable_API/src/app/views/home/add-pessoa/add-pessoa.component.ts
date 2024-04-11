import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PessoasService } from 'src/app/app.service';
import { ListPessoasDTO } from 'src/app/pessoas.model';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.scss']
})
export class AddPessoaComponent implements OnInit {
  formulario: FormGroup = new FormGroup({});

  constructor(
    private pessoasService: PessoasService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPessoaComponent>,
  ) { }
  
  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      idade: [null, Validators.required],
      nacionalidade: ['', Validators.required],
      clube: ['', Validators.required],
      gols: [null, Validators.required],
      jogos: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const dadosFormulario: ListPessoasDTO = {
        id: '',
        ...this.formulario.value
      };
      
      this.pessoasService.postPessoa(dadosFormulario)
      .subscribe(() => {          
        this.dialogRef.close(true);
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  onConfirm(result: boolean): void {
    if(result)
      this.dialogRef.close();
  }
}
