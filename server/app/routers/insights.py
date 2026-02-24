from fastapi import APIRouter, Depends

from app.models.user import User
from app.schemas.insight import ImageEditRequest, InsightCreate, InsightOut, InsightUpdate
from app.utils.converters import to_out
from app.core.dependencies import get_current_user
from app.services.insights.insight_service import InsightService


router = APIRouter(prefix="/api/insights", tags=["insights"])

@router.post("", response_model=InsightOut)
async def create_insight(data: InsightCreate, user: User = Depends(get_current_user)):
  insight = await InsightService.create_insight(data, user.id)
  
  return to_out(insight)


@router.get("", response_model=list[InsightOut])
async def get_insights(period_type: str | None = None, user: User = Depends(get_current_user)):
  insights = await InsightService.get_insights(user.id, period_type)

  return [to_out(insight) for insight in insights]


@router.get("/{insight_id}", response_model=InsightOut)
async def get_insight(insight_id: str, user: User = Depends(get_current_user)):
  insight = await InsightService.get_insight(insight_id, user.id)

  return to_out(insight)


@router.patch("/{insight_id}", response_model=InsightOut)
async def update_insight(insight_id: str, data: InsightUpdate, user: User = Depends(get_current_user)):
  insight = await InsightService.get_insight(insight_id, user.id)
  updated_insight = await InsightService.update_insight(insight, data)

  return to_out(updated_insight)


@router.delete("/{insight_id}")
async def delete_insight(insight_id: str, user: User = Depends(get_current_user)):
  insight = await InsightService.get_insight(insight_id, user.id)
  await InsightService.delete_insight(insight)

  return {"message": "Entry deleted successfully"}


@router.patch("/{insight_id}/edit-image")
async def edit_image(insight_id: str, body: ImageEditRequest, user: User = Depends(get_current_user)):
  insight = await InsightService.get_insight(insight_id, user.id)
  new_url = await InsightService.edit_image(insight, body.fixes)

  return {
    "imageUrl": new_url,
    "fixesSummary": "Applied your requested vidual refinements."
  }