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

		context('ItemActivate', function () {

			it('calls OLSKCatalogDispatchDetailActivate', function () {
				browser.assert.hasFocus('.TestItemField');
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
				// browser.assert.hasClass('.OLSKMasterList', 'OLSKMasterListFocused');
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
			browser.assert.text('#TestOLSKCatalogDispatchQuantity', '0');
			browser.assert.text('#TestOLSKCatalogDispatchQuantityData', '0');
		});

		before(function () {
			return browser.pressButton('.TestItemCreateButton');
		});

		it('binds OLSKCollectionItem', function () {
			browser.assert.elements('.OLSKCollectionItem .TestOLSKCollectionItem', 1);
		});

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.hasClass('.OLSKResultsListItem', 'OLSKResultsListItemSelected');
		});

		it('binds OLSKCatalogDetailContent', function () {
			browser.assert.elements('.OLSKCatalogDetail #TestOLSKCatalogDetailContent', 1);
		});

		it('binds OLSKCatalogItemSelected', function () {
			browser.assert.input('.OLSKCatalogDetail #TestOLSKCatalogDetailContent .TestItemField', browser.query('.TestOLSKCollectionItem').innerHTML);
		});

		it('sends OLSKCatalogDispatchQuantity', function () {
			browser.assert.text('#TestOLSKCatalogDispatchQuantity', '1');
			browser.assert.text('#TestOLSKCatalogDispatchQuantityData', '1');
		});

	});

	context('ItemEdit', function test_ItemEdit() {

		const item = Math.random().toString();
		const body = item + '\n' + Math.random().toString();

		before(function () {
			return browser.fill('.TestItemField', body);
		});

		before(function () {
			return browser.wait({ element: '.OLSKCollectionItem' });
		});

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.text('.TestOLSKCollectionItem', body.replace('\n', ' '));
		});

		it('calls OLSKCollectionItemAccessibilitySummaryFunction', function () {
			browser.assert.attribute('.OLSKCollectionItem', 'aria-label', item);
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

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(2)', 'OLSKResultsListItemSelected');
		});

		context('arrow', function () {

			before(function () {
				return browser.focus('.OLSKMasterListFilterField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			});

			it('binds OLSKCollectionItemsLocus', function () {
				browser.assert.hasClass('.OLSKResultsListItem:nth-child(1)', 'OLSKResultsListItemSelected');
			});

		});

		context('escape', function () {

			before(function () {
				return browser.focus('.TestItemField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('focuses OLSKMasterListFilterField', function () {
				browser.assert.hasFocus('.OLSKMasterListFilterField');
			});

		});

	});

	context.skip('Tab', function test_Tab() {

		context('master focused', function () {

			before(function () {
				browser.focus('.OLSKMasterListFilterField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			before(function () {
				browser.assert.hasFocus('.OLSKMasterListFilterField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it('calls OLSKCatalogDispatchDetailActivate', function () {
				browser.assert.hasFocus('.TestItemField');
			});

		});

		context('master not focused', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it('does default', function () {
				browser.assert.hasFocus('.TestItemField2');
			});

		});

		context('shiftKey', function () {

			context('other field focused', function () {

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('does default', function () {
					browser.assert.hasFocus('.TestItemField');
				});

			});

			context('OLSKCatalogDispatchMasterShouldActivate', function () {

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses OLSKMasterListFilterField', function () {
					browser.assert.hasFocus('.OLSKMasterListFilterField');
				});

			});

		});

	});

	context('ItemDiscard', function test_ItemDiscard() {

		before(function () {
			browser.assert.text('#TestOLSKCatalogDispatchQuantity', '2');
			browser.assert.text('#TestOLSKCatalogDispatchQuantityData', '2');
		});

		before(function () {
			return browser.click('.OLSKResultsListItem');
		});

		before(function () {
			return browser.pressButton('.TestItemDiscardButton');
		});

		it('sends OLSKCatalogDispatchQuantity', function () {
			browser.assert.text('#TestOLSKCatalogDispatchQuantity', '3');
			browser.assert.text('#TestOLSKCatalogDispatchQuantityData', '1');
		});

		it('focuses OLSKMasterListFilterField', function () {
			browser.assert.hasFocus('.OLSKMasterListFilterField');
		});

	});

	context('OLSKCatalogDispatchEscapeOnEmpty', function test_OLSKCatalogDispatchEscapeOnEmpty () {

		before(function () {
			browser.fill('.OLSKMasterListFilterField', Math.random().toString());
		});

		before(function () {
			browser.assert.text('#TestOLSKCatalogDispatchEscapeOnEmpty', '0');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('sends no OLSKCatalogDispatchEscapeOnEmpty', function () {
			browser.assert.text('#TestOLSKCatalogDispatchEscapeOnEmpty', '0');
		});

		context('empty', function () {

			before(function () {
				browser.assert.input('.OLSKMasterListFilterField', '');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('sends OLSKCatalogDispatchEscapeOnEmpty', function () {
				browser.assert.text('#TestOLSKCatalogDispatchEscapeOnEmpty', '1');
			});

		});

	});

	context('OLSKCatalogFilterWithNoThrottle', function test_OLSKCatalogFilterWithNoThrottle() {

		const item = Math.random().toString();

		before(function () {
			return browser.fill('.TestExternalFilter', item);
		});

		it('sets OLSKMasterListFilterField', function () {
			browser.assert.input('.OLSKMasterListFilterField', item);
		});

	});

});
