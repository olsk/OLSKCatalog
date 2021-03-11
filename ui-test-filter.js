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
			browser.fill('.OLSKMasterListFilterField', Math.random().toString());
		});

		it('binds OLSKMasterListItems', function () {
			browser.assert.elements('.OLSKMasterListItem', 0);
		});

		it('binds OLSKMasterListItemSelected', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 1);
		});

	});

	context('partial match', function () {

		before(function () {
			browser.fill('.OLSKMasterListFilterField', item.slice(0, item.length / 2));
		});

		it('binds OLSKMasterListItem', function () {
			browser.assert.elements('.OLSKMasterListItem', 2);
		});

		it('binds OLSKMasterListItemSelected', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('binds OLSKMasterListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(2)', 'OLSKResultsListItemSelected');
		});

	});

	context('exact match', function () {

		before(function () {
			browser.fill('.OLSKMasterListFilterField', item);
		});

		it('binds OLSKMasterListItem', function () {
			browser.assert.elements('.OLSKMasterListItem', 1);
		});

		it('binds OLSKMasterListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem', 'OLSKResultsListItemSelected');
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

	});

	context('clear', function () {

		before(function () {
			return browser.pressButton('.OLSKInputWrapperClearButton');
		});

		it('binds OLSKMasterListItem', function () {
			browser.assert.elements('.OLSKMasterListItem', 2);
		});

		it('binds OLSKMasterListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 0);
			browser.assert.elements('.OLSKDetailPlaceholder', 1);
		});

	});

	context('escape', function () {

		before(function () {
			browser.fill('.OLSKMasterListFilterField', item);
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('binds OLSKMasterListFilterText', function () {
			browser.assert.input('.OLSKMasterListFilterField', '');
		});

		it('binds OLSKMasterListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 0);
			browser.assert.elements('.OLSKDetailPlaceholder', 1);
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
				return browser.fire('.OLSKMasterListForm', 'submit');
			});

			it('sends OLSKCatalogDispatchFilterSubmit', function () {
				browser.assert.text('#TestOLSKCatalogDispatchFilterSubmit', '0');
				browser.assert.text('#TestOLSKCatalogDispatchFilterSubmitData', 'undefined');
			});
		
		});

		context('filled', function () {
			
			before(function () {
				browser.fill('.OLSKMasterListFilterField', item);
			});

			before(function () {
				return browser.fire('.OLSKMasterListForm', 'submit');
			});

			it('sends OLSKCatalogDispatchFilterSubmit', function () {
				browser.assert.text('#TestOLSKCatalogDispatchFilterSubmit', '1');
				browser.assert.text('#TestOLSKCatalogDispatchFilterSubmitData', item);
			});
		
		});

	});

});
