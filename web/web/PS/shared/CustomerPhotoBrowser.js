

 
Ext.define('ps.ImageView', {
    	extend: 'Ext.view.View',
    	alias: 'widget.ps-image-view',    
    	uses: 'Ext.data.Store',   
    	
	initComponent: function() {
		var me = this;
		
		me.store = me.getStore();
		
		var initConfig = {
			store: me.store,
			tpl: [
			// '<div class="details">',
			    '<tpl for=".">',
				'<div class="thumb-wrap">',
				    '<div class="thumb">',
				    (!Ext.isIE6? '<img style="width:140px; height:100px;" src="{imagePath}" />' : 
				    '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{imagePath}\')"></div>'),
				    '</div>',
				    '<span>{imageName}</span>',
				'</div>',
			    '</tpl>'
			// '</div>'
			],
			singleSelect: true,
			overItemCls: 'x-view-over',
			itemSelector: 'div.thumb-wrap',
			listeners: {
				scope: me,
				selectionchange: me.onIconSelect,
				itemdblclick: me.onIconDblClick
			}			
		};

		Ext.apply(me, initConfig);
		me.callParent(arguments);
		
		me.addEvents(    
		    'imageselected',
		    'imagedblclicked'
		);		
	
	},
	
	loadStoreData: function(month, year) {
		var me = this;
		me.store.getProxy().url = ps.customer.serverproxy.URL.IMAGE_DATA+'?property-name='+me.paramsArr.propertyName+'&month='+month+'&year='+year+'&user-email=' + me.paramsArr.userEmail;
		me.store.load();
	},
	
	onIconSelect: function(dataview, selections) {
		var me = this;
		var selectedImage = selections[0];
		
		if (selectedImage) {
		    me.fireEvent('imageselected', selectedImage);		    
		}	
	},
	
	onIconDblClick: function() {
		var me = this;
		var selectedImage = me.selModel.getSelection()[0];

		if (selectedImage) {
		    me.fireEvent('imagedblclicked', selectedImage);		    
		}	
	},
	
	getStore: function() {
		var me = this; 
		if(me.store) {
			return me.store;
		}
		
		Ext.define('ps.ImageViewModel', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'imageName'},
		         {name: 'uploadedTime'},
		         {name: 'imagePath'},
		         {name: 'userEmail'},
		         {name: 'propertyName'},
		         {name: 'latitude'},
		         {name: 'longitude'},
		         {name: 'timestamp'},
		         {name: 'datestamp'},
		         {name: 'monthAndYear'},
		         {name: 'referenceLat'},
		         {name: 'referenceLong'}
		     ]
		 });
		 
		var store = Ext.create('Ext.data.Store', {
		    model: 'ps.ImageViewModel',
		    autoLoad: false,
		    proxy: {
		    	type: 'rest',		    			    
		    	reader: {
		    		type: 'json',
		    		root: 'uploadedImageData'
		    	}
		    }
		});
		return store;
	}
});

Ext.define('ps.ImageInfoPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.ps-image-info-panel',
    
    initComponent: function() {
    	var me = this;
    	
    	var initConfig = {
	    width: 300,
	    minWidth: 300,
	    tpl: me.getTemplate()	    
    	};
    	
    	Ext.apply(me, initConfig);
    	me.callParent(arguments);
    },
    
    loadRecord: function(image) {
    	var me = this;
		me.body.hide();
		me.tpl.overwrite(me.body, image.data);
		me.body.slideIn('l', {
		    duration: 250
		});
    },    
    
    getTemplate: function() {
    	return [
		'<div class="details">',
		    '<tpl for=".">',
			    (!Ext.isIE6? '<img style="width:200px; height:200px;" src="{imagePath}" />' : 
			    '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{imagePath}\')"></div>'),
			'<div class="details-info">',
			    '<b>URL:</b>',
			    '<span><a href="{imagePath}" target="_blank">Click here to enlarge</a></span>',
			    '<b>Latitude:</b>',
			    '<span>{latitude}</span>',	
			    '<b>Reference Latitude:</b>',
			    '<span>{referenceLat}</span>',				    
			    '<b>Longitude:</b>',
			    '<span>{longitude}</span>',		
			    '<b>Reference Longitude:</b>',
			    '<span>{referenceLong}</span>',			    
			    '<b>GPS Timestamp:</b>',
			    '<span>{timestamp}</span>',			    
			'</div>',
		    '</tpl>',
		'</div>'
	    ];
    }
});
 

Ext.define('ps.ImageViewPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ps-image-view-panel',
	
	initComponent: function() {
		var me = this;
		
		var psImageView = Ext.widget('ps-image-view', {region: 'center', id: 'img-chooser-view', paramsArr: me.paramsArr});
		me.imageView = psImageView;
		
		var initConfig = {
			layout: 'fit',
			autoScroll: true,
			items: [psImageView]			
		};
		
		Ext.apply(me, initConfig);
		me.callParent(arguments);
	},
	
	getImageView: function() {
		var me = this;
		return me.imageView;
	}
});


Ext.define('ps.PropertyBrowserTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.ps-property-browser-tree',
	
	initComponent: function() {
		var me = this;
		
		var initConfig = {			
			width: 150,
			rootVisible: false,
			store: me.getStore()
		};
		
		Ext.apply(me, initConfig);
		me.callParent(arguments);
		
		me.populateStore();
	},
	
	populateStore: function() {
		var me = this;
		
		var successCallBack = function(response, opts) {
			var dates = Ext.JSON.decode(response.responseText);				
			var rootNode = me.getRootNode();
			Ext.Array.each(dates, function(dateObj, index, datesList) {
				var nodeName = dateObj.month + ', ' + dateObj.year;
				rootNode.appendChild({
					text: nodeName, 
					leaf: true,
					month: dateObj.month,
					year: dateObj.year
				});
			});			
		};
		
		var failureCallBack = function(response, opts) {
			alert('server-side failure with status code ' + response.status);
		};
		
		ps.shared.Utility.AJAX_FIRE_GET(
				ps.customer.serverproxy.URL.PHOTO_DATES + '?property-name=' + me.paramsArr.propertyName + '&user-email=' + me.paramsArr.userEmail,
				successCallBack,
				failureCallBack
		);
		
	},
	
	getStore: function() {
		var me = this;
		Ext.define('ps.PhotoBrowserTreeModel', {
		    extend: 'Ext.data.Model',
		    fields: [
		             {
		            	 name: 'month',
		            	 convert: function(val, rec) {
		            		 if(val === 'Jan') {
		            			 return '1';
		            		 }
		            		 else if(val === 'Feb') {
		            			 return '2';
		            		 }
		            		 else if(val === 'Mar') {
		            			 return '3';
		            		 }		            		 
		            		 else if(val === 'Apr') {
		            			 return '4';
		            		 }		            		 
		            		 else if(val === 'May') {
		            			 return '5';
		            		 }		            		 
		            		 else if(val === 'Jun') {
		            			 return '6';
		            		 }		            		 
		            		 else if(val === 'Jul') {
		            			 return '7';
		            		 }		            		 
		            		 else if(val === 'Aug') {
		            			 return '8';
		            		 }		            		 
		            		 else if(val === 'Sep') {
		            			 return '9';
		            		 }		            		 
		            		 else if(val === 'Oct') {
		            			 return '10';
		            		 }		            		 
		            		 else if(val === 'Nov') {
		            			 return '11';
		            		 }		            		 
		            		 else if(val === 'Dec') {
		            			 return '12';
		            		 }		            		 
		            		 else {
		            			 return val;
		            		 }
		            	 }
		             }
		             , 'year', 'text', 'leaf']
		});
		
		var store = Ext.create('Ext.data.TreeStore', {
		    model: 'ps.PhotoBrowserTreeModel',
		    root: {
		    	expanded: true,
		    	children: []
		    }
		});				
		
		return store;
	}
});


Ext.define('ps.PropertyBrowser', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ps-property-browser',
	
	initComponent: function() {
		var me = this;
		
		var psPropertyBrowserTree = Ext.widget('ps-property-browser-tree', {region: 'west', paramsArr: me.paramsArr});
		var psImageViewInfoPanel = Ext.widget('ps-image-info-panel', {region: 'east', id: 'img-chooser-dlg'});
		
		var onImageSelected = function(selectedImage) {
			psImageViewInfoPanel.loadRecord(selectedImage);
		};
		
		var onImageDblclicked = function(selectedImage) {
		
		};
		
		var psImageViewPanel = Ext.widget('ps-image-view-panel', {region: 'center', paramsArr: me.paramsArr});
		
		psImageViewPanel.getImageView().on('imageselected', onImageSelected, me);
		psImageViewPanel.getImageView().on('imagedblclicked', onImageDblclicked, me);
		
		psPropertyBrowserTree.on('select', function(rowModel, model, index, opts) {
			var imageView = psImageViewPanel.getImageView();
			imageView.loadStoreData(model.get('month'), model.get('year'));			
		});
		
	
		var initConfig = {
			layout: 'border',				
			items: [
				psPropertyBrowserTree,
				psImageViewPanel,
				psImageViewInfoPanel			
			]
		};
		
		Ext.apply(me, initConfig);
		me.callParent(arguments);
	}
	
});


