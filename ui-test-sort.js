const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Sort', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('insert', function test_insert () {

		['alfa', 'bravo', 'charlie'].forEach(function (e) {
			
			before(function () {
				return browser.pressButton('.TestItemCreateButton');
			});

			before(function () {
				return browser.fill('.TestOLSKCatalogItemSelected', e);
			});

		});

		it('sorts', function () {
			browser.assert.text('.OLSKResultsListItem', 'charlie bravo alfa');
		});

	});

	describe('update', function test_update () {

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3)');
		});

		before(function () {
			return browser.fill('.TestOLSKCatalogItemSelected', 'alfa2');
		});

		it('skips sort', function () {
			browser.assert.text('.OLSKResultsListItem', 'charlie bravo alfa2');
		});

		context('deselect', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('sorts', function () {
				browser.assert.text('.OLSKResultsListItem', 'alfa2 charlie bravo');
			});

		});

	});

	describe('delete', function test_delete () {

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3)');
		});

		before(function () {
			return browser.fill('.TestOLSKCatalogItemSelected', 'bravo2');
		});

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(2)');
		});

		before(async function () {
			return browser.pressButton('.TestItemDiscardButton');
		});

		it('skips sort', function () {
			browser.assert.text('.OLSKResultsListItem', 'alfa2 bravo2');
		});

		context('deselect', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('sorts', function () {
				browser.assert.text('.OLSKResultsListItem', 'bravo2 alfa2');
			});

		});

	});

});
