from app.models.insight import InsightEntry
from app.schemas.insight import InsightOut

def to_out(doc: InsightEntry) -> InsightOut:
  return InsightOut.model_validate(doc)