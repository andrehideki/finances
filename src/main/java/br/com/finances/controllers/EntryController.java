package br.com.finances.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.finances.models.EntryModel;
import br.com.finances.services.EntryService;
import br.com.finances.services.dto.EntrySaveDto;
import br.com.finances.services.dto.EntrySearchDto;
import br.com.finances.services.dto.EntryUpdateDto;
import jakarta.validation.Valid;

@RestController
@RequestMapping("entry")
public class EntryController {

	@Autowired
	private EntryService entryService;
	
	@GetMapping("{id}")
	public ResponseEntity<EntryModel> getEntry(
		@PathVariable String id
	) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(entryService.get(id));
	}
	
	@GetMapping
	public ResponseEntity<List<EntryModel>> getEntries(EntrySearchDto dto) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(entryService.search(dto));
	}
	
	@PostMapping
	public ResponseEntity<EntryModel> postEntry(
			@Valid @RequestBody EntrySaveDto dto
	) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(entryService.save(dto));
	}
	
	@PutMapping("{id}")
	public ResponseEntity<EntryModel> putEntry(
			@PathVariable String id,
			@Valid @RequestBody EntryUpdateDto dto
	) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(entryService.update(dto));
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<EntryModel> deleteEntry(
		@PathVariable String id
	) {
		entryService.delete(id);
		return ResponseEntity
				.status(HttpStatus.NO_CONTENT)
				.build();
	}
	
}
