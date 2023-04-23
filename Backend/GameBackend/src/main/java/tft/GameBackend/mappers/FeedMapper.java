package tft.GameBackend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import tft.GameBackend.dto.FeedDTO;
import tft.GameBackend.entities.Feed;

@Mapper(uses = {PersonMapper.class, FeedImageMapper.class})
public interface FeedMapper {
    FeedMapper INSTANCE = Mappers.getMapper(FeedMapper.class);

    @Mapping(target = "body", source = "body")
    FeedDTO feedToFeedDTO(Feed feed);
}
