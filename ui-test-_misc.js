const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
		});
	});

	describe('OLSKMasterList', function test_OLSKMasterList () {
		
		it('binds OLSKMasterListToolbarHead', function () {
			browser.assert.text('.OLSKMasterListToolbar #TestOLSKMasterListToolbarHead', 'TestOLSKMasterListToolbarHead');
		});

		it('binds OLSKMasterListToolbarTail', function () {
			browser.assert.text('.OLSKMasterListToolbar #TestOLSKMasterListToolbarTail', 'TestOLSKMasterListToolbarTail');
		});
		
		it('binds OLSKMasterListMain', function () {
			browser.assert.text('.OLSKMasterListBody #TestOLSKMasterListMain', 'TestOLSKMasterListMain');
		});

		it('binds OLSKMasterListBodyTail', function () {
			browser.assert.text('.OLSKMasterListBody #TestOLSKMasterListBodyTail', 'TestOLSKMasterListBodyTail');
		});
	
	});

});
