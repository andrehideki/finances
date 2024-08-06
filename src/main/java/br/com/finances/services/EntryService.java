package br.com.finances.services;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import br.com.finances.models.EntryModel;
import br.com.finances.repositories.EntryRepository;
import br.com.finances.services.dto.EntrySaveDto;
import br.com.finances.services.dto.EntrySearchDto;
import br.com.finances.services.dto.EntryUpdateDto;
import jakarta.transaction.Transactional;

@Service
public class EntryService {

	private EntryRepository entryRepository;
	
	public EntryService(EntryRepository entryRepository) {
		this.entryRepository = entryRepository;
	}
	
	public List<EntryModel> search(EntrySearchDto dto) {
		return entryRepository.findAll().stream()
				.filter(e -> {
					boolean containsName = e.getName().toUpperCase().contains(dto.name().toUpperCase());
					boolean isType = "".equals(dto.type()) ||
							e.getType().toString().equals(dto.type());
					boolean isYearMonth = dto.yearMonth() == null || 
								(dto.yearMonth().getYear() == e.getDate().getYear() &&
									dto.yearMonth().getMonthValue() == e.getDate().getMonthValue());
					return containsName && 
							isType && 
							isYearMonth;
				})
				.toList();
	}
	
	@Transactional
	public EntryModel update(EntryUpdateDto dto) {
		var entryModel = entryRepository.findById(UUID.fromString(dto.id()))
				.get();
		BeanUtils.copyProperties(dto, entryModel);
		entryModel.setType(EntryModel.Type.valueOf(dto.type()));
		entryRepository.save(entryModel);
		return entryModel;
	}
	
	@Transactional
	public EntryModel save(EntrySaveDto dto) {
		var entryModel = new EntryModel();
		BeanUtils.copyProperties(dto, entryModel);
		entryModel.setDate(entryModel.getDate() == null? LocalDate.now() : entryModel.getDate());
		entryModel.setType(EntryModel.Type.valueOf(dto.type()));
		entryRepository.save(entryModel);
		return entryModel;
	}

	@Transactional
	public void delete(String id) {
		entryRepository.deleteById(UUID.fromString(id));
	}

	public EntryModel get(String id) {
		var optionalEntry = entryRepository.findById(UUID.fromString(id));
		return optionalEntry.get();
	}

}
