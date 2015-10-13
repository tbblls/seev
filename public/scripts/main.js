require.config({
        paths:{
            jquery: 'lib/jquery-2.1.4',
            ember: 'lib/ember.debug',
            etc: 'lib/ember-template-compiler',
        },

	    shim: {
	        app: {
	            deps: ['jquery','ember','etc'],
	            exports: 'Ember'
	        }
	    }
});
require(['app/app']);