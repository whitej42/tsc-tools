import { toLatLng } from './routeData';

export default function RouteSidebar({ routes, openRoute, onToggleRoute, onFlyTo }) {
    return (
        <div className="w-72 flex-shrink-0 flex flex-col bg-white dark:bg-surface-dark border-l border-gray-200 dark:border-surface-dark-border overflow-y-auto">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-surface-dark-border flex-shrink-0">
                <p className="font-rail font-bold text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Routes
                </p>
            </div>

            {routes.map(route => (
                <div key={route.id} className="border-b border-gray-100 dark:border-surface-dark-border">
                    <button
                        onClick={() => onToggleRoute(route.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: route.color }} />
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-rail-navy dark:text-white truncate">{route.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {route.mainLine.length} stations
                                {route.branches.length > 0 && ` · ${route.branches.length} branch${route.branches.length > 1 ? 'es' : ''}`}
                            </p>
                        </div>
                        <svg
                            className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${openRoute === route.id ? 'rotate-180' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {openRoute === route.id && (
                        <div className="pb-2">
                            {route.dlcPacks.length > 0 && (
                                <div className="px-4 py-2 mb-1 border-b border-gray-100 dark:border-surface-dark-border">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">DLC</p>
                                    {route.dlcPacks.map(pack => (
                                        <a
                                            key={pack.id}
                                            href={pack.store_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block text-xs text-blue-600 dark:text-blue-400 hover:underline truncate"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {pack.name}
                                        </a>
                                    ))}
                                </div>
                            )}

                            <ul>
                                {route.mainLine.map((station, i) => (
                                    <li key={i}>
                                        <button
                                            onClick={() => onFlyTo(toLatLng(station))}
                                            className="w-full flex items-center gap-3 px-4 py-1.5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: route.color }} />
                                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-rail-navy dark:group-hover:text-white transition-colors">
                                                {station.stationName}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {route.branches.map(branch => (
                                <div key={branch.name} className="mt-1">
                                    <div className="flex items-center gap-2 px-4 py-1.5">
                                        <svg className="w-3 h-3 flex-shrink-0" style={{ color: route.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 truncate">
                                            {branch.name}
                                        </span>
                                    </div>
                                    <ul>
                                        {branch.stations.map((station, i) => (
                                            <li key={i}>
                                                <button
                                                    onClick={() => onFlyTo(toLatLng(station))}
                                                    className="w-full flex items-center gap-3 pl-8 pr-4 py-1.5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-sm flex-shrink-0 opacity-70" style={{ backgroundColor: route.color }} />
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-rail-navy dark:group-hover:text-white transition-colors">
                                                        {station.stationName}
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
