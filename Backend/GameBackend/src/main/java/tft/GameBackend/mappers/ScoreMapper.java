package tft.GameBackend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import tft.GameBackend.dto.NewScoreDTO;
import tft.GameBackend.dto.ScoreDTO;
import tft.GameBackend.entities.Score;

@Mapper(uses = {PersonMapper.class})
public interface ScoreMapper {
    ScoreMapper INSTANCE = Mappers.getMapper(ScoreMapper.class);

    ScoreDTO scoreToScoreDTO(Score score);

}
