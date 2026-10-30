import { useState } from 'react';
import routesData from '../../../data/routes/routes.json';
import { buildRouteData } from './routeData';
import RouteMapView from './RouteMapView';
import RouteSidebar from './RouteSidebar';

const routes = routesData.map(buildRouteData);

export default function RouteMap() {
    const [flyTarget, setFlyTarget] = useState(null);
    const [openRoute, setOpenRoute] = useState(null);

    function handleToggleRoute(id) {
        setOpenRoute(prev => (prev === id ? null : id));
    }

    return (
        <div className="flex h-full">
            <div className="flex-1 min-w-0 min-h-0">
                <RouteMapView
                    routes={routes}
                    flyTarget={flyTarget}
                    openRoute={openRoute}
                />
            </div>
            <RouteSidebar
                routes={routes}
                openRoute={openRoute}
                onToggleRoute={handleToggleRoute}
                onFlyTo={setFlyTarget}
            />
        </div>
    );
}
