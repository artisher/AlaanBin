"use client";

import { useEffect } from "react";

/**
 * Lightweight spatial navigation for TV remotes (arrow keys + OK/Enter).
 * Any element with [data-tv-focus] becomes reachable with the arrows.
 */
export function useTvNavigation() {
    useEffect(() => {
        const KEYS: Record<string, [number, number]> = {
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0],
        };

        const onKeyDown = (e: KeyboardEvent) => {
            const dir = KEYS[e.key];
            if (!dir) return;

            const items = Array.from(
                document.querySelectorAll<HTMLElement>("[data-tv-focus]")
            ).filter((el) => el.offsetParent !== null);
            if (items.length === 0) return;

            const current = document.activeElement as HTMLElement | null;
            if (!current || !items.includes(current)) {
                e.preventDefault();
                items[0].focus();
                return;
            }

            const c = current.getBoundingClientRect();
            const cx = c.left + c.width / 2;
            const cy = c.top + c.height / 2;
            const [dx, dy] = dir;

            let best: HTMLElement | null = null;
            let bestScore = Infinity;

            for (const el of items) {
                if (el === current) continue;
                const r = el.getBoundingClientRect();
                const x = r.left + r.width / 2 - cx;
                const y = r.top + r.height / 2 - cy;

                const along = x * dx + y * dy;
                if (along <= 1) continue;

                const across = Math.abs(dx !== 0 ? y : x);
                const score = along + across * 2.5;
                if (score < bestScore) {
                    bestScore = score;
                    best = el;
                }
            }

            if (best) {
                e.preventDefault();
                best.focus({ preventScroll: true });
                best.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);
}