from beanie import Document

class User(Document):
  username: str
  email: str
  password: str | None = None
  pfp_url: str | None = None
  is_google_account: bool = False

  class Settings:
    name = "users"