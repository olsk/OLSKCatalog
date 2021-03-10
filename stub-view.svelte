<script>
const mod = {

	// DATA

	DataItemValid () {
		return {
			XYZItemID: Math.random().toString(),
			XYZItemBlurb: Math.random().toString(),
			XYZItemDate: new Date(),
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

	OLSKCatalogDispatchSortFunction (a, b) {
		return b.XYZItemDate - a.XYZItemDate;
	},

	OLSKCatalogDispatchFilterFunction (item, text) {
		return item.XYZItemBlurb.match(text);
	},

	OLSKCatalogDispatchExactFunction (item, text) {
		return item.XYZItemBlurb.startsWith(text);
	},

	OLSKMasterListItemAccessibilitySummaryFor (inputData) {
		return inputData.XYZItemBlurb.split('\n').shift();
	},

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.XYZItemID;
	},	

	OLSKCatalogDispatchClick (inputData) {
		mod.ControlItemSelect(inputData);
	},

	OLSKCatalogDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

	OLSKCatalogDispatchFilterWithNoThrottle: (function  (inputData) {
		window.TestOLSKCatalogDispatchFilterWithNoThrottle.innerHTML = parseInt(window.TestOLSKCatalogDispatchFilterWithNoThrottle.innerHTML) + 1;
		window.TestOLSKCatalogDispatchFilterWithNoThrottleData.innerHTML = inputData;
	}),

};

const inputData = Object.assign({}, Array.from((new window.URLSearchParams(window.location.search)).entries()));

import OLSKCatalog from './main.svelte';
import _OLSKSharedCreate from './node_modules/OLSKUIAssets/_OLSKSharedCreate.svg';
import _OLSKSharedBack from './node_modules/OLSKUIAssets/_OLSKSharedBack.svg';
import _OLSKSharedDiscard from './node_modules/OLSKUIAssets/_OLSKSharedDiscard.svg';
</script>

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }
	
	OLSKMasterListItemAccessibilitySummaryFor={ mod.OLSKMasterListItemAccessibilitySummaryFor }

	OLSKCatalogDispatchSortFunction={ mod.OLSKCatalogDispatchSortFunction }
	OLSKCatalogDispatchFilterFunction={ mod.OLSKCatalogDispatchFilterFunction }
	OLSKCatalogDispatchExactFunction={ mod.OLSKCatalogDispatchExactFunction }

	_OLSKCatalogDispatchKey={ mod._OLSKCatalogDispatchKey }

	OLSKCatalogDispatchClick={ mod.OLSKCatalogDispatchClick }
	OLSKCatalogDispatchArrow={ mod.OLSKCatalogDispatchArrow }
	OLSKCatalogDispatchFilterWithNoThrottle={ mod.OLSKCatalogDispatchFilterWithNoThrottle }

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
		<textarea class="TestOLSKCatalogItemSelected" on:input={ mod.InterfaceFieldDidInput }>{ OLSKCatalogItemSelected.XYZItemBlurb }</textarea>
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
