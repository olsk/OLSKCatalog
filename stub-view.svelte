<script>
const mod = {

	// DATA

	DataItemValid () {
		return {
			XYZItemBlurb: Math.random().toString(),
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
		mod.ControlItemDiscard(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	InterfaceFieldDidInput () {
		mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected().XYZItemBlurb = this.value;

		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	// CONTROL

	ControlItemCreate () {
		mod.ControlItemSelect(mod._OLSKCatalog.modPublic.OLSKCatalogInsert(mod.DataItemValid()));
	},

	ControlItemDiscard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);

		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(null);
	},

	ControlItemSelect (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();
	},

	// MESSAGE

	OLSKCatalogDispatchClick (inputData) {
		mod.ControlItemSelect(inputData);
	},

	OLSKCatalogDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

};

const inputData = Object.assign({
	OLSKCatalogItemAccessibilitySummaryFor (inputData) {
		return inputData.XYZItemBlurb;
	},
	OLSKCatalogDispatchFilter: (function  (inputData) {
		window.TestOLSKCatalogDispatchFilter.innerHTML = parseInt(window.TestOLSKCatalogDispatchFilter.innerHTML) + 1;
		window.TestOLSKCatalogDispatchFilterData.innerHTML = inputData;
	}),
}, Array.from((new window.URLSearchParams(window.location.search)).entries()));

import OLSKCatalog from './main.svelte';
import _OLSKSharedCreate from './node_modules/OLSKUIAssets/_OLSKSharedCreate.svg';
import _OLSKSharedBack from './node_modules/OLSKUIAssets/_OLSKSharedBack.svg';
import _OLSKSharedDiscard from './node_modules/OLSKUIAssets/_OLSKSharedDiscard.svg';
</script>

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKCatalogDispatchClick={ mod.OLSKCatalogDispatchClick }
	OLSKCatalogDispatchArrow={ mod.OLSKCatalogDispatchArrow }

	{ ...inputData }

	let:OLSKResultsListItem
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

	<div slot="OLSKMasterListItem" class="TestOLSKMasterListItem">{ OLSKResultsListItem.XYZItemBlurb }</div>
	
	<em slot="OLSKMasterListBodyTail" id="TestOLSKMasterListBodyTail">TestOLSKMasterListBodyTail</em>

	<!-- DETAIL -->
	
	<div slot="OLSKCatalogDetailContent" id="TestOLSKCatalogDetailContent" let:OLSKCatalogItemSelected>
	
	<header class="OLSKToolbar OLSKCommonEdgeBottom">
		<button class="TestItemBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton"on:click={ mod.InterfaceBackButtonDidClick }>
			<div>{@html _OLSKSharedBack }</div>
		</button>
		<button class="TestItemDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton"on:click={ mod.InterfaceDiscardButtonDidClick }>
			<div>{@html _OLSKSharedDiscard }</div>
		</button>
	</header>

	<div class="OLSKDecor">
		<input class="TestOLSKCatalogItemSelected" value={ OLSKCatalogItemSelected.XYZItemBlurb } on:input={ mod.InterfaceFieldDidInput } autofocus />
	</div>
	
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
