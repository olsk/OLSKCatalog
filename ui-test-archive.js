const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Archive', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		return browser.pressButton('.TestItemCreateButton');
	});

	before(function () {
		return browser.fill('.TestItemField', 'alfa');
	});

	before(function () {
		return browser.pressButton('.TestItemCreateButton');
	});

	before(function () {
		return browser.fill('.TestItemField', 'bravo');
	});

	before(function () {
		return browser.pressButton('.TestItemCreateButton');
	});

	before(function () {
		return browser.fill('.TestItemField', 'charlie');
	});

	before(function () {
		return browser.click('.OLSKCollectionItem:nth-child(3)');
	});

	before(function () {
		return browser.fill('.TestItemField', 'alfa2');
	});

	before(function () {
		return browser.assert.elements('.TestRevealArchiveButton', 0);
	});

	describe('archive', function test_archive () {

		before(function () {
			return browser.click('.OLSKCollectionItem:nth-child(1)');
		});

		before(function () {
			return browser.fill('.TestItemField', 'charlie2');
		});

		before(function () {
			return browser.pressButton('.TestItemArchiveButton');
		});

		'charlie2 bravo alfa2'.split(' ').forEach(function (e, i, coll) {
			
			it('skips sort ' + e, function () {
				return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
			});

		});

		describe('deselect', function () {

			before(function () {
				return browser.assert.text('#TestOLSKCatalogDispatchArchivedHide', '0');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			'alfa2 bravo'.split(' ').forEach(function (e, i, coll) {
				
				it('excludes archived, check ' + e, function () {
					return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
				});

			});

			it('sends OLSKCatalogDispatchArchivedHide', function () {
				browser.assert.text('#TestOLSKCatalogDispatchArchivedHide', '1');
				browser.assert.elements('.TestRevealArchiveButton', 1);
			});

		});

	});

	describe('reveal', function test_reveal () {

		before(function () {
			return browser.assert.text('#TestOLSKCatalogDispatchArchivedShow', '0');
		});

		before(function () {
			return browser.pressButton('.TestRevealArchiveButton');
		});

		'alfa2 bravo charlie2'.split(' ').forEach(function (e, i, coll) {
			
			it('sorts below others ' + e, function () {
				return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
			});

		});

		it('sends OLSKCatalogDispatchArchivedShow', function () {
			browser.assert.text('#TestOLSKCatalogDispatchArchivedShow', '1');
			browser.assert.elements('.TestRevealArchiveButton', 0);
		});

	});

	describe('escape', function test_escape () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		'alfa2 bravo'.split(' ').forEach(function (e, i, coll) {
			
			it('hides archived, check ' + e, function () {
				return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
			});

		});

	});

	context('filter', function test_filter () {

		before(function () {
			browser.fill('.OLSKNarrowFilterField', 'a');
		});

		'alfa2 bravo charlie2'.split(' ').forEach(function (e, i, coll) {
			
			it('shows archived, check ' + e, function () {
				return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
			});

		});

		context('clear', function () {
			
			before(function () {
				return browser.pressButton('.OLSKInputWrapperClearButton');
			});

			'alfa2 bravo'.split(' ').forEach(function (e, i, coll) {
				
				it('hides archived, check ' + e, function () {
					return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
				});

			});
		
		});

	});

	describe('unarchive', function test_unarchive () {

		before(function () {
			return browser.pressButton('.TestRevealArchiveButton');
		});

		before(function () {
			return browser.click('.OLSKCollectionItem:nth-child(3)');
		});

		before(function () {
			return browser.fill('.TestItemField', 'charlie3');
		});

		before(function () {
			return browser.pressButton('.TestItemUnarchiveButton');
		});

		'alfa2 bravo charlie3'.split(' ').forEach(function (e, i, coll) {
			
			it('skips sort ' + e, function () {
				return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
			});

		});

		describe('deselect', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			'charlie3 alfa2 bravo'.split(' ').forEach(function (e, i, coll) {
				
				it('sorts above others ' + e, function () {
					return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
				});

			});

		});

	});

	context('discard', function test_discard () {
		
		before(function () {
			return browser.click('.OLSKCollectionItem:nth-of-type(1)');
		});

		before(function () {
			return browser.pressButton('.TestItemArchiveButton');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		before(function () {
			return browser.assert.elements('.TestRevealArchiveButton', 1);
		});

		before(function () {
			return browser.pressButton('.TestRevealArchiveButton');
		});

		before(function () {
			return browser.click('.OLSKCollectionItem:nth-child(2)');
		});

		before(function () {
			return browser.pressButton('.TestItemDiscardButton');
		});

		it('hides button', function () {
			return browser.assert.elements('.TestRevealArchiveButton', 0);
		});
	
	});

	describe('preloaded items', function () {	

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKCatalogItems: JSON.stringify([{
					XYZItemID: Math.random().toString(),
					XYZItemBlurb: Math.random().toString(),
					XYZItemDate: new Date(),
				}, {
					XYZItemID: Math.random().toString(),
					XYZItemBlurb: Math.random().toString(),
					XYZItemDate: new Date(),
					XYZItemIsArchived: true,
				}]),
			});
		});

		before(function () {
			return browser.assert.elements('.OLSKCollectionItem', 1);
		});

		it('shows reveal archive', function () {
			return browser.assert.elements('.TestRevealArchiveButton', 1);
		});

	});

	describe('late loaded items', function () {	

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton('#FakeRemoteInsert');
		});

		before(function () {
			return browser.pressButton('#FakeArchivedInsert');
		});

		before(function () {
			return browser.assert.elements('.OLSKCollectionItem', 1);
		});

		it('shows reveal archive', function () {
			return browser.assert.elements('.TestRevealArchiveButton', 1);
		});

	});

});
