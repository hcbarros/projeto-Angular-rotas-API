import { Component, OnInit } from '@angular/core';
import { Produto } from './../servico/produto';
import { ProdutoService } from '../servico/produto.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-produtomanter',
  templateUrl: './produtomanter.component.html',
  styleUrls: ['./produtomanter.component.scss']
})
export class ProdutomanterComponent implements OnInit {

  nomeProduto: string = '';
  produto: Produto = new Produto();
  operacao: string = 'Incluir';

  constructor(
    private routeActivated: ActivatedRoute,
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.nomeProduto = this.routeActivated.snapshot.params.id;
    if(this.nomeProduto != null){
      this.operacao = 'Alterar';
      this.produtoService.pesquisar(this.nomeProduto).subscribe(
        data => {
          this.produto = (<Produto[]>data)[0];
        }
      );
    }
  }

  incluir(){
    if(this.produto.nome == '') {
        alert("O produto deve possuir um nome!");
        return;
    }
    this.produtoService.incluir(this.produto).subscribe(
      retorno => {
        alert(retorno['mensagem']);
        this.voltar();
      }
    );


  }

  voltar(){
    this.router.navigate(['/']);
  }


  alterar(){
    if(this.produto.nome == '') {
      alert("O produto deve possuir um nome!");
      return;
    }
    this.produtoService.alterar(this.produto).subscribe(
      data => {
        alert(data['mensagem']);
        this.voltar();
      }
    );
  }

}
