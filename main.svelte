<script>
export let OLSKMasterListItemAccessibilitySummaryFor;

export let OLSKMasterListFilterFieldPlaceholderText = '';

export let _OLSKCatalogExcludeField = null;

export let OLSKCatalogDispatchClick;
export let OLSKCatalogDispatchArrow;

export let OLSKCatalogDispatchSortFunction;
export let OLSKCatalogDispatchFilterFunction;
export let OLSKCatalogDispatchExactFunction;

export let _OLSKCatalogDispatchKey;

export const modPublic = {

	// DATA

	_OLSKCatalogDataItemsAll () {
		return mod._ValueItemsAll.slice();
	},

	OLSKCatalogDataItemSelected () {
		return mod._ValueItemSelected;
	},

	// CONTROL
	
	OLSKCatalogInsert (inputData) {
		mod.ValueItemsAll([inputData].concat(mod._ValueItemsAll));

		return inputData;
	},

	OLSKCatalogSelect (inputData) {
		mod._ValueItemSelected = inputData;
	},
	
	OLSKCatalogUpdate (inputData) {
		mod.ValueItemsAll(mod._ValueItemsAll.map(function (e) {
			return _OLSKCatalogDispatchKey(e) === _OLSKCatalogDispatchKey(inputData) ? inputData : e;
		}));
	},
	
	OLSKCatalogRemove (inputData) {
		mod.ValueItemsAll(mod._ValueItemsAll.filter(function (e) {
			return _OLSKCatalogDispatchKey(e) !== _OLSKCatalogDispatchKey(inputData);
		}));
	},
	
	OLSKCatalogFocusDetail () {
		mod.OLSKMobileViewInactive = true;
	},
	
	OLSKCatalogFocusMaster () {
		mod.OLSKMobileViewInactive = false;

		mod.ControlFocusMaster();
	},

};

const mod = {

	OLSKMobileViewInactive: false,

	// VALUE

	_ValueItemsAll: [],
	ValueItemsAll (inputData) {
		mod.ValueItemsVisible(mod._ValueItemsAll = inputData);
	},

	_ValueItemsVisible: [],
	ValueItemsVisible (inputData, shouldSort = true) {
		const items = inputData.filter(function (e) {
			if (!mod._ValueFilterText) {
				return !_OLSKCatalogExcludeField || (_OLSKCatalogExcludeField && !e[_OLSKCatalogExcludeField]);
			}
			
			return OLSKCatalogDispatchFilterFunction(e, mod._ValueFilterText);
		});

		mod._ValueItemsVisible = shouldSort ? items.sort(OLSKCatalogDispatchSortFunction) : items;
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
				mod.ControlFilter('');

				if (typeof OLSK_SPEC_UI !== 'undefined' && !OLSK_SPEC_UI()) {
					document.querySelector('.OLSKMasterListBody').scrollTo(0, 0);
				}
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

	ControlFilter (inputData) {
		mod._ValueFilterText = inputData;

		mod.ValueItemsVisible(mod._ValueItemsAll);

		if (!inputData) {
			return mod.ControlSelect(null);
		}

		if (!mod._ValueItemsVisible.length) {
			return mod.ControlSelect(null);
		}

		mod.ValueItemSelected(mod._ValueItemsVisible.slice().sort(function (a, b) {
			const isExact = function (e) {
				return OLSKCatalogDispatchExactFunction(e, inputData);
			};

			return isExact(a) > isExact(b) ? -1 : 1;
		}).shift());
	},

	ControlFocusMaster () {
		document.querySelector('.OLSKMasterListFilterField').focus();
	},

	// MESSAGE

	OLSKMasterListDispatchFilter (inputData) {
		mod.ControlFilter(inputData);
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

	let:OLSKResultsListItem={ e }

	OLSKMasterListItemAccessibilitySummaryFor={ OLSKMasterListItemAccessibilitySummaryFor }	

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

:global(.OLSKMasterList) {
	/* OLSKCatalogDetail:Child */
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
