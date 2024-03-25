FROM postgres:latest

ENV POSTGRES_DB=${DATABASE_NAME} \
    POSTGRES_USER=${DATABASE_USER} \
    POSTGRES_PASSWORD=${DATABASE_PASSWORD}

EXPOSE ${DATABASE_PORT}
