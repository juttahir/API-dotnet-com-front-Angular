import { ListPessoasDTO } from './pessoas.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getItemById(id: string): Observable<ListPessoasDTO> {
    return this.httpClient.get<ListPessoasDTO>(`${this.baseUrl}/pessoas/byid/${id}`);
  }

  getAll(): Observable<ListPessoasDTO[]> {
    return this.httpClient.get<ListPessoasDTO[]>(`${this.baseUrl}/pessoas`);
  }

  postPessoa(pessoas: ListPessoasDTO): Observable<ListPessoasDTO> {
    return this.httpClient.post<ListPessoasDTO>(`${this.baseUrl}/pessoas`, pessoas)
  }

  updatePessoa(id: string, pessoa: ListPessoasDTO): Observable<ListPessoasDTO> {
    return this.httpClient.put<ListPessoasDTO>(`${this.baseUrl}/pessoa/update/${id}`, pessoa);
  }

  deletePessoaById(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/pessoa/${id}`)
  }

  getByPagination(page: number, quantity: number){
    return this.httpClient
    .get<any>(`${this.baseUrl}/getbypagination?page=${page}&quantity=${quantity}`);
  }

  private ordenaPorCodigo(acaoA:ListPessoasDTO , acaoB:ListPessoasDTO){
    if(acaoA.id > acaoB.id){
      return 1;
    }
    if(acaoA.id < acaoB.id){
      return -1;
    }

    return 0;
  }

  search(term: string): Observable<Array<ListPessoasDTO>> {
    return this.httpClient.get<Array<ListPessoasDTO>>(`${this.baseUrl}/search?searchQuery=${term}`)
  }
}