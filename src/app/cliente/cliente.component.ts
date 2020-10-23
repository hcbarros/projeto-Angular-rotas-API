import { Component, OnInit } from '@angular/core';
import { Cliente } from './servico/cliente';
import { ClienteService } from './servico/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();
  selecionado: Cliente;
  listaCliente: Cliente[] = [];

  constructor(
    private router: Router,
    private clienteServico: ClienteService
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(){

    this.clienteServico.consultar(this.cliente.nome).subscribe(
      (retorno: Cliente[]) => {
        this.listaCliente = retorno;
        let temp: Cliente;
        this.selecionado = temp;
      }
    );
  }

  incluir(){
    this.router.navigate(['/cliente/incluir']);
  }

  selecionar(valor){
    this.selecionado = valor;
  }

  remover(){

      this.clienteServico.remover(this.selecionado).subscribe(
        data => {
          alert(data['mensagem']);
          let temp: Cliente;
          this.selecionado = temp;
        }
      );
  }

  alterar(){
      this.router.navigate(['/cliente/alterar/'+this.selecionado.nome]);
  }

}
