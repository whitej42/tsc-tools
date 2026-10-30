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
        const fit = () => {
            map.invalidateSize();
            if (map.getSize().y === 0) {
                raf = requestAnimationFrame(fit);
                return;
            }
            map.fitBounds(allPositions, { padding: [40, 40] });
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
