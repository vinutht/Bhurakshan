
Ext.define('ps.LocationMap', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ps-location-map',
	
	initComponent: function() {
		var me = this;
		var initConfig = {				
				items: me.getGoogleMap()
		};
		
		Ext.apply(me, initConfig);
		me.callParent(arguments);
	},

	getGoogleMap: function() {
		return {
            xtype: 'gmappanel',
            center: {                
            	//geoCodeAddr: 'Basaveswaranagar, Bangalore, Karnataka, 560079, India',                
            	marker: {
            		title: 'Basaveshwaranagar',
                    lat: 12.99756,              
                    lng: 77.54054            			
            	}
            }/*,
            markers: [{	                
            	lat: 12.99756,              
            	lng: 77.54054,                
            	title: 'Tango Center, Basaveshwaranagar',
                listeners: {
                    click: function(e){
                        Ext.Msg.alert('It\'s tango time.');
                    }
                }
            }]*/
        };
	}
});