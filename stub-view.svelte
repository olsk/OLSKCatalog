<script>
const mod = {

	// VALUE

	_ValueItemsAll: [],
	ValueItemsAll (inputData) {
		mod._ValueItemsAll = inputData;
	},

	// DATA

	DataItemValid () {
		return {
			XYZItemID: Math.random().toString(),
		};
	},

	// INTERFACE

	InterfaceCreateButtonDidClick () {
		mod.ControlItemCreate();
	},

	InterfaceBackButtonDidClick () {
		mod._OLSKCatalog.modPublic.OLSKCatalogFocusMaster();
	},

	InterfaceDiscardButtonDidClick () {
		mod.ControlItemDiscard(mod._ValueItemSelected);
	},

	// CONTROL

	ControlItemCreate () {
		const item = mod.DataItemValid();
		
		mod.ValueItemsAll([item].concat(mod._ValueItemsAll));

		mod.ControlItemSelect(item);
	},

	ControlItemDiscard (inputData) {
		mod.ValueItemsAll(mod._ValueItemsAll.filter(function (e) {
			return e !== inputData;
		}));

		mod.ControlItemSelect(null);
	},

	ControlItemSelect (inputData) {
		mod._ValueItemSelected = inputData;

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();
	},

	// MESSAGE

	OLSKCatalogDispatchClick (inputData) {
		mod.ControlItemSelect(inputData);
	},

	OLSKCatalogDispatchArrow (inputData) {
		mod.ControlItemSelect(inputData);
	},

};

const inputData = Object.assign({
	OLSKCatalogFilterText: '',
	OLSKCatalogItemAccessibilitySummaryFor (inputData) {
		return inputData.XYZItemID;
	},
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

import OLSKCatalog from './main.svelte';
import _OLSKSharedCreate from './node_modules/OLSKUIAssets/_OLSKSharedCreate.svg';
import _OLSKSharedBack from './node_modules/OLSKUIAssets/_OLSKSharedBack.svg';
import _OLSKSharedDiscard from './node_modules/OLSKUIAssets/_OLSKSharedDiscard.svg';
</script>

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKCatalogItems={ mod._ValueItemsAll }
	OLSKCatalogItemSelected={ mod._ValueItemSelected }
	OLSKCatalogDispatchClick={ mod.OLSKCatalogDispatchClick }
	OLSKCatalogDispatchArrow={ mod.OLSKCatalogDispatchArrow }

	{ ...inputData }

	let:OLSKResultsListItem={ item }
	>

	<!-- MASTER -->

	<em slot="OLSKMasterListToolbarHead" id="TestOLSKMasterListToolbarHead">TestOLSKMasterListToolbarHead</em>
	
	<div class="OLSKToolbarElementGroup" slot="OLSKMasterListToolbarTail" id="TestOLSKMasterListToolbarTail">
		<div>
			<button class="TestItemCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton"on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">
				<div>{@html _OLSKSharedCreate }</div>
			</button>
		</div>
	</div>
	
	<em id="TestOLSKMasterListMain">TestOLSKMasterListMain</em>

	<div slot="OLSKMasterListItem" class="TestOLSKMasterListItem">{ item.XYZItemID }</div>
	
	<em slot="OLSKMasterListBodyTail" id="TestOLSKMasterListBodyTail">TestOLSKMasterListBodyTail</em>

	<!-- DETAIL -->
	
	<div slot="OLSKCatalogDetailContent" id="TestOLSKCatalogDetailContent">
		<header class="OLSKToolbar OLSKCommonEdgeBottom">
			<button class="TestItemBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton"on:click={ mod.InterfaceBackButtonDidClick }>
				<div>{@html _OLSKSharedBack }</div>
			</button>
			<button class="TestItemDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton"on:click={ mod.InterfaceDiscardButtonDidClick }>
				<div>{@html _OLSKSharedDiscard }</div>
			</button>
		</header>
	</div>
</OLSKCatalog>

<style>

:root {
	font-size: var(--OLSKCommonFontSize);
}
em {
	display: inline-table;
	max-width: 16px;
	overflow: hidden;
}
</style>
