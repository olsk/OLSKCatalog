<script>
export let OLSKMasterListItemAccessibilitySummaryFunction;

export let OLSKMasterListFilterFieldPlaceholderText = '';

export let _OLSKCatalogArchiveField = null;

export let OLSKCatalogSortFunction;
export let OLSKCatalogFilterFunction;
export let OLSKCatalogExactFunction;

export let _OLSKCatalogDispatchKey;

export let OLSKCatalogDispatchClick;
export let OLSKCatalogDispatchArrow;
export let OLSKCatalogDispatchArchivedHide = null;
export let OLSKCatalogDispatchArchivedShow = null;
export let OLSKCatalogDispatchFilterSubmit = null;
export let OLSKCatalogDispatchQuantity = null;
export let OLSKCatalogDispatchEscapeOnEmpty = null;

import OLSKThrottle from  'OLSKThrottle';
import { OLSK_SPEC_UI } from  'OLSKSpec';

export const modPublic = {

	// DATA

	_OLSKCatalogDataItemsAll () {
		return mod._ValueItemsAll.slice();
	},

	OLSKCatalogDataItemSelected () {
		return mod._ValueItemSelected;
	},

	_OLSKCatalogDataFilterText () {
		return mod._ValueFilterText;
	},

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// CONTROL
	
	OLSKCatalogInsert (inputData) {
		mod.ValueItemsAll([inputData].concat(mod._ValueItemsAll), !mod._ValueItemSelected);

		OLSKCatalogDispatchQuantity && OLSKCatalogDispatchQuantity(mod._ValueItemsAll.length);

		return inputData;
	},

	OLSKCatalogSelect (inputData) {
		return (mod._ValueItemSelected = inputData);
	},
	
	OLSKCatalogUpdate (inputData) {
		mod.ValueItemsAll(mod._ValueItemsAll.map(function (e) {
			return _OLSKCatalogDispatchKey(e) === _OLSKCatalogDispatchKey(inputData) ? inputData : e;
		}), !mod._ValueItemSelected);

		return inputData;
	},
	
	OLSKCatalogRemove (inputData) {
		mod.ValueItemsAll(mod._ValueItemsAll.filter(function (e) {
			return _OLSKCatalogDispatchKey(e) !== _OLSKCatalogDispatchKey(inputData);
		}), !mod._ValueItemSelected);

		OLSKCatalogDispatchQuantity && OLSKCatalogDispatchQuantity(mod._ValueItemsAll.length);

		if (!mod._ValueItemSelected) {
			return
		}

		if (_OLSKCatalogDispatchKey(inputData) !== _OLSKCatalogDispatchKey(mod._ValueItemSelected)) {
			return;
		}

		modPublic.OLSKCatalogSelect(null);

		modPublic.OLSKCatalogFocusMaster();

		mod.ControlFocusMaster();
	},
	
	OLSKCatalogFilterWithNoThrottle (inputData) {
		mod.ControlFilterWithNoThrottle(mod._ValueFilterText = inputData);
	},

	OLSKCatalogRevealArchive () {
		mod._ValueArchiveIsVisible = true;

		mod.ValueItemsVisible(mod._ValueItemsAll);

		OLSKCatalogDispatchArchivedShow();
	},
	
	OLSKCatalogFocusDetail () {
		mod.OLSKMobileViewInactive = true;
	},
	
	OLSKCatalogFocusMaster () {
		mod.OLSKMobileViewInactive = false;

		if (!mod.DataIsMobile()) {
			return;
		}

		const element = document.querySelector('.OLSKResultsListItemSelected');

		if (!element) {
			return;
		}

		setTimeout(function () {
			element.scrollIntoView({
				block: 'center',
				inline: 'center',
			});
		});
	},

};

const mod = {

	OLSKMobileViewInactive: false,

	// VALUE

	_ValueItemsAll: [],
	ValueItemsAll (inputData, shouldSort = true) {
		mod.ValueArchiveCount(inputData);

		mod.ValueItemsVisible(mod._ValueItemsAll = inputData, shouldSort);
	},

	_ValueArchiveCount: 0,
	_ValueArchiveIsVisible: false,
	ValueArchiveCount (inputData) {
		if (!_OLSKCatalogArchiveField) {
			return;
		}

		mod._ValueArchiveCount = inputData.filter(function (e) {
			return e[_OLSKCatalogArchiveField];
		}).length;
	},
	
	_ValueItemsVisible: [],
	ValueItemsVisible (inputData, shouldSort = true) {
		const items = inputData.filter(function (e) {
			if (!mod._ValueArchiveIsVisible && _OLSKCatalogArchiveField && e[_OLSKCatalogArchiveField]) {
				return false;
			}

			return !mod._ValueFilterText || OLSKCatalogFilterFunction(e, mod._ValueFilterText);
		});

		mod._ValueItemsVisible = shouldSort ? items.sort(OLSKCatalogSortFunction) : items;
	},

	_ValueItemSelected: null,
	ValueItemSelected (inputData) {
		mod._ValueItemSelected = inputData;

		if (!inputData) {
			mod.OLSKMobileViewInactive = false;	
		}
	},

	_ValueFilterText: '',

	// DATA

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// INTERFACE

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) { // #spec
			return;
		}

		const handlerFunctions = {

			Escape () {
				if (!mod._ValueFilterText && !mod._ValueItemSelected) {
					OLSKCatalogDispatchEscapeOnEmpty && OLSKCatalogDispatchEscapeOnEmpty();
				}

				mod.ControlDeselect();
			},
			
		};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	// CONTROL

	ControlSelect(inputData) {
		mod.ValueItemSelected(inputData);

		if (!inputData) {
			return !mod.DataIsMobile() && mod.ControlFocusMaster();
		}

		// mod.OLSKMobileViewInactive = true;

		// setTimeout(mod.ControlFocusDetail);
	},

	ControlFilterWithThrottle (inputData) {
		mod._ValueFilterText = inputData;

		OLSKThrottle.OLSKThrottleMappedTimeout(mod, '_ValueFilterThrottle', {
			OLSKThrottleDuration: 200,
			OLSKThrottleCallback: (function () {
				return mod.ControlFilterWithNoThrottle(inputData);
			}),
		});

		if (OLSK_SPEC_UI()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueFilterThrottle);
		}
	},

	ControlFilterWithNoThrottle (inputData) {
		if (mod._ValueArchiveCount) {
			(mod._ValueArchiveIsVisible = !!inputData) ? OLSKCatalogDispatchArchivedShow() : OLSKCatalogDispatchArchivedHide();
		}

		mod.ValueItemsVisible(mod._ValueItemsAll);

		if (!inputData) {
			return mod.ControlSelect(null);
		}

		if (!mod._ValueItemsVisible.length) {
			return mod.ControlSelect(null);
		}

		mod.ValueItemSelected(mod._ValueItemsVisible.slice().sort(function (a, b) {
			const isExact = function (e) {
				return OLSKCatalogExactFunction(e, inputData);
			};

			return isExact(a) > isExact(b) ? -1 : 1;
		}).shift());
	},

	ControlFocusMaster () {
		document.querySelector('.OLSKMasterListFilterField').focus();
	},

	ControlDeselect () {
		mod.ValueArchiveCount(mod._ValueItemsAll);

		mod._ValueItemsAll.sort(OLSKCatalogSortFunction);

		mod.ControlFilterWithNoThrottle(mod._ValueFilterText = '');

		if (typeof OLSK_SPEC_UI !== 'undefined' && !OLSK_SPEC_UI()) {
			document.querySelector('.OLSKMasterListBody').scrollTo(0, 0);
		}
	},

	// MESSAGE

	OLSKMasterListDispatchFilter (inputData) {
		mod.ControlFilterWithThrottle(inputData);
	},

	OLSKMasterListDispatchSubmit () {
		mod._ValueFilterText && OLSKCatalogDispatchFilterSubmit && OLSKCatalogDispatchFilterSubmit(mod._ValueFilterText)
	},

	// SETUP

	SetupEverything() {
		mod.SetupFocus();
	},

	SetupFocus() {
		setTimeout(mod.ControlFocusMaster);
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKMasterList from 'OLSKMasterList';
import OLSKDetailPlaceholder from 'OLSKDetailPlaceholder';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="OLSKCatalog">

<OLSKMasterList
	OLSKMasterListItems={ mod._ValueItemsVisible }
	OLSKMasterListItemSelected={ mod._ValueItemSelected }

	OLSKMasterListFilterText={ mod._ValueFilterText }
	OLSKMasterListFilterFieldPlaceholderText={ OLSKMasterListFilterFieldPlaceholderText }

	OLSKMasterListDispatchClick={ OLSKCatalogDispatchClick }
	OLSKMasterListDispatchArrow={ OLSKCatalogDispatchArrow }
	OLSKMasterListDispatchFilter={ mod.OLSKMasterListDispatchFilter }
	OLSKMasterListDispatchSubmit={ mod.OLSKMasterListDispatchSubmit }

	let:OLSKResultsListItem={ e }

	OLSKMasterListItemAccessibilitySummaryFunction={ OLSKMasterListItemAccessibilitySummaryFunction }	

	OLSKMobileViewInactive={ mod.OLSKMobileViewInactive }
	>
	<div slot="OLSKMasterListToolbarHead">
		{#if $$slots.OLSKMasterListToolbarHead}
			<slot name="OLSKMasterListToolbarHead"></slot>	
		{/if}
	</div>

	<div slot="OLSKMasterListToolbarTail">
		{#if $$slots.OLSKMasterListToolbarTail}
			<slot name="OLSKMasterListToolbarTail"></slot>	
		{/if}
	</div>

	<slot></slot>

	<div slot="OLSKMasterListItem">
		{#if $$slots.OLSKMasterListItem}
			<slot name="OLSKMasterListItem" OLSKResultsListItem={ e }></slot>	
		{/if}
	</div>

	<div slot="OLSKMasterListBodyTail">
		{#if $$slots.OLSKMasterListBodyTail}
			<slot name="OLSKMasterListBodyTail"></slot>	
		{/if}
	</div>
</OLSKMasterList>

<div class="OLSKCatalogDetail OLSKViewportDetail" class:OLSKMobileViewInactive={ !mod.OLSKMobileViewInactive } aria-hidden={ mod.OLSKMobileViewInactive ? true : null }>
	{#if !mod._ValueItemSelected }
		<OLSKDetailPlaceholder />
	{/if}

	{#if mod._ValueItemSelected }
		{#if $$slots.OLSKCatalogDetailContent }
			<slot name="OLSKCatalogDetailContent" OLSKCatalogItemSelected={ mod._ValueItemSelected }></slot>	
		{/if}
	{/if}
</div>

</div>

<style>
.OLSKCatalog {
	width: 100%;
	display: flex;
}

@media screen and (max-width: 760px) {

.OLSKCatalogDetail, :global(.OLSKMasterList) {
	flex-grow: 1;
}

}

.OLSKCatalogDetail {
	/* OLSKCatalogDetail:Parent */
	display: flex;
	flex-direction: column;
}

@media screen and (min-width: 760px) {

.OLSKCatalogDetail > :global(.OLSKDetailPlaceholder) {
	/* OLSKCatalogDetail:Child */
	flex-grow: 1;
}

}
</style>
