import { Component, OnInit } from '@angular/core';
import { Produto } from '../Objetos/Produto';
import { ProdutoService } from './../service/produto.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 prod: any
 produtos: Array<Produto> = []
 carregarLoading: boolean = false 
  constructor(private produtoService: ProdutoService,private router: Router) { }

  ngOnInit(): void {
   this.produtoService.listar().subscribe(prods => {
     setTimeout(()=>{
       this.carregarLoading = true
      this.produtos = prods     
     },3000)
          
  })  

  }
excluirItem = (id:any) =>{
  this.produtoService.excluirItem(id).subscribe(
    success => console.log("Deletou"),
    error => console.log("Deu ruim"),
    () => console.log('Requisição completa')
  )
  this.ngOnInit();
  }
  editar = (id:any) =>{
    this.router.navigate(['cadastro',id])
  }
}
