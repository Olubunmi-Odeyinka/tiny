FROM elixir:latest

# When this image is run, make /app the current working directory
WORKDIR /app

COPY . .

# Install hex
RUN mix local.hex --force

#Install Redar
RUN mix local.rebar --force

# Compile the project
RUN mix do compile

EXPOSE 4000

# -v /path/on/your/host/machine:/app

# /Users/user/Documents/tiny/tiny-api