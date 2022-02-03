package io.github.wferdinando.vendasapi.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.wferdinando.vendasapi.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
  
    public List<Produto> findByOrderById();

}
