<script>
const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	// DATA

	DataItemValid (inputData = {}) {
		return Object.assign({
			XYZItemID: Math.random().toString(),
			XYZItemBlurb: Math.random().toString(),
			XYZItemDate: new Date(),
		}, inputData);
	},

	// INTERFACE

	InterfaceCreateButtonDidClick () {
		mod.ControlItemCreate();
	},

	InterfaceBackButtonDidClick () {
		mod._OLSKCatalog.modPublic.OLSKCatalogFocusMaster();
	},

	InterfaceArchiveButtonDidClick () {
		mod.ControlItemArchive(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	InterfaceUnarchiveButtonDidClick () {
		mod.ControlItemUnarchive(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	InterfaceDiscardButtonDidClick () {
		mod.ControlItemDiscard(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	InterfaceFieldDidInput () {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(Object.assign(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected(), {
			XYZItemBlurb: this.value,
			XYZItemDate: new Date(),
		}));
	},

	InterfaceExternalFilterDidInput () {
		mod._OLSKCatalog.modPublic.OLSKCatalogFilterWithNoThrottle(this.value);

	},

	InterfaceStashButtonDidClick () {
		mod._OLSKCatalog.modPublic.OLSKCatalogStashEnabled(true);
	},

	// CONTROL

	ControlItemCreate () {
		mod.ControlItemActivate(mod._OLSKCatalog.modPublic.OLSKCatalogInsert(mod.DataItemValid()));
	},

	ControlItemActivate (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();

		mod._OLSKCatalog.modPublic.OLSKCatalogActivateDetail();
	},

	ControlItemArchive (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(Object.assign(inputData, {
			XYZItemIsArchived: true,
			XYZItemDate: new Date(),
		}));
	},

	ControlItemUnarchive (inputData) {
		delete inputData.XYZItemIsArchived;

		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(Object.assign(inputData, {
			XYZItemDate: new Date(),
		}));
	},

	ControlItemDiscard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);
	},

};

const inputData = Object.assign({

	OLSKCollectionItemAccessibilitySummaryFunction (inputData) {
		return inputData.XYZItemBlurb.split('\n').shift();
	},

	OLSKCatalogSortFunction (a, b) {
		if (a.XYZItemIsArchived !== b.XYZItemIsArchived) {
			return a.XYZItemIsArchived ? 1 : -1;
		}

		return b.XYZItemDate - a.XYZItemDate;
	},

	OLSKCatalogIsMatch (item, text) {
		return item.XYZItemBlurb.match(text);
	},

	OLSKCatalogExactSortFunction (needle, a, b) {
		return uDescending(a.XYZItemBlurb.startsWith(needle), b.XYZItemBlurb.startsWith(needle));
	},

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.XYZItemID;
	},

	_OLSKCatalogArchiveField: 'XYZItemIsArchived',

	OLSKCollectionDispatchClick (inputData) {
		mod.ControlItemActivate(inputData);
	},

	OLSKCollectionDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

	OLSKCatalogDispatchDetailActivate () {
		document.querySelector('.TestItemField').focus();
	},

	OLSKCatalogDispatchMasterShouldActivate () {
		return document.activeElement === document.querySelector('.TestItemField');
	},

	OLSKCatalogDispatchArchivedHide: (function  () {
		window.TestOLSKCatalogDispatchArchivedHide.innerHTML = parseInt(window.TestOLSKCatalogDispatchArchivedHide.innerHTML) + 1;

		mod._ValueRevealArchiveIsVisible = true;
	}),

	OLSKCatalogDispatchArchivedShow: (function  () {
		window.TestOLSKCatalogDispatchArchivedShow.innerHTML = parseInt(window.TestOLSKCatalogDispatchArchivedShow.innerHTML) + 1;

		mod._ValueRevealArchiveIsVisible = false;
	}),

	OLSKCatalogDispatchFilterSubmit: (function  (inputData) {
		window.TestOLSKCatalogDispatchFilterSubmit.innerHTML = parseInt(window.TestOLSKCatalogDispatchFilterSubmit.innerHTML) + 1;
		window.TestOLSKCatalogDispatchFilterSubmitData.innerHTML = inputData;

		mod._ValueRevealArchiveIsVisible = false;
	}),

	OLSKCatalogDispatchQuantity: (function  (inputData) {
		window.TestOLSKCatalogDispatchQuantity.innerHTML = parseInt(window.TestOLSKCatalogDispatchQuantity.innerHTML) + 1;
		window.TestOLSKCatalogDispatchQuantityData.innerHTML = inputData;
	}),

	OLSKCatalogDispatchEscapeOnEmpty: (function  () {
		window.TestOLSKCatalogDispatchEscapeOnEmpty.innerHTML = parseInt(window.TestOLSKCatalogDispatchEscapeOnEmpty.innerHTML) + 1;
	}),

	OLSKCatalogDispatchStash: (function  (inputData) {
		window.TestOLSKCatalogDispatchStash.innerHTML = parseInt(window.TestOLSKCatalogDispatchStash.innerHTML) + 1;
		window.TestOLSKCatalogDispatchStashData.innerHTML = inputData.length;
	}),

}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
	if (e[0] === 'OLSKCatalogItems') {
		e[1] = JSON.parse(e[1]);
	}

	return e;
})));

import OLSKCatalog from './main.svelte';
</script>

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }
	
	{ ...inputData }

	let:OLSKCollectionItem
	>

	<!-- MASTER -->

	<em slot="OLSKNarrowToolbarHead" id="TestOLSKNarrowToolbarHead">TestOLSKNarrowToolbarHead</em>
	
	<div class="OLSKToolbarElementGroup" slot="OLSKNarrowToolbarTail" id="TestOLSKNarrowToolbarTail">
		<button class="TestItemStashButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton"on:click={ mod.InterfaceStashButtonDidClick }>✔️</button>
		<button class="TestItemCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton"on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">➕</button>
	</div>
	
	<em id="TestOLSKNarrowMain">TestOLSKNarrowMain</em>

	<div slot="OLSKCollectionItem" class="TestOLSKCollectionItem" class:TestOLSKCollectionItemArchived={ OLSKCollectionItem.XYZItemIsArchived } >{ OLSKCollectionItem.XYZItemBlurb }</div>
	
	<div slot="OLSKNarrowBodyTail" id="TestOLSKNarrowBodyTail">
		<em>TestOLSKNarrowBodyTail</em>
		{#if mod._ValueRevealArchiveIsVisible }
			<button class="TestRevealArchiveButton OLSKDecorPress" on:click={ mod._OLSKCatalog.modPublic.OLSKCatalogRevealArchive }>Reveal Archive</button>
		{/if}
	</div>

	<!-- DETAIL -->
	
	<div slot="OLSKCatalogDetailContent" id="TestOLSKCatalogDetailContent" let:OLSKCatalogItemSelected>
	
	<header class="OLSKToolbar OLSKCommonEdgeBottom">
		<button class="TestItemBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton"on:click={ mod.InterfaceBackButtonDidClick }>🔙</button>

		{#if !OLSKCatalogItemSelected.XYZItemIsArchived }
			<button class="TestItemArchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" on:click={ mod.InterfaceArchiveButtonDidClick }>Ar</button>
		{/if}

		{#if OLSKCatalogItemSelected.XYZItemIsArchived }
			<button class="TestItemUnarchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" on:click={ mod.InterfaceUnarchiveButtonDidClick }>UAr</button>
		{/if}
		
		<button class="TestItemDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton"on:click={ mod.InterfaceDiscardButtonDidClick }>🗑</button>
	</header>

	<div class="OLSKDecor">
		<textarea class="TestItemField" on:input={ mod.InterfaceFieldDidInput }>{ OLSKCatalogItemSelected.XYZItemBlurb }</textarea>
		<textarea class="TestItemField2"></textarea>
	</div>
	
	</div>
</OLSKCatalog>

<p>
	<input class="TestExternalFilter" on:input={ mod.InterfaceExternalFilterDidInput }>
</p>
<p>
	<button id="FakeRemoteInsert" on:click={ () => mod._OLSKCatalog.modPublic.OLSKCatalogInsert(mod.DataItemValid({
		XYZItemBlurb: 'add',
		XYZItemDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
	})) }></button>
</p>
<p>
	<button id="FakeRemoteUpdate" on:click={ () => mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(Object.assign(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().sort(mod.OLSKCatalogSortFunction).pop(), {
		XYZItemBlurb: 'change',
		XYZItemDate: new Date(),
	})) }></button>
</p>
<p>
	<button id="FakeRemoteRemove" on:click={ () => mod._OLSKCatalog.modPublic.OLSKCatalogRemove(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().sort(mod.OLSKCatalogSortFunction).pop()) }></button>
</p>
<p>
	<button id="FakeArchivedInsert" on:click={ () => mod._OLSKCatalog.modPublic.OLSKCatalogInsert(mod.DataItemValid({
		XYZItemBlurb: 'archived',
		XYZItemDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
		XYZItemIsArchived: true,
	})) }></button>
</p>

<style>
:root {
	font-size: var(--OLSKCommonFontSize);
}

.TestOLSKCollectionItemArchived {
	border-left: 3px grey solid;
	padding-left: 3px;
}

em {
	display: inline-table;
	max-width: 16px;
	overflow: hidden;
}
</style>
