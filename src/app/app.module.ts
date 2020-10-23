import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClientemanterComponent } from './cliente/clientemanter/clientemanter.component';
import { ClienteService } from './cliente/servico/cliente.service';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutomanterComponent } from './produto/produtomanter/produtomanter.component';
import { ProdutoService } from './produto/servico/produto.service';
import { VendaComponent } from './venda/venda.component';
import { VendamanterComponent } from './venda/vendamanter/vendamanter.component';
import { VendaService } from './venda/servico/venda.service';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ClienteComponent,
    ProdutoComponent,
    VendaComponent,
    ProdutomanterComponent,
    ClientemanterComponent,
    VendamanterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [
    ProdutoService,
    ClienteService,
    VendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
