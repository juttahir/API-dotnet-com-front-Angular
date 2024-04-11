import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PessoasService } from 'src/app/app.service';
import { ListPessoasDTO } from 'src/app/pessoas.model';

@Component({
  selector: 'app-edit-pessoa',
  templateUrl: './edit-pessoa.component.html',
  styleUrls: ['./edit-pessoa.component.scss']
})
export class EditPessoaComponent implements OnInit {
  formulario: FormGroup = new FormGroup({});
  pessoa: ListPessoasDTO | any;

  constructor(
    private pessoasService: PessoasService,
    public dialogRef: MatDialogRef<EditPessoaComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {arg0: any }
  ) { }
  
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      nome: [''],
      idade: [''],
      nacionalidade: [''],
      clube: [''],
      gols: [''],
      jogos: ['']
    });
    this.editarFormulario();
  }

  editarFormulario(): void {    
    this.pessoasService.getItemById(this.data.arg0).subscribe(res => {
      this.formulario.patchValue({
        id: res.id,
        nome: res.nome,
        idade: res.idade,
        nacionalidade: res.nacionalidade,
        clube: res.clube,
        gols: res.gols,
        jogos: res.jogos
      });
    }, error => {
      console.error("Erro ao obter pessoa: ", error);
    });
};


  onSubmit(): void {
    this.pessoasService.updatePessoa(this.data.arg0, this.formulario.value)
    .subscribe(() => {         
      this.dialogRef.close(true);
    });
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  onConfirm(result: boolean): void {
    if(result)
      this.dialogRef.close();
  }
}
