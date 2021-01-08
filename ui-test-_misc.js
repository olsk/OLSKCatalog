const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
		});
	});

	describe('OLSKCatalogDetail', function test_OLSKCatalogDetail () {

		it('classes OLSKViewportDetail', function () {
			browser.assert.hasClass(OLSKCatalogDetail, 'OLSKViewportDetail');
		});
		
	});

});
