defmodule TinyWeb.Schema.Urls.Link_GraphTest do
  use TinyWeb.ConnCase, async: true

  setup do
    # TinyWeb.Seeds.run()

    :ok
  end

#   @query """
#   mutation ($menuItem: MenuItemInput!) {
#       createMenuItem(input: $menuItem) {
#         name
#   description
#   price }
#   }
# """

@create_url_hash """
mutation ($longUrl: String) {
  createLink(longUrl: $longUrl){
    longUrl
     hash
  }
}
"""

@get_link_from_hash """
query ($hash: String){
 link(hash: $hash){
    longUrl
    hash
 }
}
"""

test "creating a link struct with an hash from long_url" do
  long_url = "www.yahooo.com"
  conn = build_conn()
  conn = post conn, "/api", query: @create_url_hash, variables: %{"longUrl" => long_url}

assert json_response(conn, 200) == %{ "data" => %{
  "createLink" => %{
    "longUrl" => long_url,
    "hash" =>  Tiny.Urls.Link.hash_string(long_url)
      }
    }
  }

end

test "ensuring creating same link several time return same result" do
  long_url = "https://stackoverflow.com/jobs/494606/mid-level-back-end-net-core-postgresql-engineer-findox-inc/similar?id=494606"

  conn1 = post build_conn(), "/api", query: @create_url_hash, variables: %{"longUrl" => long_url}

  conn2 = post build_conn(), "/api", query: @create_url_hash, variables: %{"longUrl" => long_url}

  assert json_response(conn1, 200)  == assert json_response(conn2, 200)

end

test "retrieve a link based on the hash " do
  long_url = "https://stackoverflow.com/questions/61583375/how-can-i-use-count-and-group-by-in-prisma-2"
  # expected equivaent hash
  hash = "1335675931"

  post build_conn(), "/api", query: @create_url_hash, variables: %{"longUrl" => long_url}

  conn =  get build_conn(), "/api", query: @get_link_from_hash, variables: %{"hash" => hash}

  assert json_response(conn, 200) == %{ "data" => %{
    "link" => %{
      "longUrl" => long_url,
      "hash" =>  hash
        }
      }
    }

end


end
