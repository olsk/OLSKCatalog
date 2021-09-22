const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Misc', function () {

	describe('OLSKCatalog', function test_OLSKCatalog () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('sets OLSKMobileViewInactive', function () {
			browser.assert.hasNoClass('.OLSKNarrow', 'OLSKMobileViewInactive');
			browser.assert.hasClass(OLSKCatalogDetail, 'OLSKMobileViewInactive');
			browser.assert.attribute(OLSKCatalogDetail, 'aria-hidden', 'true');
			browser.assert.hasClass('.OLSKNarrow', 'OLSKNarrowFocused');
		});

		it('focuses OLSKNarrowFilterField', function () {
			browser.assert.hasFocus('.OLSKNarrowFilterField');
		});

		context('ItemSelect', function () {

			before(function () {
				return browser.pressButton('.TestItemCreateButton');
			});

			it('sets OLSKMobileViewInactive', function () {
				browser.assert.hasClass('.OLSKNarrow', 'OLSKMobileViewInactive');
				browser.assert.hasNoClass(OLSKCatalogDetail, 'OLSKMobileViewInactive');
				browser.assert.attribute(OLSKCatalogDetail, 'aria-hidden', null);
				browser.assert.hasNoClass('.OLSKNarrow', 'OLSKNarrowFocused');
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
				browser.assert.hasNoClass('.OLSKNarrow', 'OLSKMobileViewInactive');
				browser.assert.hasClass(OLSKCatalogDetail, 'OLSKMobileViewInactive');
				browser.assert.attribute(OLSKCatalogDetail, 'aria-hidden', 'true');
				// browser.assert.hasClass('.OLSKNarrow', 'OLSKNarrowFocused');
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
			browser.assert.hasClass('.OLSKCollectionItem', 'OLSKCollectionItemLocus');
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
			browser.assert.hasNoClass('.OLSKCollectionItem:nth-child(2)', 'OLSKCollectionItemLocus');
		});

		before(function () {
			return browser.click('.OLSKCollectionItem:nth-child(2)');
		});

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.hasClass('.OLSKCollectionItem:nth-child(2)', 'OLSKCollectionItemLocus');
		});

		context('arrow', function () {

			before(function () {
				return browser.focus('.OLSKNarrowFilterField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			});

			it('binds OLSKCollectionItemsLocus', function () {
				browser.assert.hasClass('.OLSKCollectionItem:nth-child(1)', 'OLSKCollectionItemLocus');
			});

		});

		context('escape', function () {

			before(function () {
				return browser.focus('.TestItemField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('focuses OLSKNarrowFilterField', function () {
				browser.assert.hasFocus('.OLSKNarrowFilterField');
			});

		});

	});

	context.skip('Tab', function test_Tab() {

		context('master focused', function () {

			before(function () {
				browser.focus('.OLSKNarrowFilterField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			before(function () {
				browser.assert.hasFocus('.OLSKNarrowFilterField');
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

				it('focuses OLSKNarrowFilterField', function () {
					browser.assert.hasFocus('.OLSKNarrowFilterField');
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
			return browser.click('.OLSKCollectionItem');
		});

		before(function () {
			return browser.pressButton('.TestItemDiscardButton');
		});

		it('sends OLSKCatalogDispatchQuantity', function () {
			browser.assert.text('#TestOLSKCatalogDispatchQuantity', '3');
			browser.assert.text('#TestOLSKCatalogDispatchQuantityData', '1');
		});

		it('focuses OLSKNarrowFilterField', function () {
			browser.assert.hasFocus('.OLSKNarrowFilterField');
		});

	});

	context('OLSKCatalogDispatchEscapeOnEmpty', function test_OLSKCatalogDispatchEscapeOnEmpty () {

		before(function () {
			browser.fill('.OLSKNarrowFilterField', Math.random().toString());
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
				browser.assert.input('.OLSKNarrowFilterField', '');
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

		it('sets OLSKNarrowFilterField', function () {
			browser.assert.input('.OLSKNarrowFilterField', item);
		});

	});

	context('OLSKCatalogStashDoneButton', function test_OLSKCatalogStashDoneButton() {

		const count = Math.max(1, uRandomInt(10));
		const selection = Math.max(1, uRandomInt(count));
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		Array.from(Array(count)).forEach(function () {
			
			before(function () {
				return browser.pressButton('.TestItemCreateButton');
			});

			before(function () {
				return browser.fill('.TestItemField', Math.random().toString());
			});

		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		before(function () {
			return browser.pressButton('.TestItemStashButton');
		});

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(OLSKCatalogStashDoneButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(OLSKCatalogStashDoneButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(OLSKCatalogStashDoneButton, 'OLSKToolbarButton');
		});

		it('sets text', function () {
			browser.assert.text(OLSKCatalogStashDoneButton, 'OK');
		});

		context('click', function () {

			Array.from(Array(selection)).forEach(function (e, i) {
				
				before(function () {
					return browser.click(`.OLSKCollectionItem:nth-child(${ i + 1 })`);
				});

			});
			
			before(function () {
				browser.assert.text('#TestOLSKCatalogDispatchStash', '0');
				browser.assert.text('#TestOLSKCatalogDispatchStashData', 'undefined');
			});

			before(function () {
				return browser.click(OLSKCatalogStashDoneButton);
			});

			it('sends OLSKCatalogDispatchStash', function () {
				browser.assert.text('#TestOLSKCatalogDispatchStash', '1');
				browser.assert.text('#TestOLSKCatalogDispatchStashData', selection);
			});
		
		});

	});

});
