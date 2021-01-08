const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKCatalog: '.OLSKCatalog',
	
	OLSKCatalogDetail: '.OLSKCatalogDetail',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('OLSKCatalog_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKCatalog', function () {
		browser.assert.elements(OLSKCatalog, 1);
	});

	it('shows OLSKMasterList', function () {
		browser.assert.elements('.OLSKMasterList', 1);
	});

	it('hides OLSKMasterListItem', function () {
		browser.assert.elements('.OLSKMasterListItem', 0);
	});

	it('shows OLSKCatalogDetail', function () {
		browser.assert.elements(OLSKCatalogDetail, 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	describe('OLSKMasterList', function test_OLSKMasterList () {
		
		it('binds OLSKMasterListToolbarHead', function () {
			browser.assert.elements('.OLSKMasterListToolbar #TestOLSKMasterListToolbarHead', 1);
		});

		it('binds OLSKMasterListToolbarTail', function () {
			browser.assert.elements('.OLSKMasterListToolbar #TestOLSKMasterListToolbarTail', 1);
		});
		
		it('binds OLSKMasterListMain', function () {
			browser.assert.elements('.OLSKMasterListBody #TestOLSKMasterListMain', 1);
		});

		it('binds OLSKMasterListBodyTail', function () {
			browser.assert.elements('.OLSKMasterListBody #TestOLSKMasterListBodyTail', 1);
		});
	
	});

});
