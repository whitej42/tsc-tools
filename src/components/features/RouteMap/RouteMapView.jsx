import { MapContainer, TileLayer, CircleMarker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FitBounds, FlyTo, MapResizer } from './MapHelpers';
import { toLatLng, dlcPacksHtml } from './routeData';

export default function RouteMapView({ routes, flyTarget, openRoute }) {
    const allPositions = routes.flatMap(r => [
        ...r.mainLine.map(toLatLng),
        ...r.branches.flatMap(b => b.stations.map(toLatLng)),
    ]);
    const firstPos = allPositions[0] ?? [51.5, -0.1];

    return (
        <MapContainer
            center={firstPos}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds allPositions={allPositions} />
            <MapResizer openRoute={openRoute} />
            {flyTarget && <FlyTo target={flyTarget} />}

            {routes.map(route => (
                <Polyline
                    key={`${route.id}-main`}
                    positions={route.mainLine.map(toLatLng)}
                    pathOptions={{ color: route.color, weight: 4, opacity: 0.85 }}
                    eventHandlers={{
                        click(e) {
                            e.target
                                .bindPopup(
                                    `<div style="min-width:180px">
                                        <p style="font-weight:700;font-size:14px;margin:0 0 4px">${route.name}</p>
                                        <p style="font-size:11px;color:#888;margin:0">${route.mainLine.length} stations</p>
                                        ${dlcPacksHtml(route.dlcPacks)}
                                    </div>`
                                )
                                .openPopup(e.latlng);
                        },
                    }}
                />
            ))}

            {routes.flatMap(route =>
                route.branches.map(branch => (
                    <Polyline
                        key={`${route.id}-${branch.name}`}
                        positions={branch.junction
                            ? [toLatLng(branch.junction), ...branch.stations.map(toLatLng)]
                            : branch.stations.map(toLatLng)}
                        pathOptions={{ color: branch.color, weight: 4, opacity: 0.85 }}
                        eventHandlers={{
                            click(e) {
                                e.target
                                    .bindPopup(
                                        `<div style="min-width:180px">
                                            <p style="font-weight:700;font-size:14px;margin:0 0 4px">${branch.name}</p>
                                            <p style="font-size:12px;color:#555;margin:0 0 4px">Branch of ${route.name}</p>
                                            ${branch.junction ? `<p style="font-size:11px;color:#888;margin:0 0 2px">Junction: ${branch.junction.stationName}</p>` : ''}
                                            ${dlcPacksHtml(route.dlcPacks)}
                                        </div>`
                                    )
                                    .openPopup(e.latlng);
                            },
                        }}
                    />
                ))
            )}

            {routes.map(route =>
                route.mainLine.map((station, i) => (
                    <CircleMarker
                        key={`${route.id}-main-${i}`}
                        center={toLatLng(station)}
                        radius={5}
                        pathOptions={{ color: route.color, fillColor: '#ffffff', fillOpacity: 1, weight: 2 }}
                    >
                        <Popup>
                            <span style={{ fontWeight: 600, fontSize: 13 }}>{station.stationName}</span>
                            <br />
                            <span style={{ fontSize: 11, color: '#666' }}>{route.name}</span>
                        </Popup>
                    </CircleMarker>
                ))
            )}

            {routes.flatMap(route =>
                route.branches.flatMap(branch =>
                    branch.stations.map((station, i) => (
                        <CircleMarker
                            key={`${route.id}-${branch.name}-${i}`}
                            center={toLatLng(station)}
                            radius={4}
                            pathOptions={{ color: branch.color, fillColor: '#ffffff', fillOpacity: 1, weight: 2 }}
                        >
                            <Popup>
                                <span style={{ fontWeight: 600, fontSize: 13 }}>{station.stationName}</span>
                                <br />
                                <span style={{ fontSize: 11, color: '#666' }}>{branch.name}</span>
                            </Popup>
                        </CircleMarker>
                    ))
                )
            )}
        </MapContainer>
    );
}
