import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { usePendingUrlUpdate } from '@/hooks/home/filter-sidebar/usePendingUrlUpdate';
import type { FilterId } from '@/types/sections/home/filterSidebar';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('usePendingUrlUpdate', () => {
  const mockParams = new URLSearchParams();
  const mockFilterId: FilterId = 'date';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with null pending update', () => {
    const { result } = renderHook(() => usePendingUrlUpdate());
    expect(result.current.pendingUrlUpdate).toBeNull();
  });

  it('should trigger router push and clear pendingUrlUpdate', async () => {
    const { result } = renderHook(() => usePendingUrlUpdate());

    act(() => {
      result.current.setPendingUrlUpdate({
        params: mockParams,
        id: mockFilterId,
      });
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('?' + mockParams.toString(), { scroll: false });
      expect(result.current.pendingUrlUpdate).toBeNull();
    });
  });
});
