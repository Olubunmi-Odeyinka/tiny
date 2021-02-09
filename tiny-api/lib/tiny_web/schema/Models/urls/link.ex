defmodule TinyWeb.Schema.Models.Urls.Link do
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1, dataloader: 3]

  alias TinyWeb.Resolvers

  object :link_queries do
    @desc "Get a link by its hash"
    field :link, :link do
      arg(:hash, non_null(:string))
      resolve(&Resolvers.Url.Link.link/3)
    end

  end

  object :link_mutation do
    @desc "Create a short link"
    field :create_link, :link do
      arg(:long_url, :string)
      resolve(&Resolvers.Url.Link.create_link/3)
    end

  end

  object :link do
    field(:id, :id)
    field(:hash, :string)
    field(:long_url, :string)
  end
end
