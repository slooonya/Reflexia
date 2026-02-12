import { useEffect, useState } from "react";
import type { Insight } from "../types/insight";
import { getInsight } from "../api/insights";

export function useInsight(id?: string) {
  const [data, setData] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getInsight(id).then(setData).finally(() => setLoading(false));
  }, [id]);

  return { data, loading };
}