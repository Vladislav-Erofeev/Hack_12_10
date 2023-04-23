package tft.GameBackend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tft.GameBackend.dto.LevelDTO;
import tft.GameBackend.entities.Level;
import tft.GameBackend.errors.LevelNotFoundException;
import tft.GameBackend.reopsitories.LevelRepository;

import java.util.Arrays;
import java.util.Optional;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LevelService {
    private final LevelRepository levelRepository;

    public LevelDTO findById(long id) throws LevelNotFoundException {
        Optional<Level> optionalLevel = levelRepository.findById(id);
        if (optionalLevel.isEmpty())
            throw new LevelNotFoundException("Level with id = " + id + " not found");

        Level level = optionalLevel.get();
        int[][] field = new int[30][];
        for (int i = 0; i < 30; i++) {
            field[i] = Arrays.copyOfRange(level.getField(), 30 * i, 30 * (i + 1));
        }
        LevelDTO levelDTO = LevelDTO.builder()
                .box(level.getBoxCount())
                .stoplight(level.getStoplightCount())
                .smooth(level.getSmoothCount())
                .field(field)
                .url(level.getUrl())
                .build();
        return levelDTO;
    }

    @Transactional
    public void save(LevelDTO levelDTO) {
        int[] field = Stream.of(levelDTO.getField())
                .flatMapToInt(IntStream::of)
                .toArray();
        Level level = Level.builder()
                .field(field)
                .url(levelDTO.getUrl())
                .smoothCount(levelDTO.getSmooth())
                .boxCount(levelDTO.getBox())
                .stoplightCount(levelDTO.getStoplight())
                .build();
        levelRepository.save(level);
    }

    @Transactional
    public void deleteById(long id) {
        levelRepository.deleteById(id);
    }
}
