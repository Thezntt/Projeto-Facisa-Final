package com.projeto.loja.service;

import com.projeto.loja.entity.Produto;
import com.projeto.loja.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public List<Produto> listarTodos() {
        return repository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produto não encontrado com ID: " + id));
    }

    public Produto criar(Produto produto) {
        produto.setId(null);
        return repository.save(produto);
    }

    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto existente = buscarPorId(id);
        existente.setNome(produtoAtualizado.getNome());
        existente.setPreco(produtoAtualizado.getPreco());
        existente.setEstoque(produtoAtualizado.getEstoque());
        existente.setCategoriaNome(produtoAtualizado.getCategoriaNome());
        return repository.save(existente);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        repository.deleteById(id);
    }
}
