package tft.GameBackend;

import org.mapstruct.factory.Mappers;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import tft.GameBackend.mappers.PersonMapper;

@SpringBootApplication
public class GameBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(GameBackendApplication.class, args);
	}

//	@Bean
//	public PersonMapper personMapper() {
//		return Mappers.getMapper(PersonMapper.class);
//	}
}
