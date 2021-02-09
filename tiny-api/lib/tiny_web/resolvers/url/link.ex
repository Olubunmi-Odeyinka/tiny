defmodule TinyWeb.Resolvers.Url.Link do
  alias Tiny.Urls
  alias TinyWeb.Schema.ChangesetErrors

  def link(_, %{hash: hash}, _) do
    {:ok, Urls.get_by_hash!(hash)}
  end

  def create_link(_, args, _) do
    case Urls.create_link(args) do
      {:error, changeset} ->
        {
          :error,
          message: "Could not shorten link", details: ChangesetErrors.error_details(changeset)
        }

      {:ok, link} ->
        {:ok, link}
    end
  end
end
