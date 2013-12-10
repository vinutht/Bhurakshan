/**
 * @class Ext.ux.GMapPanel
 * @extends Ext.Panel
 * @author Shea Frederick
 */
Ext.define('Ext.ux.GMapPanel', {
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.gmappanel',
    
    requires: ['Ext.window.MessageBox'],
    
    initComponent : function(){
        Ext.applyIf(this,{
            plain: true,
            gmapType: 'map',
            border: false
        });
        this.customMarkerSet = false;
        this.callParent();        
    },
    
    afterFirstLayout : function(){
        var center = this.center;
        this.callParent();       
        
        if (center) {
            if (center.geoCodeAddr) {
                this.lookupCode(center.geoCodeAddr, center.marker);
            } else {
                this.createMap(center);
            }
        } else {
            Ext.Error.raise('center is required');
        }
              
    },
    
    deleteOverlays: function() {
    	var me = this;
    	if(me.customMarker) {
    		me.customMarker.setMap(null);
    		delete me.customMarker;
    	}
    	if(me.infoWindow) {
    		me.infoWindow.close();
    	}
    },
    
    placeMarker: function(location) {
    	var me = this;
        // first remove all markers if there are any
        me.deleteOverlays();

        me.customMarker = new google.maps.Marker({
            position: location, 
            map: me.gmap
        });   
        
        var infowindow = new google.maps.InfoWindow({
            content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
        });
        infowindow.open(me.gmap, me.customMarker);   
        
        me.infoWindow = infowindow;
    },
    
    setCustomPosition: function(position)
    {
    	var me = this;
    	me.customPosition = position;
    	if(this.gmap && !me.customMarkerSet) {
    		me.goToCustomMarker(position.latitude, position.longitude);
    		me.customMarkerSet = true;
    	}
    },
    
    goToCustomMarker: function(lat, longi) {
    	var me = this;
    	var newPosition = new google.maps.LatLng(lat, longi);
    	
    	var marker = new google.maps.Marker({
    		position: newPosition,
    		map: this.gmap,
    	});    	
    	
    	this.gmap.panTo(marker.getPosition());
    	me.customMarker = marker;
    },
    
    
    createMap: function(center, marker) {
    	var me = this;
        options = Ext.apply({}, this.mapOptions);
        options = Ext.applyIf(options, {
            zoom: 14,
            center: center,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });
        this.gmap = new google.maps.Map(this.body.dom, options);
        
        google.maps.event.addListener(this.gmap, "click", function(event)
                {
                    // place a marker
                    me.placeMarker(event.latLng);

                    // display the lat/lng in your form's lat/lng fields
                    /*document.getElementById("latFld").value = event.latLng.lat();
                    document.getElementById("lngFld").value = event.latLng.lng();*/
                });        
        
        if (marker) {
            this.addMarker(Ext.applyIf(marker, {
                position: center
            }));
        }
        
        Ext.each(this.markers, this.addMarker, this);
        
        if(me.customPosition && !me.customMarkerSet) {
        	me.goToCustomMarker(me.customPosition.latitude, me.customPosition.longitude);
        	me.customMarkerSet = true;
        }
    },
    
    getCustomMarkerPosition: function() {
    	var me = this;
    	if(me.customMarker) {
    		return me.customMarker.getPosition();
    	}
    },
    
    addMarker: function(marker) {
        marker = Ext.apply({
            map: this.gmap
        }, marker);
        
        if (!marker.position) {
            marker.position = new google.maps.LatLng(marker.lat, marker.lng);
        }
        var o =  new google.maps.Marker(marker);
        Ext.Object.each(marker.listeners, function(name, fn){
            google.maps.event.addListener(o, name, fn);    
        });
        return o;
    },
    
    lookupCode : function(addr, marker) {
        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({
            address: addr
        }, Ext.Function.bind(this.onLookupComplete, this, [marker], true));
    },
    
    onLookupComplete: function(data, response, marker){
        if (response != 'OK') {
            Ext.MessageBox.alert('Error', 'An error occured: "' + response + '"');
            return;
        }
        this.createMap(data[0].geometry.location, marker);
    },
    
    afterComponentLayout : function(w, h){
        this.callParent(arguments);
        //Ext.container.AbstractContainer.superclass.afterComponentLayout.call(this);
        this.redraw();
    },
    
    redraw: function(){
        var map = this.gmap;
        if (map) {
            google.maps.event.trigger(map, 'resize');
        }
    }
 
});
