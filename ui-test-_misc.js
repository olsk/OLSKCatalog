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

	context('ItemSelect', function test_ItemSelect() {

		before(function () {
			return browser.pressButton('.TestItemCreateButton');
		});

		before(function () {
			return browser.pressButton('.TestItemCreateButton');
		});

		before(function () {
			browser.assert.hasNoClass('.OLSKResultsListItem:nth-child(2)', 'OLSKResultsListItemSelected');
		});

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(2)');
		});

		it('binds OLSKCatalogItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(2)', 'OLSKResultsListItemSelected');
		});

		context('arrow', function () {

			before(function () {
				return browser.focus('.OLSKMasterListFilterField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			});

			it('binds OLSKCatalogItemSelected', function () {
				browser.assert.hasClass('.OLSKResultsListItem:nth-child(1)', 'OLSKResultsListItemSelected');
			});

		});

	});

});
