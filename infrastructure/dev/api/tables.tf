resource "aws_dynamodb_table" "tables" {
  for_each = toset(var.tables_names)

  name           = each.value
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}