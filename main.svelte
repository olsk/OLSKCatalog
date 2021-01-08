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
	let:OLSKResultsListItem={ item }
	OLSKMasterListItemAccessibilitySummaryFor={ OLSKCatalogItemAccessibilitySummaryFor }	
	OLSKMobileViewInactive={ OLSKMobileViewInactive }
	>
</OLSKMasterList>

<div class="OLSKCatalogDetail">
	<OLSKDetailPlaceholder />	
</div>

</div>
