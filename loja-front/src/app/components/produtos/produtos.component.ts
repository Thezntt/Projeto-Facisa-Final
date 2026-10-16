import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto.model';
import { Categoria } from '../../models/categoria.model';
import { ProdutoService } from '../../services/produto.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produtos.component.html'
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  categorias: Categoria[] = [];
  produtoForm: Produto = { nome: '', preco: 0, estoque: 0, categoriaNome: '' };
  editandoId: number | null = null;
  erro = '';

  constructor(private service: ProdutoService, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.carregarProdutos();
    this.categoriaService.listarTodas().subscribe({
      next: dados => (this.categorias = dados),
      error: () => {}
    });
  }

  // GET ALL
  carregarProdutos(): void {
    this.service.listarTodos().subscribe({
      next: dados => { this.produtos = dados; this.erro = ''; },
      error: () => (this.erro = 'Não foi possível carregar os produtos. A API está rodando em http://localhost:8080?')
    });
  }

  // POST e PUT
  salvar(): void {
    const acao = this.editandoId
      ? this.service.atualizar(this.editandoId, this.produtoForm)
      : this.service.criar(this.produtoForm);

    acao.subscribe({
      next: () => { this.limparFormulario(); this.carregarProdutos(); },
      error: () => (this.erro = 'Erro ao salvar o produto.')
    });
  }

  prepararEdicao(produto: Produto): void {
    this.editandoId = produto.id!;
    this.produtoForm = { ...produto };
  }

  // DELETE
  excluir(id?: number): void {
    if (!id) return;
    this.service.deletar(id).subscribe({
      next: () => this.carregarProdutos(),
      error: () => (this.erro = 'Erro ao excluir o produto.')
    });
  }

  limparFormulario(): void {
    this.editandoId = null;
    this.produtoForm = { nome: '', preco: 0, estoque: 0, categoriaNome: '' };
  }
}
