const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKCatalog: '.OLSKCatalog',
	
	OLSKCatalogDetail: '.OLSKCatalogDetail',
	OLSKCatalogDetailContent: '[slot="OLSKCatalogDetailContent"]',
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

	it('hides OLSKCollectionItem', function () {
		browser.assert.elements('.OLSKCollectionItem', 0);
	});

	it('shows OLSKCatalogDetail', function () {
		browser.assert.elements(OLSKCatalogDetail, 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('hides OLSKCatalogDetailContent', function () {
		browser.assert.elements(OLSKCatalogDetailContent, 0);
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

	context('ItemCreate', function test_ItemCreate() {

		before(function () {
			return browser.pressButton('.TestItemCreateButton');
		});

		it('shows OLSKCollectionItem', function () {
			browser.assert.elements('.OLSKCollectionItem', 1);
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows OLSKCatalogDetailContent', function () {
			browser.assert.elements(OLSKCatalogDetailContent, 1);
		});

	});

	context('ItemDiscard', function test_ItemDiscard() {

		before(function () {
			return browser.pressButton('.TestItemDiscardButton');
		});

		it('hides OLSKCollectionItem', function () {
			browser.assert.elements('.OLSKCollectionItem', 0);
		});

		it('shows OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 1);
		});

		it('hides OLSKCatalogDetailContent', function () {
			browser.assert.elements(OLSKCatalogDetailContent, 0);
		});

	});

	context('ItemSelect', function test_ItemSelect() {

		before(function () {
			return browser.pressButton('.TestItemCreateButton');
		});

		before(function () {
			return browser.pressButton('.TestItemCreateButton');
		});

		before(function () {
			return browser.pressButton('.TestItemDiscardButton');
		});

		before(function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 1);
		});

		before(function () {
			browser.assert.elements(OLSKCatalogDetailContent, 0);
		});

		before(function () {
			return browser.click('.OLSKResultsListItem');
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows OLSKCatalogDetailContent', function () {
			browser.assert.elements(OLSKCatalogDetailContent, 1);
		});		

		context('escape', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('shows OLSKDetailPlaceholder', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});

			it('hides OLSKCatalogDetailContent', function () {
				browser.assert.elements(OLSKCatalogDetailContent, 0);
			});	

		});

	});

	context('OLSKCatalogItems', function test_OLSKCatalogItems() {

		const item = Date.now() % 10;

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKCatalogItems: JSON.stringify(Array.from(Array(item)).map(function () {
					return {
						XYZItemBlurb: '',
					};
				})),
			});
		});

		it('shows OLSKCollectionItem', function () {
			browser.assert.elements('.OLSKCollectionItem', item);
		});

	});

});
