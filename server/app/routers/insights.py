from fastapi import APIRouter, HTTPException, status
from app.models.insight import InsightEntry
from app.schemas.insight import InsightCreate, InsightOut, InsightUpdate


router = APIRouter(prefix="/insights", tags=["insights"])

def to_out(doc: InsightEntry) -> InsightOut:
  return InsightOut.model_validate(doc)

@router.post("", response_model=InsightOut)
async def create_insight(data: InsightCreate):
  insight = InsightEntry(data.model_dump())
  await insight.insert()

  return to_out(insight)

@router.get("", response_model=list[InsightOut])
async def get_insights():
  insights = await InsightEntry.find_all().to_list()

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