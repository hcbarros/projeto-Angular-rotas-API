import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venda } from '../servico/venda';
import { VendaService } from '../servico/venda.service';
import { VendaProduto } from '../servico/vendaproduto';
import { Cliente } from 'src/app/cliente/servico/cliente';
import { ProdutoService } from 'src/app/produto/servico/produto.service';
import { Produto } from 'src/app/produto/servico/produto';
import { ClienteService } from 'src/app/cliente/servico/cliente.service';

@Component({
  selector: 'app-vendamanter',
  templateUrl: './vendamanter.component.html',
  styleUrls: ['./vendamanter.component.scss']
})
export class VendamanterComponent implements OnInit {

  venda: Venda = new Venda();
  vendaProduto: VendaProduto = new VendaProduto();
  listaProduto: Produto[] = [];
  listaCliente: Cliente[] = [];
  listaVenda: Venda[] = [];
  vendaValorTotal: number = 0;


  constructor(
    private router: Router,
    private vendaService: VendaService,
    private produtoService: ProdutoService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {

    this.clienteService.consultar('').subscribe(
      data => {
        this.listaCliente = <Cliente[]>data;
      }
    );
    this.produtoService.pesquisar('').subscribe(
      data => {
        this.listaProduto = <Produto[]>data;
      }
    );
    this.vendaService.consultar('').subscribe(
      data => {
        this.listaVenda = <Venda[]>data;
      }
    );
  }


  incluir(){

    if(typeof this.venda.cliente == 'undefined' || this.venda.cliente == null) {
      alert("Selecione um cliente!");
      return;
    }
    if(this.venda.listaVendaItem.length === 0) {
      alert("Adicione algum produto!");
      return;
    }

    let size = this.listaVenda.length;
    this.venda.codigo = this.listaVenda[size-1].codigo + 1;

    this.vendaService.incluir(this.venda).subscribe(
      data => {
        alert(data['mensagem']);
        this.voltar();
      }
    );
  }


  adicionar(){
    if(typeof this.vendaProduto.produto == 'undefined') {
        alert("Selecione um produto!");
        return;
    }
    if(this.vendaProduto.quantidade == null || this.vendaProduto.quantidade < 1) {
        alert("Selecione uma quantidade maior que 0");
        return;
    }
    if(!Number.isInteger(this.vendaProduto.quantidade)) {
        alert("Informe um número inteiro!");
        return;
    }
        this.venda.listaVendaItem.push(this.vendaProduto);
        this.vendaValorTotal += this.vendaProduto.quantidade * this.vendaProduto.produto.valor;
        this.vendaProduto = new VendaProduto();
  }


  removerProduto(vendaProduto){

    this.vendaValorTotal -= vendaProduto.quantidade * vendaProduto.produto.valor;

    this.venda.listaVendaItem = this.venda.listaVendaItem.filter(
      obj => obj !== vendaProduto
    );
  }


  voltar(){
    this.router.navigate(['/venda']);
  }

}
