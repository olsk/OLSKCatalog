<script>
export let OLSKCatalogFilterText;
export let OLSKCatalogItems;
export let OLSKCatalogItemSelected = null;
export let OLSKCatalogItemAccessibilitySummaryFor;
export let OLSKCatalogDispatchClick;
export let OLSKCatalogDispatchArrow;
export let OLSKCatalogDispatchFilter;
export let OLSKMobileViewInactive = false;

const mod = {

};

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
	OLSKMobileViewInactive={ OLSKMobileViewInactive }
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

<div class="OLSKCatalogDetail OLSKViewportDetail">
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
