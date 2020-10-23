import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venda } from './servico/venda';
import { VendaService } from './servico/venda.service';
import { ClienteService } from '../cliente/servico/cliente.service';
import { Cliente } from '../cliente/servico/cliente';


@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})

export class VendaComponent implements OnInit {

  cliente: Cliente = new Cliente();
  venda: Venda = new Venda();
  selecionado: Venda;
  listaVenda: Venda[] = [];
  listaCliente: Cliente[] = [];

  constructor(
    private router: Router,
    private vendaService: VendaService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {

    this.clienteService.consultar('').subscribe(
      data => {
        this.listaCliente = <Cliente[]>data;
      }
    );
    this.vendaService.consultar('').subscribe(
      data => {
        this.listaVenda = <Venda[]>data;
      }
    );
  }

  pesquisar(){
    if(this.cliente != null) {
      this.vendaService.consultar(this.cliente.codigo.toString()).subscribe(
        data => {
          this.listaVenda = <Venda[]>data;
          let temp: Venda;
          this.selecionado = temp;
        }
      );
    }
  }

  incluir(){
    this.router.navigate(['/venda/incluir']);
  }

  alterar(){
    this.router.navigate(['/venda/alterar/'+this.selecionado.codigo]);
  }

  remover(){

    this.vendaService.remover(this.selecionado).subscribe(
      data => {
        alert(data['mensagem']);
        let temp: Venda;
        this.selecionado = temp;
      }
    );
  }

  selecionar(valor){
    this.selecionado = valor;
  }

}
