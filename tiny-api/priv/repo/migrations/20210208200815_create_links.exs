defmodule Tiny.Repo.Migrations.CreateLinks do
  use Ecto.Migration

  def change do
    create table(:links) do
      add :hash, :string
      add :long_url, :string

      timestamps()
    end

    create unique_index(:links, [:hash])
    create unique_index(:links, [:long_url])
  end
end
