import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListPessoasDTO } from './pessoas.model';
import { PessoasService } from './app.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPessoaComponent } from './views/home/add-pessoa/add-pessoa.component';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from './views/home/confirmation-dialog/confirmation-dialog.component';
import { HttpStatusCode } from '@angular/common/http';
import { EditPessoaComponent } from './views/home/edit-pessoa/edit-pessoa.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dataTable';
  displayedColumns: string[] = ['nome', "idade", "nacionalidade", "clube", "gols", "jogos", 'actions'];
  dataSource: any;
  listPessoas: ListPessoasDTO | any | undefined;

  isLoading = false;
  totalRows = 0;
  currentPage = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
id: any;
  
  constructor(
    private pessoasService: PessoasService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    
  }
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(): void {
    this.getByPagination();
    this.GetAll();
  }

  getByPagination() {
    this.isLoading = true;

    this.pessoasService.getByPagination(this.currentPage + 1, this.pageSize).subscribe(result => {
      this.listPessoas = result.allowListRegisters;

      this.dataSource = new MatTableDataSource<ListPessoasDTO>(this.listPessoas)      
      this.dataSource.paginator = this.paginator;

      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = result.totalItems;
      });

      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getByPagination();
  }

  GetAll() {
    this.pessoasService.getAll()
      .subscribe((result: any) => {
        this.listPessoas = result;

        this.dataSource = new MatTableDataSource<ListPessoasDTO>(this.listPessoas)
        this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      });
  }
  
  editPessoa(arg0: any) {
    const dialogRef = this.dialog.open(EditPessoaComponent, {
      width: '800px',
      data: { arg0: arg0 }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
        this.snackBar.open('Pessoa editada com sucesso!', '', {
          duration: 5000,
          panelClass: ['snackbar-end'],
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    });
  }

  DeletePessoa(id: number): Subscription {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o jogador?',
    });
  
    let subscription: Subscription = new Subscription();
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        subscription = this.pessoasService.deletePessoaById(id).subscribe({
          next: () => {
            this.ngOnInit();
            this.snackBar.open('Pessoa excluída com sucesso!', '', {
              duration: 5000,
              panelClass: ['snackbar-end'],
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
          },
          error: (error) => {
            console.error('Ocorreu um erro ao excluir a pessoa:', error);
          }
        });        
      }
    });
  
    return subscription;
  }
  

  Filterchage(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  
  openModalInsert() {
    const dialogRef = this.dialog.open(AddPessoaComponent, {
      width: '800px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
        this.snackBar.open('Pessoa adicionada com sucesso!', '', {
          duration: 5000,
          panelClass: ['snackbar-end'],
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    });
  }
  
}
