from beanie import Document

class User(Document):
  username: str
  email: str
  password: str
  pfp_url: str | None = None

  class Settings:
    name = "users"