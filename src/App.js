import React, { useState, useEffect } from "react";
import "./App.css";
import Flat from "./components/flat";
import Marker from "./components/marker";
import axios from "axios";
import GoogleMapReact from "google-map-react";

const App = () => {
  const [flats, setFlats] = useState([]);
  const [sortedFlats, setSortedFlats] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json"
      )
      .then(res => {
        setFlats(res.data);
        setSortedFlats(res.data);
      });
  }, []);
  const [center, setCenter] = useState({
    lat: 48.8566,
    lng: 2.3522
  });
  const [search, setSearch] = useState("");
  const [selectedFlat, setSelectedFlat] = useState(null);

  const selectFlat = flat => {
    setSelectedFlat(flat);
    setCenter({ lat: flat.lat, lng: flat.lng });
  };

  const handleSearch = e => {
    setSearch(e.target.value);
    setSortedFlats(
      flats.filter(flat => new RegExp(e.target.value, "i").exec(flat.name))
    );
  };

  return (
    <div className="app">
      {" "}
      <div className="main">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => handleSearch(e)}
          />
        </div>
        <div className="flats">
          {sortedFlats.map(flat => {
            return <Flat key={flat.name} flat={flat} handler={selectFlat} />;
          })}
        </div>
      </div>
      <div className="map">
        <GoogleMapReact center={center} zoom={14}>
          {sortedFlats.map(flat => {
            return (
              <Marker
                key={flat.name}
                lat={flat.lat}
                lng={flat.lng}
                text={flat.price}
                selected={flat === selectedFlat}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default App;
