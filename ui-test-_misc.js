const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Misc', function () {

	describe('OLSKCatalog', function test_OLSKCatalog () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('sets OLSKMobileViewInactive', function () {
			browser.assert.hasNoClass('.OLSKMasterList', 'OLSKMobileViewInactive');
			browser.assert.hasClass(OLSKCatalogDetail, 'OLSKMobileViewInactive');
			browser.assert.attribute(OLSKCatalogDetail, 'aria-hidden', null);
			browser.assert.hasClass('.OLSKMasterList', 'OLSKMasterListFocused');
		});

		it('focuses OLSKMasterListFilterField', function () {
			browser.assert.hasFocus('.OLSKMasterListFilterField');
		});

		context('ItemSelect', function () {

			before(function () {
				return browser.pressButton('.TestItemCreateButton');
			});

			it('sets OLSKMobileViewInactive', function () {
				browser.assert.hasClass('.OLSKMasterList', 'OLSKMobileViewInactive');
				browser.assert.hasNoClass(OLSKCatalogDetail, 'OLSKMobileViewInactive');
				browser.assert.attribute(OLSKCatalogDetail, 'aria-hidden', 'true');
				browser.assert.hasNoClass('.OLSKMasterList', 'OLSKMasterListFocused');
			});

		});

		context('back', function () {

			before(function () {
				return browser.pressButton('.TestItemBackButton');
			});

			it('sets OLSKMobileViewInactive', function () {
				browser.assert.hasNoClass('.OLSKMasterList', 'OLSKMobileViewInactive');
				browser.assert.hasClass(OLSKCatalogDetail, 'OLSKMobileViewInactive');
				browser.assert.attribute(OLSKCatalogDetail, 'aria-hidden', null);
				browser.assert.hasClass('.OLSKMasterList', 'OLSKMasterListFocused');
			});

		});
		
	});

	describe('OLSKCatalogDetail', function test_OLSKCatalogDetail () {

		it('classes OLSKViewportDetail', function () {
			browser.assert.hasClass(OLSKCatalogDetail, 'OLSKViewportDetail');
		});
		
	});

	context('ItemCreate', function test_ItemCreate() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton('.TestItemCreateButton');
		});

		it('binds OLSKMasterListItem', function () {
			browser.assert.elements('.OLSKMasterListItem .TestOLSKMasterListItem', 1);
		});

		it('binds OLSKCatalogItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem', 'OLSKResultsListItemSelected');
		});

		it('binds OLSKCatalogDetailContent', function () {
			browser.assert.elements('.OLSKCatalogDetail #TestOLSKCatalogDetailContent', 1);
		});

	});

	context('ItemSelect', function test_ItemSelect() {

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
