<script>
export let OLSKCatalogItemAccessibilitySummaryFor;
export let OLSKCatalogDispatchClick;
export let OLSKCatalogDispatchArrow;
export let OLSKCatalogDispatchFilter;

export const modPublic = {

	// DATA

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
	
	OLSKCatalogRemove (inputData) {
		mod.ValueItemsAll(mod._ValueItemsAll.filter(function (e) {
			return e !== inputData;
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
		mod._ValueItemsAll = inputData;
	},

	_ValueFilterText: '',

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

	ControlFilter (inputData) {
		mod._ValueItemSelected = null;

		mod.ControlFocusMaster();
	},

	ControlFocusMaster () {
		document.querySelector('.OLSKMasterListFilterField').focus();
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
	OLSKMasterListItems={ mod._ValueItemsAll }
	OLSKMasterListItemSelected={ mod._ValueItemSelected }
	OLSKMasterListFilterText={ mod._ValueFilterText }
	OLSKMasterListDispatchClick={ OLSKCatalogDispatchClick }
	OLSKMasterListDispatchArrow={ OLSKCatalogDispatchArrow }
	OLSKMasterListDispatchFilter={ OLSKCatalogDispatchFilter }
	let:OLSKResultsListItem={ e }
	OLSKMasterListItemAccessibilitySummaryFor={ OLSKCatalogItemAccessibilitySummaryFor }	
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
			<slot name="OLSKCatalogDetailContent"></slot>	
		{/if}
	{/if}
</div>

</div>

<style>
.OLSKCatalog {
	width: 100%;
	display: flex;
}
</style>
