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

variable "tables_names" {
  type = list(string)
  description = "List of tables names"
  default = [ "CommandTable" ]
}
