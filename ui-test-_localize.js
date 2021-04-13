const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`OLSKCatalog_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes OLSKCatalogMasterPlaceholder', function () {
			browser.assert.OLSKInnerHTML(OLSKCatalogMasterPlaceholder, uLocalized('OLSKCatalogMasterPlaceholderText'));
		});

		context('stash', function () {
			
			Array.from(Array(2)).forEach(function () {
				
				before(function () {
					return browser.pressButton('.TestItemCreateButton');
				});

				before(function () {
					return browser.fill('.TestItemField', Math.random().toString());
				});

			});

			before(function () {
				return browser.pressButton('.TestItemStashButton');
			});

			it('sets OLSKPlaceholderHTML', function () {
				browser.assert.text(OLSKCatalogDetailPlaceholder, OLSKTestingFormatted(uLocalized('OLSKCatalogStashPlaceholderTextFormat'), 1));
			});
		
		});

		context('none', function () {
			
			before(function () {
				return browser.click('.OLSKCollectionItem:nth-child(1)');
			});

			it('sets OLSKPlaceholderHTML', function () {
				browser.assert.text(OLSKCatalogDetailPlaceholder, OLSKTestingFormatted(uLocalized('OLSKCatalogStashPlaceholderTextFormat'), 0));
			});
		
		});

		context('multiple', function () {
			
			before(function () {
				return browser.click('.OLSKCollectionItem:nth-child(1)');
			});

			before(function () {
				return browser.click('.OLSKCollectionItem:nth-child(2)');
			});

			it('sets OLSKPlaceholderHTML', function () {
				browser.assert.text(OLSKCatalogDetailPlaceholder, OLSKTestingFormatted(uLocalized('OLSKCatalogStashPlaceholderTextFormat'), 2));
			});
		
		});

	});

});
