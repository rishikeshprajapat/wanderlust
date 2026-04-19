

if (typeof coordinates !== "undefined" && coordinates.length === 2) {

    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coordinates,
        zoom: 9
    });

    map.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker({ color: 'red' })
        .setLngLat(coordinates)
        .addTo(map);
}