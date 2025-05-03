'use client'

import type { FilterId } from "@/types/sections/home/filterSidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Custom hook that manages pending URL updates when filters are deactivated.
 * 
 * This hook maintains a pending URL update state and handles the actual URL update
 * when filters are toggled off. It ensures URL updates happen after state changes
 * are complete.
 * 
 * @returns {Object} An object containing:
 *   @property {Object | null} pendingUrlUpdate - The current pending URL update state
 *   @property {Function} setPendingUrlUpdate - Function to set a new pending URL update
 * 
 * @example
 * ```tsx
 * const { pendingUrlUpdate, setPendingUrlUpdate } = usePendingUrlUpdate();
 * ```
 */

export const usePendingUrlUpdate = () => {
    const [pendingUrlUpdate, setPendingUrlUpdate] = useState<{
        params: URLSearchParams;
        id: FilterId;
    } | null>(null);

    const router = useRouter()

    useEffect(() => {
        if (pendingUrlUpdate) {
            router.push(`?${pendingUrlUpdate.params.toString()}`, { scroll: false });
            setPendingUrlUpdate(null);
        }
    }, [pendingUrlUpdate, router]);

    return { pendingUrlUpdate, setPendingUrlUpdate };
};