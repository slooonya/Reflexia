from app.models.insight import InsightEntry
from app.schemas.insight import InsightOut

def to_out(insight: InsightEntry) -> InsightOut:
  return InsightOut.model_validate(insight)