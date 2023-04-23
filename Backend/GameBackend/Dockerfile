FROM openjdk:17
ADD /target/GameBackend-0.0.2-SNAPSHOT.jar application.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "application.jar"]