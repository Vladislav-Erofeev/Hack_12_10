package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tft.GameBackend.dto.PersonDTO;
import tft.GameBackend.mappers.PersonMapper;
import tft.GameBackend.services.PersonService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/person")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;
    private final PersonMapper personMapper = PersonMapper.INSTANCE;

    @GetMapping("/list")
    public List<PersonDTO> getAll() {
        return personService.findAll().stream()
                .map(personMapper::personToPersonDTO)
                .collect(Collectors.toList());
    }
}
