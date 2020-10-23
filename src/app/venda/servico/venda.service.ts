import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venda } from './venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(
    private http: HttpClient
  ) { }

  consultar(codigoCliente: string){
    return this.http.get("https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/venda/consultar/"+codigoCliente);
  }

  incluir(venda: Venda){
    return this.http.post("https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/venda/incluir", venda);
  }

  remover(venda: Venda){
    return this.http.post("https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/venda/remover", venda);
  }

}
