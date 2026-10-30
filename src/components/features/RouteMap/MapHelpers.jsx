import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

export function FitBounds({ allPositions }) {
    const map = useMap();
    const fitted = useRef(false);
    useEffect(() => {
        if (fitted.current || allPositions.length === 0) return undefined;

        // Leaflet still measures the container as zero-height on first paint, and
        // fitting bounds into a zero-height viewport lands at max zoom. Wait for a
        // real size before fitting, and only latch once we actually have.
        let raf;
        let last = null;
        const fit = () => {
            map.invalidateSize();
            const { x, y } = map.getSize();
            // Wait for two frames at the same non-zero size. Fitting while the
            // container is still settling picks a zoom for the wrong viewport.
            if (y === 0 || !last || last.x !== x || last.y !== y) {
                last = { x, y };
                raf = requestAnimationFrame(fit);
                return;
            }
            const pad = Math.round(Math.min(40, x * 0.08));
            map.fitBounds(allPositions, { padding: [pad, pad] });
            fitted.current = true;
        };
        fit();
        return () => cancelAnimationFrame(raf);
    }, [map, allPositions]);
    return null;
}

export function FlyTo({ target }) {
    const map = useMap();
    useEffect(() => {
        if (target) map.flyTo(target, 14, { duration: 0.8 });
    }, [map, target]);
    return null;
}

export function MapResizer({ openRoute }) {
    const map = useMap();
    useEffect(() => {
        const t = setTimeout(() => map.invalidateSize(), 50);
        return () => clearTimeout(t);
    }, [map, openRoute]);
    return null;
}
