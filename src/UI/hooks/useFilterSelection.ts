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
    // console.log('=== Debug Info ===');
    // console.log('Selected Option:', selectedOption);
    // console.log('Current Selection:', currentSelection);
    // console.log('All Option:', allOption);
    // console.log('Is All Option Selected?', currentSelection.includes(allOption));

    // Si "Todas" está seleccionada y se selecciona una opción específica
    if (allOption && currentSelection.includes(allOption)) {
      console.log('Case 1: Todas selected, selecting specific option');
      onSelectionChange([selectedOption]);
      return;
    }

    // Manejo de la opción "Todas"
    if (allOption && selectedOption === allOption) {
      console.log('Case 2: Handling Todas option');
      if (currentSelection.includes(allOption)) {
        console.log('Case 2.1: Deselecting Todas');
        onSelectionChange([]);
      } else {
        console.log('Case 2.2: Selecting Todas');
        onSelectionChange([allOption]);
      }
      return;
    }

    let newSelection: T[];
    // Toggle normal de opciones
    if (currentSelection.includes(selectedOption)) {
      console.log('Case 3: Deselecting specific option');
      newSelection = currentSelection.filter(option => option !== selectedOption);
    } else {
      console.log('Case 4: Selecting specific option');
      newSelection = [...currentSelection, selectedOption];
      // Si todas las opciones están seleccionadas (excepto "Todas"), seleccionamos "Todas"
      const allSelected = options
        .filter(option => option !== allOption)
        .every(option => [...newSelection].includes(option));
      
      if (allSelected && allOption) {
        console.log('Case 4.1: All options selected, switching to Todas');
        newSelection = [allOption];
      }
    }

    console.log('Final Selection:', newSelection);
    onSelectionChange(newSelection);
  };

  return {
    handleSelection,
    isSelected: (option: T) => currentSelection.includes(option),
  };
}; 