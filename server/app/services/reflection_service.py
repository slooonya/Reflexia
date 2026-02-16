from app.models.reflection import ReflectionSession


async def get_or_create_reflection_session(user_id: str, insight_id: str):
  session = await ReflectionSession.find_one(
    ReflectionSession.user_id == user_id,
    ReflectionSession.insight_id == insight_id,
    ReflectionSession.completed == False
  )

  if session:
    return session
  
  session = ReflectionSession(
    user_id=user_id,
    insight_id=insight_id,
    messages=[],
    summary="",
    completed=False
  )

  await session.insert()
  return session