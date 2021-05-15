import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import {DiasDaSemana} from './../dias-da-semana.enum'
import {Produto} from './../Objetos/Produto'
import { ProdutoService } from "./../service/produto.service";



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  id: any
  produto: Produto = new Produto(0,'', 0)
  textoBotao: string ='Salvar' 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prodService: ProdutoService
  ) { }

  ngOnInit(): void {
    

    this.route.params.subscribe(parametros => {
      if(parametros['id']){
        this.textoBotao ='Editar'
        this.id = parametros['id']
        this.prodService.buscarItemId(this.id).subscribe(prod =>{
          this.produto = prod
        })
      console.log(`id envido: ${this.id}`)
        
      }
    })
  }

  adicionar = () =>{
    if(this.textoBotao == 'Salvar'){

      this.prodService.adicionar(this.produto).subscribe(
        success => this.navegar('Home'),
        error => console.log("Deu ruim"),
        () => console.log('Requisição completa'))
        
    }else{
      this.editar()
    }
      
    
   
  }
editar = () => {
  this.prodService.editar(this.produto).subscribe(
    success => this.navegar('Home'),
    error => console.log("Deu ruim"),
    () => console.log('Requisição completa')      )
    
  }

navegar = (rota:any) =>{
  this.router.navigate([rota]) 
}

}
