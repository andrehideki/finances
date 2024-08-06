package br.com.finances.services.dto;

import java.time.YearMonth;

public record EntrySearchDto(
	String name,
	String type,
	YearMonth yearMonth
) {}
