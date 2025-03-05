FROM postgres:latest

ENV POSTGRES_PASSWORD=dayfull
ENV POSTGRES_DB=dayfullpg

COPY postgresql.conf /etc/postgresql/postgresql.conf
COPY pg_hba.conf /etc/postgresql/pg_hba.conf

WORKDIR /etc/postgresql/9.3/main

EXPOSE 5432

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
