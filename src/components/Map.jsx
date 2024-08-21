import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import useCities from "../utils/useCities";
import { useEffect, useState } from "react";
import useGeolocation from "../utils/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../utils/useUrlPosition";

function Map() {
  const { cities, mapPosition, setMapPosition } = useCities();
  const [lat, lng] = useUrlPosition();
  // 用于处理和访问 URL 查询参数（即 URL 中 ? 后的部分）
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  // 这个状态只在这个组件内使用，不需要放在context里，否则每次mapZoom的更新都会导致使用到context的组件全部重新渲染
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    if (lat !== null && lng !== null) {
      setMapPosition([lat, lng]);
      setMapZoom(10);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      setMapZoom(10);
    }
  }, [geolocationPosition]);

  // Leeflet自带的函数定义方式
  function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    map.setZoom(mapZoom);

    return null;
  }

  function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
      click: (e) => {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      },
    });
  }

  // use React Leaflet for free map service
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        scrollWheelZoom={true}
        zoom={mapZoom}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.cityName}</span>
                <span>{city.country}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;

