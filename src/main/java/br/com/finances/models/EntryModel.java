package br.com.finances.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.stream.Stream;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="entry")
@Data
public class EntryModel {

	public static enum Type {
		REVENUE, EXPENSE;
		
		public static Type get(String type) {
			return Stream.of(Type.values())
					.filter(t -> t.toString().equalsIgnoreCase(type))
					.findFirst()
					.orElse(REVENUE);
		}
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	private String name;
	private String description;
	private BigDecimal value;
	private LocalDate date;
	
	@Enumerated(EnumType.STRING)
	private Type type;
	
	@CreationTimestamp
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	private LocalDateTime updatedAt;
}
