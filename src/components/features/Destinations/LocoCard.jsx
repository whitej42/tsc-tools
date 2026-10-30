import { FaStar, FaRegStar, FaChevronRight } from "react-icons/fa";
import tocData from '../../../data/toc.json';

// Build lookup from toc.json: id → { color, label }
const tocLookup = new Map(tocData.map(t => [t.id, { color: t.brand_color, label: t.label }]));

// Pseudo-operators not represented in toc.json
const EXTRA = {
    'multiple': { color: '#6b7280', label: 'Multiple' },
    'rr':       { color: '#003399', label: 'RR' },
    'white':    { color: '#9ca3af', label: 'White' },
};

export function getOperatorStyle(name) {
    const key = name.toLowerCase();
    const m = tocLookup.get(key) ?? EXTRA[key];
    return m
        ? { color: m.color, textColor: '#fff', label: m.label }
        : { color: '#6b7280', textColor: '#fff', label: name.toUpperCase() };
}

export const PUBLISHER_CONFIG = {
    'Armstrong Powerhouse': { color: '#C8102E', label: 'AP' },
    'Dovetail':             { color: '#1D6FA4', label: 'Dovetail' },
    'Thomson Interactive':  { color: '#7B2D8B', label: 'Thomson' },
    'Just Trains':          { color: '#2D7D3A', label: 'Just Trains' },
};

export function getPublisher(name) {
    return PUBLISHER_CONFIG[name] || { color: '#6B7280', label: 'Unknown' };
}

function LocoCard({ loco, isFavourite, onToggleFavourite, onSelect, isSelected, showOperators = true }) {
    const pub = getPublisher(loco.publisher);
    const variants = loco.trainVariants ?? [];
    const allOperators = [...new Set(variants.map(v => v.operatorKey))].sort();
    const destCount = variants.reduce((acc, v) => acc + (v.displays ?? []).length, 0);

    return (
        <div
            onClick={() => onSelect(loco)}
            className={`group relative flex flex-col bg-white dark:bg-surface-dark-card rounded-card border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                isSelected
                    ? 'border-gray-400 dark:border-gray-500 shadow-card-hover dark:shadow-dark-card-hover'
                    : 'border-gray-200 dark:border-surface-dark-border shadow-card dark:shadow-dark-card hover:shadow-card-hover dark:hover:shadow-dark-card-hover'
            }`}
        >
            {/* Header row */}
            <div className="flex items-start justify-between px-4 pt-3 pb-1 gap-2">
                <span
                    className="shrink-0 text-xs font-bold tracking-rail uppercase rounded-rail px-2 py-0.5 text-white"
                    style={{ backgroundColor: pub.color }}
                >
                    {pub.label}
                </span>

                <button
                    onClick={(e) => { e.stopPropagation(); onToggleFavourite(loco.key); }}
                    aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                    className="shrink-0 -mt-1 -mr-1 w-10 h-10 flex items-center justify-center rounded-rail hover:bg-gray-100 dark:hover:bg-surface-dark-alt transition-colors text-xl"
                >
                    {isFavourite
                        ? <FaStar style={{ color: '#F5A623' }} />
                        : <FaRegStar className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400" />
                    }
                </button>
            </div>

            {/* Loco name */}
            <div className="px-4 pb-2 flex-1">
                <h3 className="font-rail font-bold text-base leading-snug text-gray-900 dark:text-white">
                    {loco.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {destCount} destination{destCount !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Operator tags */}
            {showOperators && allOperators.length > 0 && (
                <div className="px-4 pb-3 flex flex-wrap gap-1">
                    {allOperators.slice(0, 4).map(op => {
                        const style = getOperatorStyle(op);
                        return (
                            <span
                                key={op}
                                title={op.replace(/_/g, ' ')}
                                className="text-[10px] font-bold tracking-rail uppercase rounded-rail px-1.5 py-0.5"
                                style={{ backgroundColor: style.color, color: style.textColor }}
                            >
                                {style.label}
                            </span>
                        );
                    })}
                    {allOperators.length > 4 && (
                        <span className="text-[10px] font-bold tracking-rail uppercase rounded-rail px-1.5 py-0.5 bg-gray-100 dark:bg-surface-dark-alt text-gray-500 dark:text-gray-400">
                            +{allOperators.length - 4}
                        </span>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end px-4 pb-3">
                <span className="flex items-center gap-1 text-sm font-semibold transition-colors text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    View codes <FaChevronRight className="text-xs" />
                </span>
            </div>
        </div>
    );
}

export default LocoCard;
