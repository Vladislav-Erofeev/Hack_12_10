package tft.GameBackend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import tft.GameBackend.dto.AuthorDTO;
import tft.GameBackend.dto.FriendDTO;
import tft.GameBackend.dto.PersonDTO;
import tft.GameBackend.dto.PersonItemDTO;
import tft.GameBackend.entities.Person;

@Mapper
public interface PersonMapper {

    PersonMapper INSTANCE = Mappers.getMapper(PersonMapper.class);

    @Mapping(target = "url", source = "url")
    @Mapping(target = "name", source = "username")
    PersonDTO personToPersonDTO(Person person);

    @Mapping(target = "name", source = "username")
    FriendDTO personToFriendDTO(Person person);

    @Mapping(target = "name", source = "username")
    @Mapping(target = "url", source = "url")
    AuthorDTO personToAuthorDTO(Person person);

    @Mapping(target = "name", source = "username")
    PersonItemDTO personToPersonItemDTO(Person person);
}
