const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Sort', function () {

	describe('insert', function test_insert () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		['alfa', 'bravo', 'charlie'].forEach(function (e) {
			
			before(function () {
				return browser.pressButton('.TestItemCreateButton');
			});

			before(function () {
				return browser.fill('.TestItemField', e);
			});

		});

		it('sorts', function () {
			browser.assert.text('.OLSKResultsListItem', 'charlie bravo alfa');
		});

		context('remote', function () {
			
			context('with selection', function () {
				
				before(function () {
					return browser.pressButton('#FakeRemoteInsert');
				});

				it('skips sort', function () {
					browser.assert.text('.OLSKResultsListItem', 'add charlie bravo alfa');
				});
			
			});

			context('without selection', function () {

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
				});

				before(function () {
					return browser.pressButton('#FakeRemoteInsert');
				});

				it('sorts', function () {
					browser.assert.text('.OLSKResultsListItem', 'charlie bravo alfa add add');
				});

			});
		
		});

	});

	describe('update', function test_update () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		['alfa', 'bravo', 'charlie'].forEach(function (e) {
			
			before(function () {
				return browser.pressButton('.TestItemCreateButton');
			});

			before(function () {
				return browser.fill('.TestItemField', e);
			});

		});

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3)');
		});

		before(function () {
			return browser.fill('.TestItemField', 'alfa2');
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

		context('remote', function () {
			
			context('without selection', function () {

				before(function () {
					return browser.pressButton('#FakeRemoteUpdate');
				});

				it('sorts', function () {
					browser.assert.text('.OLSKResultsListItem', 'change alfa2 charlie');
				});

			});

			context('with selection', function () {
				
				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Escape'); // #purge-hotfix-trigger-sort
				});

				before(function () {
					return browser.click('.OLSKResultsListItem:nth-child(3)');
				});

				before(function () {
					return browser.pressButton('#FakeRemoteUpdate');
				});

				it('skips sort', function () {
					browser.assert.text('.OLSKResultsListItem', 'change alfa2 change');
				});
			
			});
		
		});

	});

	describe('delete', function test_delete () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		['alfa', 'bravo', 'charlie', 'delta', 'echo'].forEach(function (e) {
			
			before(function () {
				return browser.pressButton('.TestItemCreateButton');
			});

			before(function () {
				return browser.fill('.TestItemField', e);
			});

		});

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(4)');
		});

		before(function () {
			return browser.fill('.TestItemField', 'bravo2');
		});

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(5)');
		});

		before(function () {
			return browser.pressButton('.TestItemDiscardButton');
		});

		it('skips sort', function () {
			browser.assert.text('.OLSKResultsListItem', 'echo delta charlie bravo2');
		});

		context('deselect', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('sorts', function () {
				browser.assert.text('.OLSKResultsListItem', 'bravo2 echo delta charlie');
			});

		});

		context('remote', function () {
			
			context('without selection', function () {

				before(function () {
					return browser.pressButton('#FakeRemoteRemove');
				});

				it('sorts', function () {
					browser.assert.text('.OLSKResultsListItem', 'bravo2 echo delta');
				});
			
			});
		
		});

	});

});
