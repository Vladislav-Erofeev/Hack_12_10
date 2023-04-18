package tft.GameBackend.utils;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

@Component
public class ImageNameService {

    public String generate(String type) {
        String name  = RandomStringUtils.random(30, true, true);
        name += "." + type.substring(6);
        return name.toString();
    }
}
