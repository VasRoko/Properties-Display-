import template from '../templates/PropertyMapView.html'
import GoogleMapsLoader from 'google-maps';
import $ from 'jquery';

const PropertyMapView = template({
  props:['filteredProperties'],
  template: template,   
  

    methods: 
    {
        drawMap: function(properties) 
        {

            
            GoogleMapsLoader.KEY = 'AIzaSyDbI1VmyesNAIVvjs1xJn3vv0gJBsmAGFY';        

            // console.log('map ' + properties);
            
            GoogleMapsLoader.load(function(google) {

            function initMap() 
                {
                    var map;
                    var bounds = new google.maps.LatLngBounds();
                    var mapOptions = {
                        mapTypeId: 'roadmap'
                    };

                // Display a map on the web page
                map = new google.maps.Map(document.getElementById("map"), mapOptions);
                map.setTilt(100);

                var infoWindow = new google.maps.InfoWindow({
                    disableAutoPan: true
                }), marker;      
                var position;

                if(properties.length == 0)
                {
                    $('.no_properties').show();   
                } else {
                    $('.no_properties').hide();   
                    properties.forEach(function(property) {
                
                    position = new google.maps.LatLng(property.google_lat, property.google_lon);

                    bounds.extend(position);

                    var pinImage;
            
                    switch(property.status) 
                    {
                        case 'For Sale':
                            pinImage = new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/icons/green-dot.png");
                            break;

                        case 'Sale Agreed':
                            pinImage = new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/icons/yellow-dot.png");
                            break;

                        case 'Sold':
                            pinImage = new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
                            break;

                        default:
                            pinImage = new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
                    }

                    marker = new google.maps.Marker({
                        position: position,
                        icon: pinImage,
                        map: map,
                        title: property.title
                    });

                    //   Add info window to marker    
                    google.maps.event.addListener(marker, 'click', (function(marker, property) {

                                // Info window content
                            var infoWindowContent = '<div class="info_content">' +
                                '<h3>' + property.title + '</h3>' +
                                '<p>Price: (£) ' + property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</p>' + 
                                '<p>Location: ' + property.location + '</p>' + 
                                '<p> Plots: ' + property.plots + '</p>' + 
                                '<div class="infoContentImageHolder" style="background-image: url(/property_images/' + property.id + '/' + property.id + '.jpg)" >' + 
                                    '<a href="/land/' + property.id + '/" class="btn single-property-btn">Details</a> ' +
                                '</div>' + 

                                '</div>';

                        return function() {
                            infoWindow.setContent(infoWindowContent);
                            infoWindow.open(map, marker);
                        }
                    })(marker, property));
            
                    // Center the map to fit all markers on the screen
                    map.fitBounds(bounds);

                    });
                }
                
                // Set zoom level
                var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
                    if(properties.length <= 1){
                        this.setZoom(12);
                    }
                    google.maps.event.removeListener(boundsListener);
                });
            }
            // google.maps.event.addDomListener(window, 'load', initMap);
            initMap();

            });      
        }
    },

    watch: 
    { 
        filteredProperties: function(newVal) 
        { 
            this.drawMap(newVal);
        }
    },  
    
    created()
    {
        this.drawMap(this.filteredProperties);
    }
})

export default PropertyMapView;