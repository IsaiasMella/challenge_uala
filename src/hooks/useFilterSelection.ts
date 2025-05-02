type FilterOption = string;

interface UseFilterSelectionProps<T extends FilterOption> {
  options: readonly T[];
  allOption?: T;
  currentSelection: T[];
  onSelectionChange: (newSelection: T[]) => void;
}

export const useFilterSelection = <T extends FilterOption>({
  options,
  allOption,
  currentSelection,
  onSelectionChange,
}: UseFilterSelectionProps<T>) => {
  const handleSelection = (selectedOption: T) => {
    // Si "Todas" está seleccionada y se selecciona una opción específica
    if (allOption && currentSelection.includes(allOption)) {
      onSelectionChange([selectedOption]);
      return;
    }

    // Manejo de la opción "Todas"
    if (allOption && selectedOption === allOption) {
      onSelectionChange(currentSelection.includes(allOption) ? [] : [allOption]);
      return;
    }

    // Toggle normal de opciones
    if (currentSelection.includes(selectedOption)) {
      onSelectionChange(currentSelection.filter(option => option !== selectedOption));
      return;
    }

    const newSelection = [...currentSelection, selectedOption];
    
    // Si todas las opciones están seleccionadas (excepto "Todas"), seleccionamos "Todas"
    const allSelected = options
      .filter(option => option !== allOption)
      .every(option => newSelection.includes(option));
    
    onSelectionChange(allSelected && allOption ? [allOption] : newSelection);
  };

  return {
    handleSelection,
    isSelected: (option: T) => currentSelection.includes(option),
  };
}; 