FROM elixir:latest

# When this image is run, make /app the current working directory
WORKDIR /app

# Install hex
RUN mix local.hex --force

#Install Redar
RUN mix local.rebar --force

COPY mix.exs ./
COPY mix.lock ./
COPY ./deps ./deps

RUN mix deps.compile
RUN mix compile

COPY . .

EXPOSE 4000

# -v /path/on/your/host/machine:/app

# /Users/user/Documents/tiny/tiny-api