defmodule Tiny.Urls.Link do
  use Ecto.Schema
  import Ecto.Changeset

  schema "links" do
    field :hash, :string
    field :long_url, :string

    timestamps()
  end

  @doc false
  def changeset(link, attrs) do

    required = [:long_url]
    others = [:hash]

    link
    |> cast(attrs, required ++ others)
    |> validate_required(required)
    |> generate_hash
    |> unique_constraint(:hash)
    |> unique_constraint(:long_url)
  end

  defp generate_hash(
    %Ecto.Changeset{valid?: true, changes: %{long_url: long_url}} = changeset
) do

    hash = hash_string(long_url)
    change(changeset, hash: hash)
  end

  def hash_string long_url do
    case long_url do
      nil -> nil
      _ -> hash = :crypto.hash(:sha, long_url) |> binary_part(0, 4) |> :crypto.bytes_to_integer() |> to_string
    end
  end

  defp generate_hash(changeset), do: changeset
end
