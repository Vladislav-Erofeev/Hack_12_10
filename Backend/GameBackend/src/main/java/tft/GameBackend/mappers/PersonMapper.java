package tft.GameBackend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;
import tft.GameBackend.dto.PersonDTO;
import tft.GameBackend.entities.Person;

@Mapper
public interface PersonMapper {

    PersonMapper INSTANCE = Mappers.getMapper(PersonMapper.class);

    @Mapping(target = "id", source = "person.id")
    @Mapping(target = "username", source = "person.username")
    @Mapping(target = "email", source = "person.email")
    @Mapping(target = "bestScore", source = "person.bestScore")
    PersonDTO personToPersonDTO(Person person);
}
