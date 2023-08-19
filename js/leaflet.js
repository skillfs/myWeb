
var map = L.map('map').fitWorld();

L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    maxZoom: 20,
})
    .addTo(map);

var json_point = [
    {
        name: 'ตรอกบ้านจีน',
        lat: 16.8679048,
        lon: 99.1243427
    },
    {
        name: 'ถ้ำสีฟ้า',
        lat: 16.602382,
        lon: 98.7099285
    },
    {
        name: 'สะพานสมโภชกรุงรัตนโกสินทร์ 200 ปี',
        lat: 16.875246,
        lon: 99.1179002
    },
    {
        name: 'เขื่อนภูมิพล',
        lat: 17.2412081,
        lon: 98.9699229
    },
    {
        name: 'วัดดอยข่อยเขาแก้ว',
        lat: 16.8629099,
        lon: 99.114278
    },
    {
        name: 'น้ำตกลานสาง',
        lat: 16.7772977,
        lon: 98.9981534
    },
    {
        name: 'อุทยานแห่งชาติไม้กลายเป็นหิน',
        lat: 17.0693185,
        lon: 99.083656
    },
    {
        name: 'ศาลสมเด็จพระเจ้าตากสินมหาราช',
        lat: 16.8858119,
        lon: 99.1185854
    },
    {
        name: 'น้ำตกทีลอซู',

        lat: 15.9268499,
        lon: 98.7508192
    }
]

function onLocationFound(e) {
    console.log(e);

    L.marker(e.latlng).addTo(map)

    var center = [e.latlng.lng, e.latlng.lat];
    var radius = 5;
    var options = { steps: 90, units: 'kilometers', properties: { foo: 'bar' } };
    var circle = turf.circle(center, radius, options);
    var circle_ = L.geoJson(circle).addTo(map)

    var hospital_icon = L.icon({
        iconUrl: 'https://img.icons8.com/external-others-anggara-putra/452/external-online-online-healthcare-others-anggara-putra-121.png',
        iconSize: [35, 35],
    });
    json_point.forEach(f => {

        var from = turf.point([f.lon, f.lat]);
        var to = turf.point([e.latlng.lng, e.latlng.lat]);
        var distance = turf.distance(from, to);

        L.marker([f.lat, f.lon], { icon: hospital_icon })
            .bindPopup(' ชื่อสถานที่ท่องเที่ยว : ' + f.name + ' <br> ระยะทาง : ' + distance.toFixed(2) + ' กิโลเมตร <br><a target="_blank" href="https://www.google.co.th/maps/dir/' + e.latlng.lat + ',' + e.latlng.lng + '/' + f.lat + ',' + f.lon + '/"> นำทาง </a>')
            .addTo(map)
    });
}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({ setView: true, maxZoom: 10 });

