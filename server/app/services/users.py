from app.models.user import User


async def get_dev_user():
    user = await User.find_one(User.email == "test@example.com")
    if not user:
        raise Exception("Dev user not found")
    return user