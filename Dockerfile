FROM elixir:latest

# When this image is run, make /app the current working directory
WORKDIR /app

# Install hex
RUN mix local.hex --force

#Install Redar
RUN mix local.rebar --force

COPY ./tiny-api/mix.exs .
COPY ./tiny-api/mix.lock .

# RUN mix deps.get --force
# RUN mix deps.compile
# RUN mix compile


ENTRYPOINT [ "mix" ]