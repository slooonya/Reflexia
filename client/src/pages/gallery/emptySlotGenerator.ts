export function addEmptySlots(items, columns) {
  if (!items || items.length === 0) return [];

  const remainder = items.length % columns;
  if (remainder === 0) return items;

  const emptyCount = columns - remainder;
  return [
    ...items, 
    ...Array.from({ length: emptyCount }, (_, i) => ({
      id: `empty-${i}`,
      empty: true
    }))
  ];
}