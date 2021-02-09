defmodule TinyWeb.Schema.Schema do
  use Absinthe.Schema

  import_types(TinyWeb.Schema.Models.Urls.Link)

  query do
    import_fields(:link_queries)
  end

  mutation do
    import_fields(:link_mutation)
  end
end
