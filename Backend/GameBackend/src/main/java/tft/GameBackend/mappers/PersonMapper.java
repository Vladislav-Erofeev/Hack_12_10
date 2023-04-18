package tft.GameBackend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import tft.GameBackend.dto.AuthorDTO;
import tft.GameBackend.dto.FriendDTO;
import tft.GameBackend.dto.PersonDTO;
import tft.GameBackend.entities.Person;

@Mapper
public interface PersonMapper {

    PersonMapper INSTANCE = Mappers.getMapper(PersonMapper.class);

    @Mapping(target = "url", source = "url")
    PersonDTO personToPersonDTO(Person person);

    @Mapping(target = "name", source = "username")
    FriendDTO personToFriendDTO(Person person);

    @Mapping(target = "name", source = "username")
    AuthorDTO personToAuthorDTO(Person person);
}
