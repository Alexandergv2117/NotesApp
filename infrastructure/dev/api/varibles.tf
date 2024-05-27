variable "access_key" {
  type = string
  description = "AWS access key"
}

variable "secret_key" {
  type = string
  description = "AWS secret key"
}

variable "region" {
  type = string
  description = "AWS region"
}

variable "role_name" {
  type = string
  description = "Role name"
  default = "dynamodb-role-lambda-notes-app"
}

variable "tables_names" {
  type = list(string)
  description = "List of tables names"
  default = [ "CommandTable" ]
}
