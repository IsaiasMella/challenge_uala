type FilterOption = string;

interface UseFilterSelectionProps<T extends FilterOption> {
  options: readonly T[];
  allOption?: T;
  currentSelection: T[];
  onSelectionChange: (_newSelection: T[]) => void;
}

/**
 * Custom hook that manages filter selection functionality with support for an "All" option.
 * 
 * This hook handles the state and logic for selecting/deselecting filter options, including
 * special handling for an optional "All" option that can select/deselect all other options.
 * 
 * @param {Object} props - Hook properties
 * @param {readonly T[]} props.options - Array of available filter options
 * @param {T} [props.allOption] - Optional "All" option value
 * @param {T[]} props.currentSelection - Currently selected filter options
 * @param {Function} props.onSelectionChange - Callback function when selection changes
 * 
 * @returns {Object} An object containing:
 *   @property {(option: T) => void} handleSelection - Function to handle option selection/deselection
 *   @property {(option: T) => boolean} isSelected - Function to check if an option is selected
 */
export const useFilterSelection = <T extends FilterOption>({
  options,
  allOption,
  currentSelection,
  onSelectionChange,
}: UseFilterSelectionProps<T>) => {
  const handleSelection = (selectedOption: T) => {
    if (allOption && selectedOption === allOption) {
      onSelectionChange(
        currentSelection.includes(allOption) ? [] : [allOption],
      );
      return;
    }

    if (allOption && currentSelection.includes(allOption)) {
      onSelectionChange([selectedOption]);
      return;
    }

    if (currentSelection.includes(selectedOption)) {
      onSelectionChange(
        currentSelection.filter((option) => option !== selectedOption),
      );
      return;
    }

    const newSelection = [...currentSelection, selectedOption];

    const allSelected = options
      .filter((option) => option !== allOption)
      .every((option) => newSelection.includes(option));

    onSelectionChange(allSelected && allOption ? [allOption] : newSelection);
  };

  return {
    handleSelection,
    isSelected: (option: T) => currentSelection.includes(option),
  };
};
