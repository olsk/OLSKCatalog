const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCatalog_Sort', function () {

	describe('insert', function test_insert () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		['alfa', 'bravo', 'charlie'].forEach(function (e, i, coll) {
			
			before(function () {
				return browser.pressButton('.TestItemCreateButton');
			});

			before(function () {
				return browser.fill('.TestItemField', e);
			});

			it('sorts ' + e, function () {
				return browser.assert.text(`.OLSKCollectionItem:nth-child(${ coll.length - i })`, e);
			});

		});

		context('remote', function () {
			
			context('with selection', function () {
				
				before(function () {
					return browser.pressButton('#FakeRemoteInsert');
				});

				['add', 'charlie', 'bravo', 'alfa'].forEach(function (e, i, coll) {
					
					it('skips sort ' + e, function () {
						return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
					});

				});

			});

			context('without selection', function () {

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
				});

				before(function () {
					return browser.pressButton('#FakeRemoteInsert');
				});

				['charlie', 'bravo', 'alfa', 'add', 'add'].forEach(function (e, i, coll) {
					
					it('sorts ' + e, function () {
						return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
					});

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
			return browser.click('.OLSKCollectionItem:nth-child(3)');
		});

		before(function () {
			return browser.fill('.TestItemField', 'alfa2');
		});

		['charlie', 'bravo', 'alfa2'].forEach(function (e, i, coll) {
			
			it('skips sort ' + e, function () {
				return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
			});

		});

		context('deselect', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			['alfa2', 'charlie', 'bravo'].forEach(function (e, i, coll) {
				
				it('sorts ' + e, function () {
					return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
				});

			});

		});

		context('remote', function () {
			
			context('without selection', function () {

				before(function () {
					return browser.pressButton('#FakeRemoteUpdate');
				});

				['change', 'alfa2', 'charlie'].forEach(function (e, i, coll) {
					
					it('sorts ' + e, function () {
						return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
					});

				});

			});

			context('with selection', function () {
				
				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Escape'); // #purge-hotfix-trigger-sort
				});

				before(function () {
					return browser.click('.OLSKCollectionItem:nth-child(3)');
				});

				before(function () {
					return browser.pressButton('#FakeRemoteUpdate');
				});

				['change', 'alfa2', 'change'].forEach(function (e, i, coll) {
					
					it('skips sort ' + e, function () {
						return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
					});

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
			return browser.click('.OLSKCollectionItem:nth-child(4)');
		});

		before(function () {
			return browser.fill('.TestItemField', 'bravo2');
		});

		before(function () {
			return browser.click('.OLSKCollectionItem:nth-child(5)');
		});

		before(function () {
			return browser.pressButton('.TestItemDiscardButton');
		});

		'echo delta charlie bravo2'.split(' ').forEach(function (e, i, coll) {
			
			it('skips sort ' + e, function () {
				return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
			});

		});

		context('deselect', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			'bravo2 echo delta charlie'.split(' ').forEach(function (e, i, coll) {
				
				it('sorts ' + e, function () {
					return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
				});

			});

		});

		context('remote', function () {
			
			context('without selection', function () {

				before(function () {
					return browser.pressButton('#FakeRemoteRemove');
				});

				'bravo2 echo delta'.split(' ').forEach(function (e, i, coll) {
					
					it('sorts ' + e, function () {
						return browser.assert.text(`.OLSKCollectionItem:nth-child(${ i + 1 })`, e);
					});

				});
			
			});
		
		});

	});

});
