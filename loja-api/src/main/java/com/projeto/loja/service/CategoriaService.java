package com.projeto.loja.service;

import com.projeto.loja.entity.Categoria;
import com.projeto.loja.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository repository;

    public List<Categoria> listarTodas() {
        return repository.findAll();
    }

    public Categoria buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Categoria não encontrada com ID: " + id));
    }

    public Categoria criar(Categoria categoria) {
        categoria.setId(null);
        return repository.save(categoria);
    }

    public Categoria atualizar(Long id, Categoria categoriaAtualizada) {
        Categoria existente = buscarPorId(id);
        existente.setNome(categoriaAtualizada.getNome());
        existente.setSetor(categoriaAtualizada.getSetor());
        existente.setAtiva(categoriaAtualizada.getAtiva());
        return repository.save(existente);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        repository.deleteById(id);
    }
}
