package tft.GameBackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MVCConfig implements WebMvcConfigurer {
    private final String UPLOAD_DIRECTORY = "/images/"; // в docker
//    private final String UPLOAD_DIRECTORY = "C:/images/"; // на локалке

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image/**").addResourceLocations("file:" + UPLOAD_DIRECTORY);
    }
}