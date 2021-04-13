const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Stash', function () {

	const count = Math.max(1, uRandomInt(10));
	const index = Math.max(1, uRandomInt(count));
	
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
		return browser.click(`.OLSKCollectionItem:nth-child(${ index })`);
	});

	before(function () {
		return browser.pressButton('.TestItemStashButton');
	});

	it('clears selected item', function () {
		browser.assert.elements(OLSKCatalogDetailPlaceholder, 1);
	});

	it('adds to stash', function () {
		browser.assert.hasClass(`.OLSKCollectionItem:nth-child(${ index })`, 'OLSKCollectionItemStash');
	});

});
