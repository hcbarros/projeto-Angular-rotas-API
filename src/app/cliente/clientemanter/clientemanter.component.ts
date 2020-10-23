import { Component, OnInit } from '@angular/core';
import { Cliente } from './../servico/cliente';
import { ClienteService } from '../servico/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientemanter',
  templateUrl: './clientemanter.component.html',
  styleUrls: ['./clientemanter.component.scss']
})
export class ClientemanterComponent implements OnInit {

  nomeCliente: string = '';
  cliente: Cliente = new Cliente();
  operacao: string = 'Incluir';
  stop: string = '';
  listaUF: string[] = [
    'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA'
    ,'PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SP','SE','TO'
  ];

  constructor(
    private routeActivated: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nomeCliente = this.routeActivated.snapshot.params.id;
    if(this.nomeCliente != null){
      this.operacao = 'Alterar';
      this.clienteService.consultar (this.nomeCliente).subscribe(
        data => {
          this.cliente = (<Cliente[]>data)[0];
        }
      );
    }
  }

  incluir(){
    if(this.cliente.nome == '') {
        alert("O cliente deve possuir um nome!");
        return;
    }
    if(this.cliente.cep.length > 0 && this.cliente.cep.length < 9) {
      alert("O CEP está incorreto!");
      return;
    }
    if(this.cliente.telefone.length > 0 && this.cliente.telefone.length < 13) {
      alert("O formato do telefone está incorreto!");
      return;
    }
    this.clienteService.incluir(this.cliente).subscribe(
      retorno => {
        alert(retorno['mensagem']);
        this.voltar();
      }
    );

  }

  voltar(){
    this.router.navigate(['/cliente']);
  }


  alterar(){
    if(this.cliente.nome == '') {
      alert("O cliente deve possuir um nome!");
      return;
    }
    if(this.cliente.cep.length > 0 && this.cliente.cep.length < 9) {
      alert("O CEP está incorreto!");
      return;
    }
    if(this.cliente.telefone.length > 0 && this.cliente.telefone.length < 13) {
      alert("O formato do telefone está incorreto!");
      return;
    }
    this.clienteService.alterar(this.cliente).subscribe(
      data => {
        alert(data['mensagem']);
        this.voltar();
      }
    );
  }

  mascaraCEP() {

    let cep = this.cliente.cep;
    cep = cep.replace( /[^\d]/g, '' ).replace( /(\d{5})(\d)/,"$1-$2" );
    if ( cep.length > 9 ) cep = this.stop;
    else this.stop = cep;
    this.cliente.cep = cep;
  }

  mascaraFone() {

    let fone = this.cliente.telefone;
    fone = fone.replace( /[^\d]/g, '' ).replace( /^0/,'' )
                            .replace( /^(\d\d)(\d)/, '($1)$2' )
                            .replace(fone.length > 13 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2' );
    if ( fone.length > 14 ) fone = this.stop;
    else this.stop = fone;
    this.cliente.telefone = fone;
  }

}
