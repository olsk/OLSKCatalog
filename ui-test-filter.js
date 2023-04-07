const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Filter', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	const item = Math.random().toString();

	before(function () {
		return browser.pressButton('.TestItemCreateButton');
	});

	before(function () {
		return browser.fill('.TestItemField', item);
	});

	before(function () {
		return browser.pressButton('.TestItemCreateButton');
	});

	before(function () {
		return browser.fill('.TestItemField', Math.random().toString() + item.slice(0, item.length / 2));
	});

	context('no match', function () {

		before(function () {
			browser.fill('.OLSKNarrowFilterField', Math.random().toString());
		});

		it('binds OLSKCollectionItems', function () {
			return browser.assert.elements('.OLSKCollectionItem', 0);
		});

		it('binds OLSKCollectionItemsLocus', function () {
			return browser.assert.elements(OLSKCatalogDetailPlaceholder, 1);
		});

	});

	context('partial match', function () {

		before(function () {
			browser.fill('.OLSKNarrowFilterField', item.slice(0, item.length / 2));
		});

		it('binds OLSKCollectionItem', function () {
			return browser.assert.elements('.OLSKCollectionItem', 2);
		});

		it('binds OLSKCollectionItemsLocus', function () {
			return browser.assert.elements(OLSKCatalogDetailPlaceholder, 0);
		});

		it('binds OLSKCollectionItemsLocus', function () {
			return browser.assert.hasClass('.OLSKCollectionItem:nth-child(2)', 'OLSKCollectionItemLocus');
		});

	});

	context('exact match', function () {

		before(function () {
			browser.fill('.OLSKNarrowFilterField', item);
		});

		it('binds OLSKCollectionItem', function () {
			return browser.assert.elements('.OLSKCollectionItem', 1);
		});

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.hasClass('.OLSKCollectionItem', 'OLSKCollectionItemLocus');
			browser.assert.elements(OLSKCatalogDetailPlaceholder, 0);
		});

	});

	context('clear', function () {

		before(function () {
			return browser.pressButton('.OLSKInputWrapperClearButton');
		});

		it('binds OLSKCollectionItem', function () {
			return browser.assert.elements('.OLSKCollectionItem', 2);
		});

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 0);
			browser.assert.elements(OLSKCatalogDetailPlaceholder, 1);
		});

	});

	context('escape', function () {

		before(function () {
			browser.fill('.OLSKNarrowFilterField', item);
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('binds OLSKNarrowFilterText', function () {
			return browser.assert.input('.OLSKNarrowFilterField', '');
		});

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 0);
			browser.assert.elements(OLSKCatalogDetailPlaceholder, 1);
		});

	});

	context('submit', function () {

		const item = Math.random().toString();

		context('blank', function () {
			
			before(function () {
				browser.assert.text('#TestOLSKCatalogDispatchFilterSubmit', '0');
				browser.assert.text('#TestOLSKCatalogDispatchFilterSubmitData', 'undefined');
			});

			before(function () {
				return browser.fire('.OLSKNarrowForm', 'submit');
			});

			it('sends OLSKCatalogDispatchFilterSubmit', function () {
				browser.assert.text('#TestOLSKCatalogDispatchFilterSubmit', '0');
				browser.assert.text('#TestOLSKCatalogDispatchFilterSubmitData', 'undefined');
			});
		
		});

		context('filled', function () {
			
			before(function () {
				browser.fill('.OLSKNarrowFilterField', item);
			});

			before(function () {
				return browser.fire('.OLSKNarrowForm', 'submit');
			});

			it('sends OLSKCatalogDispatchFilterSubmit', function () {
				browser.assert.text('#TestOLSKCatalogDispatchFilterSubmit', '1');
				browser.assert.text('#TestOLSKCatalogDispatchFilterSubmitData', item);
			});
		
		});

	});

});
