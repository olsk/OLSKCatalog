const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Sort', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	const items = Array.from(Array(3)).map(Math.random);

	items.forEach(function (e) {
		
		before(function () {
			return browser.pressButton('.TestItemCreateButton');
		});

		before(function () {
			return browser.fill('.TestOLSKCatalogItemSelected', e);
		});

	});

	it('sorts list', function () {
		browser.assert.text('.TestOLSKMasterListItem', items.reverse().join(''));
	});

});
