import { Component, OnInit } from '@angular/core';
import { Produto } from './servico/produto';
import { ProdutoService } from './servico/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto();
  selecionado: Produto;
  listaProduto: Produto[] = [];

  constructor(
    private router: Router,
    private produtoServico: ProdutoService
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(){

    this.produtoServico.pesquisar(this.produto.nome).subscribe(
      (retorno: Produto[]) => {
        this.listaProduto = retorno;
        let temp: Produto;
        this.selecionado = temp;
      }
    );
  }

  incluir(){
    this.router.navigate(['/produto/incluir']);
  }

  selecionar(valor){
    this.selecionado = valor;
  }

  remover(){

      this.produtoServico.remover(this.selecionado).subscribe(
        data => {
          alert(data['mensagem']);
          let temp: Produto;
          this.selecionado = temp;
        }
      );
  }

  alterar(){
      this.router.navigate(['/produto/alterar/'+this.selecionado.nome]);
  }

}
