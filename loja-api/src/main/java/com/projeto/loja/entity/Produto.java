package com.projeto.loja.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Double preco;
    private Integer estoque;
    private String categoriaNome;

    public Produto() {}

    public Produto(Long id, String nome, Double preco, Integer estoque, String categoriaNome) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
        this.categoriaNome = categoriaNome;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public Double getPreco() { return preco; }
    public void setPreco(Double preco) { this.preco = preco; }
    public Integer getEstoque() { return estoque; }
    public void setEstoque(Integer estoque) { this.estoque = estoque; }
    public String getCategoriaNome() { return categoriaNome; }
    public void setCategoriaNome(String categoriaNome) { this.categoriaNome = categoriaNome; }
}
