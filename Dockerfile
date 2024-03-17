FROM postgres:latest

ENV POSTGRES_DB=mydatabase \
    POSTGRES_USER=myuser \
    POSTGRES_PASSWORD=mypassword

EXPOSE 5432

# Optionally, you can add initialization scripts or custom configurations here
# COPY init.sql /docker-entrypoint-initdb.d/
# COPY postgresql.conf /etc/postgresql/postgresql.conf

# Optionally, you can specify volumes to persist data
# VOLUME /var/lib/postgresql/data
