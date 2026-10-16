package com.projeto.loja.controller;

import com.projeto.loja.entity.Categoria;
import com.projeto.loja.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaService service;

    @GetMapping
    public ResponseEntity<List<Categoria>> getAll() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Categoria> post(@RequestBody Categoria categoria) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> put(@PathVariable Long id, @RequestBody Categoria categoria) {
        return ResponseEntity.ok(service.atualizar(id, categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
