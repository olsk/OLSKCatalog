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
		return browser.click('.OLSKResultsListItem:nth-child(3)');
	});

	before(function () {
		return browser.fill('.TestItemField', 'alfa2');
	});

	before(function () {
		browser.assert.elements('.TestRevealArchiveButton', 0);
	});

	describe('archive', function test_archive () {

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(1)');
		});

		before(function () {
			return browser.fill('.TestItemField', 'charlie2');
		});

		before(function () {
			return browser.pressButton('.TestItemArchiveButton');
		});

		it('skips sort', function () {
			browser.assert.text('.OLSKResultsListItem', 'charlie2 bravo alfa2');
		});

		describe('deselect', function () {

			before(function () {
				browser.assert.text('#TestOLSKCatalogDispatchArchivedHide', '0');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('excludes archived', function () {
				browser.assert.text('.OLSKResultsListItem', 'alfa2 bravo');
			});

			it('sends OLSKCatalogDispatchArchivedHide', function () {
				browser.assert.text('#TestOLSKCatalogDispatchArchivedHide', '1');
				browser.assert.elements('.TestRevealArchiveButton', 1);
			});

		});

	});

	describe('reveal', function test_reveal () {

		before(function () {
			browser.assert.text('#TestOLSKCatalogDispatchArchivedShow', '0');
		});

		before(function () {
			return browser.pressButton('.TestRevealArchiveButton');
		});

		it('sorts below others', function () {
			browser.assert.text('.OLSKResultsListItem', 'alfa2 bravo charlie2');
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

		it('hides archived', function () {
			browser.assert.text('.OLSKResultsListItem', 'alfa2 bravo');
		});

	});

	context('filter', function test_filter () {

		before(function () {
			browser.fill('.OLSKMasterListFilterField', 'a');
		});

		it('shows archived', function () {
			browser.assert.text('.OLSKResultsListItem', 'alfa2 bravo charlie2');
		});

		context('clear', function () {
			
			before(function () {
				return browser.pressButton('.OLSKInputWrapperClearButton');
			});

			it('hides archived', function () {
				browser.assert.text('.OLSKResultsListItem', 'alfa2 bravo');
			});
		
		});

	});

	describe('unarchive', function test_unarchive () {

		before(function () {
			return browser.pressButton('.TestRevealArchiveButton');
		});

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3)');
		});

		before(function () {
			return browser.fill('.TestItemField', 'charlie3');
		});

		before(function () {
			return browser.pressButton('.TestItemUnarchiveButton');
		});

		it('skips sort', function () {
			browser.assert.text('.OLSKResultsListItem', 'alfa2 bravo charlie3');
		});

		describe('deselect', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('sorts above others', function () {
				browser.assert.text('.OLSKResultsListItem', 'charlie3 alfa2 bravo');
			});

		});

	});

	context('discard', function test_discard () {
		
		before(function () {
			return browser.click('.OLSKResultsListItem');
		});

		before(function () {
			return browser.pressButton('.TestItemArchiveButton');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		before(function () {
			browser.assert.elements('.TestRevealArchiveButton', 1);
		});

		before(function () {
			return browser.pressButton('.TestRevealArchiveButton');
		});

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(2)');
		});

		before(function () {
			return browser.pressButton('.TestItemDiscardButton');
		});

		it('hides button', function () {
			browser.assert.elements('.TestRevealArchiveButton', 0);
		});
	
	});

});
