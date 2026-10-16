package com.projeto.loja.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String setor;
    private Boolean ativa;

    public Categoria() {}

    public Categoria(Long id, String nome, String setor, Boolean ativa) {
        this.id = id;
        this.nome = nome;
        this.setor = setor;
        this.ativa = ativa;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getSetor() { return setor; }
    public void setSetor(String setor) { this.setor = setor; }
    public Boolean getAtiva() { return ativa; }
    public void setAtiva(Boolean ativa) { this.ativa = ativa; }
}
