import { VendaProduto } from './vendaproduto';
import { Cliente } from './../../cliente/servico/cliente';

export class Venda  {
    codigo: number;
    data: Date;
    cliente: Cliente;
    listaVendaItem: VendaProduto[] = [];
}
