import { useEffect, useState } from "react";
import type { Insight } from "../types/insight";
import { getInsights } from "../api/insights";

export function useInsights() {
  const [data, setData] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInsights().then(setData).finally(() => setLoading(false))
  }, []);

  return { data, loading };
}