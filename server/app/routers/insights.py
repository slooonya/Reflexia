from fastapi import APIRouter, HTTPException, status
from app.models.insight import InsightEntry
from app.schemas.insight import ImageEditRequest, InsightCreate, InsightOut, InsightUpdate
from app.models.to_out_util import to_out
from app.services.ai_service import generate_image, refine_image_prompt


router = APIRouter(prefix="/api/insights", tags=["insights"])

@router.post("", response_model=InsightOut)
async def create_insight(data: InsightCreate):
  insight = InsightEntry(data.model_dump())
  await insight.insert()

  return to_out(insight)

@router.get("", response_model=list[InsightOut])
async def get_insights(period_type: str | None = None):
  query = InsightEntry.find_all()
  if period_type:
    query = query.find(InsightEntry.period_type == period_type)

  insights = await query.sort("-period_start").to_list()

  return [to_out(insight) for insight in insights]

@router.get("/{insight_id}", response_model=InsightOut)
async def get_insight(insight_id: str):
  insight = await InsightEntry.get(insight_id)

  if not insight:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND, detail=f"Insight with id {insight_id} not found"
    )
  
  return to_out(insight)

@router.patch("/{insight_id}", response_model=InsightOut)
async def update_insight(insight_id: str, data: InsightUpdate):
  insight = await InsightEntry.get(insight_id)

  if not insight:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND, detail=f"Insight with id {insight_id} not found"
    )
  
  update_data = data.model_dump(exclude_unset=True)

  for k, v in update_data.items():
    setattr(insight, k, v)

  await insight.save()

  return to_out(insight)


@router.delete("/{insight_id}")
async def delete_insight(insight_id: str):
  insight = await InsightEntry.get(insight_id)

  if not insight:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND, detail=f"Insight with id {insight_id} not found"
    )
  
  await insight.delete()

  return {"message": "Entry deleted successfully"}


@router.patch("/{insight_id}/edit-image")
async def edit_image(insight_id: str, body: ImageEditRequest):
  insight = await InsightEntry.get(insight_id)

  if not insight:
    raise HTTPException(404, "Insight not found")

  refined_prompt = await refine_image_prompt(
    insight.image_prompt,
    body.fixes
  )

  new_url = await generate_image(refined_prompt)

  insight.image_prompt = refined_prompt
  insight.image_url = new_url

  await insight.save()

  return {
    "imageUrl": new_url,
    "fixesSummary": "applied your requested vidual refinements."
  }