import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaForm: Categoria = { nome: '', setor: '', ativa: true };
  editandoId: number | null = null;
  erro = '';

  constructor(private service: CategoriaService) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  // GET ALL
  carregarCategorias(): void {
    this.service.listarTodas().subscribe({
      next: dados => { this.categorias = dados; this.erro = ''; },
      error: () => (this.erro = 'Não foi possível carregar as categorias. A API está rodando em http://localhost:8080?')
    });
  }

  // POST e PUT
  salvar(): void {
    const acao = this.editandoId
      ? this.service.atualizar(this.editandoId, this.categoriaForm)
      : this.service.criar(this.categoriaForm);

    acao.subscribe({
      next: () => { this.limparFormulario(); this.carregarCategorias(); },
      error: () => (this.erro = 'Erro ao salvar a categoria.')
    });
  }

  prepararEdicao(categoria: Categoria): void {
    this.editandoId = categoria.id!;
    this.categoriaForm = { ...categoria };
  }

  // DELETE
  excluir(id?: number): void {
    if (!id) return;
    this.service.deletar(id).subscribe({
      next: () => this.carregarCategorias(),
      error: () => (this.erro = 'Erro ao excluir a categoria.')
    });
  }

  limparFormulario(): void {
    this.editandoId = null;
    this.categoriaForm = { nome: '', setor: '', ativa: true };
  }
}
