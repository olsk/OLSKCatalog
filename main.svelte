<script>
export let OLSKCatalogFilterText;
export let OLSKCatalogItems;
export let OLSKCatalogItemSelected = null;
export let OLSKCatalogItemAccessibilitySummaryFor;
export let OLSKCatalogDispatchClick;
export let OLSKCatalogDispatchArrow;
export let OLSKCatalogDispatchFilter;

export const modPublic = {
	
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

	// CONTROL

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

<div class="OLSKCatalog">

<OLSKMasterList
	OLSKMasterListItems={ OLSKCatalogItems }
	OLSKMasterListItemSelected={ OLSKCatalogItemSelected }
	OLSKMasterListFilterText={ OLSKCatalogFilterText }
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
	{#if !OLSKCatalogItemSelected }
		<OLSKDetailPlaceholder />
	{/if}

	{#if OLSKCatalogItemSelected }
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
