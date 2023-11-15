import styled from "@emotion/styled";
import L from "leaflet";
import marketIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import marketShadow from "leaflet/dist/images/marker-shadow.png";
import React from "react";
import { MapContainer as BaseMapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: marketIcon.src,
  iconRetinaUrl: marketIcon2x.src,
  shadowUrl: marketShadow.src,
});

interface Props {
  center?: number[];
}

const Map = ({ center }: Props): React.ReactNode => (
  <MapContainer center={(center as L.LatLngExpression) ?? [51, -0.09]} zoom={center ? 4 : 2} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {center && <Marker position={center as L.LatLngExpression} />}
  </MapContainer>
);

const MapContainer = styled(BaseMapContainer)`
  height: 35vh;
  border-radius: 8px;
`;

export default Map;
