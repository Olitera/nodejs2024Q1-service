# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_DB=mydatabase \
    POSTGRES_USER=myuser \
    POSTGRES_PASSWORD=mypassword

# Optionally, you can expose the PostgreSQL port (5432) if needed
# EXPOSE 5432

# Optionally, you can add initialization scripts or custom configurations here
# COPY init.sql /docker-entrypoint-initdb.d/
# COPY postgresql.conf /etc/postgresql/postgresql.conf

# Optionally, you can specify volumes to persist data
# VOLUME /var/lib/postgresql/data
