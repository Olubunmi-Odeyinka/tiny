# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :tiny,
  ecto_repos: [Tiny.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :tiny, TinyWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "K9E0OiM0iAPLgoAumqjKa85FK7hPNWC4M85hlgWy3G075fkitOTG0QdZ5DV8rFb8",
  render_errors: [view: TinyWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Tiny.PubSub,
  live_view: [signing_salt: "MqlpQFx+"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
