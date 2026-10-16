package com.projeto.loja.controller;

import com.projeto.loja.entity.Produto;
import com.projeto.loja.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @GetMapping
    public ResponseEntity<List<Produto>> getAll() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Produto> post(@RequestBody Produto produto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(produto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> put(@PathVariable Long id, @RequestBody Produto produto) {
        return ResponseEntity.ok(service.atualizar(id, produto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
