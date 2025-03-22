import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 13, { animate: true });
    }, [center, map]);
    return null;
};

const StoreLocator = () => {
    const [stores, setStores] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredStores, setFilteredStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [mapCenter, setMapCenter] = useState([21.0285, 105.8542]);

    useEffect(() => {
        fetch("http://localhost:3000/stores/api")
            .then((response) => response.json())
            .then((data) => {
                setStores(data);
                setFilteredStores(data);
            });
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = stores.filter((store) =>
            store.address.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredStores(filtered);
    };

    const handleSelectStore = (store) => {
        setSelectedStore(store);
        setMapCenter([store.location.lat, store.location.lng]);
    };

    return (
        <div className="px-10 shadow-sm">
            <div className="w-100 flex justify-center my-5">
                <input
                    type="text"
                    placeholder="Tìm cửa hàng..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex w-full h-full -z-10">
                <div className="w-2/3 h-full -z-0">
                    <MapContainer
                        center={mapCenter}
                        zoom={13}
                        className="w-full"
                        style={{ height: "400px", pointerEvents: "auto" }}
                        scrollWheelZoom={true}
                    >

                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapUpdater center={mapCenter} />
                        {selectedStore && (
                            <Marker position={[selectedStore.location.lat, selectedStore.location.lng]}>
                                <Popup>
                                    {selectedStore.name} <br /> {selectedStore.address}
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>
                <div className="p-4 bg-white shadow-lg overflow-y-auto w-1/3" style={{ height: "400px" }}>
                    <p className="font-semibold mb-2">{filteredStores.length} cửa hàng được tìm thấy</p>
                    <ul className="space-y-2">
                        {filteredStores.map((store) => (
                            <li key={store.name} className="p-2 border rounded-lg shadow-lg">
                                <p className="fw-bold fs-5">{store.name}</p>
                                <p>Address: <span className="fw-bold">{store.address}</span></p>
                                <p>Open at : <span className="fw-bold">{store.openingHours}</span></p>
                                <p>Close at : <span className="fw-bold">{store.closingHours}</span></p>
                                <button
                                    onClick={() => handleSelectStore(store)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                                >
                                    Xem trên bản đồ
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StoreLocator;
