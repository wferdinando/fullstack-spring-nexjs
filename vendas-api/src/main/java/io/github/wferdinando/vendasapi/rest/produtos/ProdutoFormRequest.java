package io.github.wferdinando.vendasapi.rest.produtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.github.wferdinando.vendasapi.model.Produto;

public class ProdutoFormRequest {

	private Long id;
	private String descricao;
	private String nome;
	private BigDecimal preco;
	private String sku;

	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dataCadastro;

	public ProdutoFormRequest() {
	}

	public ProdutoFormRequest(Long id, String descricao, String nome, BigDecimal preco, String sku,
			LocalDate dataCadastro) {
		this.id = id;
		this.descricao = descricao;
		this.nome = nome;
		this.preco = preco;
		this.sku = sku;
		this.dataCadastro = dataCadastro;
	}

	public Produto toModel() {
		return new Produto(id, nome, descricao, preco, sku);
	}

	public static ProdutoFormRequest fromModel(Produto produto) {
		return new ProdutoFormRequest(
				produto.getId(),
				produto.getDescricao(),
				produto.getNome(),
				produto.getPreco(),
				produto.getSku(),
				produto.getDataCadastro());
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public BigDecimal getPreco() {
		return preco;
	}

	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public LocalDate getdataCadastro() {
		return this.dataCadastro;
	}

	public void setataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	@Override
	public String toString() {
		return "{" +
				" id='" + getId() + "'" +
				", descricao='" + getDescricao() + "'" +
				", nome='" + getNome() + "'" +
				", preco='" + getPreco() + "'" +
				", sku='" + getSku() + "'" +
				"}";
	}

}
