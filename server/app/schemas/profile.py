from pydantic import BaseModel


class ProfileUpdateRequest(BaseModel):
  username: str | None = None
  email: str | None = None
  password: str | None = None


class ProfileResponse(BaseModel):
  id: str
  username: str
  email: str
  pfp_url: str