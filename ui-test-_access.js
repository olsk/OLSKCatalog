const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKCatalog: '.OLSKCatalog',
	
	OLSKCatalogStashDoneButton: '.OLSKCatalogStashDoneButton',
	
	OLSKCatalogMasterPlaceholder: '.OLSKCatalog .OLSKNarrow .OLSKPlaceholder',

	OLSKCatalogDetail: '.OLSKCatalogDetail',
	OLSKCatalogDetailPlaceholder: '.OLSKCatalogDetail .OLSKPlaceholder',
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

	it('hides OLSKCatalogStashDoneButton', function () {
		browser.assert.elements(OLSKCatalogStashDoneButton, 0);
	});

	it('shows OLSKNarrow', function () {
		browser.assert.elements('.OLSKNarrow', 1);
	});

	it('hides OLSKCollectionItem', function () {
		browser.assert.elements('.OLSKCollectionItem', 0);
	});

	it('shows OLSKCatalogMasterPlaceholder', function () {
		browser.assert.elements(OLSKCatalogMasterPlaceholder, 1);
	});

	it('shows OLSKCatalogDetail', function () {
		browser.assert.elements(OLSKCatalogDetail, 1);
	});

	it('shows OLSKCatalogDetailPlaceholder', function () {
		browser.assert.elements(OLSKCatalogDetailPlaceholder, 1);
	});

	it('hides OLSKCatalogDetailContent', function () {
		browser.assert.elements(OLSKCatalogDetailContent, 0);
	});

	describe('OLSKNarrow', function test_OLSKNarrow () {
		
		it('binds OLSKNarrowToolbarHead', function () {
			browser.assert.elements('.OLSKNarrowToolbar #TestOLSKNarrowToolbarHead', 1);
		});

		it('binds OLSKNarrowToolbarTail', function () {
			browser.assert.elements('.OLSKNarrowToolbar #TestOLSKNarrowToolbarTail', 1);
		});
		
		it('binds OLSKNarrowMain', function () {
			browser.assert.elements('.OLSKNarrowBody #TestOLSKNarrowMain', 1);
		});

		it('binds OLSKNarrowBodyTail', function () {
			browser.assert.elements('.OLSKNarrowBody #TestOLSKNarrowBodyTail', 1);
		});
	
	});

	context('ItemCreate', function test_ItemCreate() {

		before(function () {
			return browser.pressButton('.TestItemCreateButton');
		});

		it('shows OLSKCollectionItem', function () {
			browser.assert.elements('.OLSKCollectionItem', 1);
		});

		it('hides OLSKCatalogMasterPlaceholder', function () {
			browser.assert.elements(OLSKCatalogMasterPlaceholder, 0);
		});

		it('hides OLSKCatalogDetailPlaceholder', function () {
			browser.assert.elements(OLSKCatalogDetailPlaceholder, 0);
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

		it('shows OLSKCatalogMasterPlaceholder', function () {
			browser.assert.elements(OLSKCatalogMasterPlaceholder, 1);
		});

		it('shows OLSKCatalogDetailPlaceholder', function () {
			browser.assert.elements(OLSKCatalogDetailPlaceholder, 1);
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
			browser.assert.elements(OLSKCatalogDetailPlaceholder, 1);
		});

		before(function () {
			browser.assert.elements(OLSKCatalogDetailContent, 0);
		});

		before(function () {
			return browser.click('.OLSKCollectionItem');
		});

		it('hides OLSKCatalogDetailPlaceholder', function () {
			browser.assert.elements(OLSKCatalogDetailPlaceholder, 0);
		});

		it('shows OLSKCatalogDetailContent', function () {
			browser.assert.elements(OLSKCatalogDetailContent, 1);
		});		

		context('escape', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('shows OLSKCatalogDetailPlaceholder', function () {
				browser.assert.elements(OLSKCatalogDetailPlaceholder, 1);
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

		it('hides OLSKCatalogMasterPlaceholder', function () {
			browser.assert.elements(OLSKCatalogMasterPlaceholder, 0);
		});

	});

	context('OLSKCatalogStashEnabled', function test_OLSKCatalogStashEnabled() {

		before(function () {
			return browser.pressButton('.TestItemStashButton');
		});

		it('hides OLSKNarrowToolbarTail', function () {
			browser.assert.elements('#TestOLSKNarrowToolbarTail', 0);
		});

		it('shows OLSKCatalogStashDoneButton', function () {
			browser.assert.elements(OLSKCatalogStashDoneButton, 1);
		});

		context('OLSKCatalogStashDoneButton', function () {
			
			before(function () {
				return browser.pressButton(OLSKCatalogStashDoneButton);
			});

			it('shows OLSKNarrowToolbarTail', function () {
				browser.assert.elements('#TestOLSKNarrowToolbarTail', 1);
			});

			it('hides OLSKCatalogStashDoneButton', function () {
				browser.assert.elements(OLSKCatalogStashDoneButton, 0);
			});
		
		});

	});

});
