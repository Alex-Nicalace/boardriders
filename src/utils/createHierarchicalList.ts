export function createHierarchicalList<
  T extends { id: number; parentId: number | null }
>(arr: T[], id: number | null = null): T[] {
  const next = arr.find((item) => item.parentId === id);
  if (!next) return [];

  return [next, ...createHierarchicalList(arr, next.id)];
}
