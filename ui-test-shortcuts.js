const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Shortcuts', function () {

	context('OLSKCatalogDisableEscape', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKCatalogDisableEscape: true,
			});
		});

		before(function () {
			return browser.assert.elements(OLSKCatalogDetailPlaceholder, 1);
		});

		before(function () {
			return browser.pressButton('.TestItemCreateButton');
		});

		before(function () {
			return browser.assert.elements(OLSKCatalogDetailPlaceholder, 0);
		});

		before(function () {
			return browser.fill('.TestItemField', Math.random().toString());
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('does nothing', function () {
			browser.assert.elements(OLSKCatalogDetailPlaceholder, 0);
		});

	});

});
