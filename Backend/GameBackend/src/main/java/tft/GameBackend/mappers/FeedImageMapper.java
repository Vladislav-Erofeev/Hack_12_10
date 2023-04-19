package tft.GameBackend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import tft.GameBackend.dto.FeedImageDTO;
import tft.GameBackend.entities.FeedImage;

@Mapper
public interface FeedImageMapper {
    FeedImageMapper INSTANCE = Mappers.getMapper(FeedImageMapper.class);

    FeedImageDTO feedImageToFeedImageDTO(FeedImage feedImage);
}
