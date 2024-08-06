package br.com.finances.services.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EntrySaveDto(
	@NotBlank String name,
	String description,
	@NotBlank String type,
	LocalDate date,
	@NotNull @Min(1) BigDecimal value
) {}
