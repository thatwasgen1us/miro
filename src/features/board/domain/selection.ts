
export type SelectionModifier = "replace" | "add" | "toggle"

export type Selection = Set<string>

export function selectItems(
  initialSelected: Selection, 
  ids: string[], 
  modificator: SelectionModifier
): Selection {
    if (modificator === 'replace') {
      return new Set(ids)
    }

    if (modificator === 'add') {
      return new Set([...initialSelected, ...ids])
    }

    if (modificator === 'toggle') {
      const currentIds = new Set(initialSelected);
      const newIds = new Set(ids);

      const base = Array.from(initialSelected).filter((id) => !newIds.has(id))
      const added = ids.filter((id) => !currentIds.has(id))

      return new Set([...base, ...added])
    }

    return initialSelected
}