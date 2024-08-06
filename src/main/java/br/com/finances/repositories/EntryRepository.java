package br.com.finances.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.finances.models.EntryModel;

public interface EntryRepository extends JpaRepository<EntryModel, UUID>{

}
