<script>
const inputData = Object.assign({
	OLSKCatalogItems: [],
	OLSKCatalogFilterText: '',
	OLSKCatalogItemAccessibilitySummaryFor (inputData) {
		return inputData.TestObjectID.repeat(2);
	},
	OLSKCatalogDispatchClick: (function  (inputData) {
		window.TestOLSKCatalogDispatchClick.innerHTML = parseInt(window.TestOLSKCatalogDispatchClick.innerHTML) + 1;
		window.TestOLSKCatalogDispatchClickData.innerHTML = JSON.stringify(inputData);
	}),
	OLSKCatalogDispatchArrow: (function  (inputData) {
		window.TestOLSKCatalogDispatchArrow.innerHTML = parseInt(window.TestOLSKCatalogDispatchArrow.innerHTML) + 1;
		window.TestOLSKCatalogDispatchArrowData.innerHTML = JSON.stringify(inputData);
	}),
	OLSKCatalogDispatchFilter: (function  (inputData) {
		window.TestOLSKCatalogDispatchFilter.innerHTML = parseInt(window.TestOLSKCatalogDispatchFilter.innerHTML) + 1;
		window.TestOLSKCatalogDispatchFilterData.innerHTML = inputData;
	}),
}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
	if (['OLSKCatalogItems', 'OLSKCatalogItemSelected', 'OLSKCatalogFilterFieldClearButton', 'OLSKCatalogFilterFieldAutofocus'].includes(e[0])) {
		e[1] = JSON.parse(e[1]);
	}

	if (e[0] === 'OLSKCatalogItemSelected') {
		e[1] = coll[0][1].filter(function (item) {
			return item.TestObjectID === e[1].TestObjectID;
		}).shift();
	}

	return e;
})));

import Module from './main.svelte';
</script>

<Module
	{ ...inputData }
	let:OLSKResultsListItem={ item }
	>
	<em slot="OLSKMasterListToolbarHead" id="TestOLSKMasterListToolbarHead">TestOLSKMasterListToolbarHead</em>
	<em slot="OLSKMasterListToolbarTail" id="TestOLSKMasterListToolbarTail">TestOLSKMasterListToolbarTail</em>
	<em id="TestOLSKMasterListMain">TestOLSKMasterListMain</em>
	<em slot="OLSKMasterListBodyTail" id="TestOLSKMasterListBodyTail">TestOLSKMasterListBodyTail</em>
</Module>

<style>
em {
	display: inline-table;
	max-width: 16px;
	overflow: hidden;
}
</style>
