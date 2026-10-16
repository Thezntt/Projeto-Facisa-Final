import { Routes } from '@angular/router';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';

export const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'categorias', component: CategoriasComponent }
];
