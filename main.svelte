<script>
export let OLSKCollectionItemAccessibilitySummaryFunction;
export let OLSKCollectionItemClass = '';

export let OLSKNarrowFilterFieldPlaceholderText = '';

export let _OLSKCatalogArchiveField = null;

export let OLSKCatalogSortFunction;
export let OLSKCatalogIsMatch;
export let OLSKCatalogExactSortFunction = null;

export let _OLSKCatalogDispatchKey;

export let OLSKCollectionChunkFunction = null;
export let OLSKCollectionDispatchClick;
export let OLSKCollectionDispatchArrow;
export let OLSKCollectionDispatchStash = null;
export let OLSKCatalogDispatchDetailActivate = null;
export let OLSKCatalogDispatchMasterShouldActivate = null;
export let OLSKCatalogDispatchArchivedHide = null;
export let OLSKCatalogDispatchArchivedShow = null;
export let OLSKCatalogDispatchFilterSubmit = null;
export let OLSKCatalogDispatchQuantity = null;
export let OLSKCatalogDispatchEscapeOnEmpty = null;
export let OLSKCatalogDispatchStash = null;

export let OLSKCatalogItems = [];

import { OLSKLocalized } from 'OLSKInternational';
import { OLSKFormatted } from 'OLSKString';
import { OLSK_SPEC_UI } from  'OLSKSpec';

import OLSKThrottle from  'OLSKThrottle';

export const modPublic = {

	// DATA

	_OLSKCatalogDataItemsAll () {
		return mod._ValueItemsAll.slice();
	},

	OLSKCatalogDataItemSelected () {
		return mod._ValueItemSelected;
	},

	_OLSKCatalogDataFilterText () {
		return mod._ValueFilterText;
	},

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// CONTROL
	
	OLSKCatalogInsert (inputData) {
		mod.ValueItemsAll([inputData].concat(mod._ValueItemsAll), !mod._ValueItemSelected);

		OLSKCatalogDispatchQuantity && OLSKCatalogDispatchQuantity(mod._ValueItemsAll.length);

		return inputData;
	},

	_OLSKCatalogInsertAndSort (inputData) {
		modPublic.OLSKCatalogInsert(inputData);
		
		mod.ValueItemsAll([].concat(mod._ValueItemsAll), true);

		return inputData;
	},

	OLSKCatalogSelect (inputData) {
		return (mod._ValueItemSelected = inputData);
	},
	
	OLSKCatalogUpdate (inputData) {
		mod._ValueItemsAll = mod._ValueItemsAll.map(function (e) {
			return _OLSKCatalogDispatchKey(e) === _OLSKCatalogDispatchKey(inputData) ? inputData : e;
		});

		mod._ValueItemsVisible = mod._ValueItemsVisible.map(function (e) {
			return _OLSKCatalogDispatchKey(e) === _OLSKCatalogDispatchKey(inputData) ? inputData : e;
		});

		if (!mod._ValueItemSelected) {
			mod.ValueItemsAll(mod._ValueItemsAll);
		}

		return inputData;
	},
	
	OLSKCatalogRemove (inputData) {
		mod.ValueItemsAll(mod._ValueItemsAll.filter(function (e) {
			return _OLSKCatalogDispatchKey(e) !== _OLSKCatalogDispatchKey(inputData);
		}), !mod._ValueItemSelected);

		OLSKCatalogDispatchQuantity && OLSKCatalogDispatchQuantity(mod._ValueItemsAll.length);

		if (!mod._ValueItemSelected) {
			return
		}

		if (_OLSKCatalogDispatchKey(inputData) !== _OLSKCatalogDispatchKey(mod._ValueItemSelected)) {
			return;
		}

		modPublic.OLSKCatalogSelect(null);

		modPublic.OLSKCatalogFocusMaster();

		mod.ControlFocusMaster();
	},

	OLSKCatalogActivateDetail () {
		if (mod.DataIsMobile()) {
			return;
		}
		
		if (mod._OLSKCatalogDetail) {
			return OLSKCatalogDispatchDetailActivate && OLSKCatalogDispatchDetailActivate();
		}

		mod._ValueShouldActivate = true;
	},
	
	OLSKCatalogFilterWithNoThrottle (inputData) {
		mod.ControlFilterWithNoThrottle(mod._ValueFilterText = inputData);
	},

	OLSKCatalogRevealArchive () {
		mod._ValueArchiveIsVisible = true;

		mod.ValueItemsVisible(mod._ValueItemsAll);

		OLSKCatalogDispatchArchivedShow();
	},
	
	OLSKCatalogFocusDetail () {
		mod.OLSKMobileViewInactive = true;
	},
	
	OLSKCatalogFocusMaster () {
		mod.OLSKMobileViewInactive = false;

		if (!mod.DataIsMobile()) {
			return;
		}

		const element = document.querySelector('.OLSKCollectionItemLocus');

		if (!element) {
			return;
		}

		setTimeout(function () {
			element.scrollIntoView({
				block: 'center',
				inline: 'center',
			});
		});
	},

	OLSKCatalogStashEnabled (inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValueStashEnabled;
		}

		const selected = mod._ValueItemSelected;

		if (!modPublic._OLSKNarrow.modPublic._OLSKCollection.modPublic.OLSKCollectionStashEnabled(mod._ValueStashEnabled = inputData) || !selected) {
			return;
		}

		mod._ValueItemSelected = null;

		modPublic._OLSKNarrow.modPublic._OLSKCollection.modPublic._OLSKCollectionStashToggle(selected);
	},

};

const mod = {

	OLSKMobileViewInactive: false,

	// VALUE

	_ValueItemsAll: [],
	ValueItemsAll (inputData, shouldSort = true) {
		mod.ValueArchiveCount(inputData);

		mod.ValueItemsVisible(mod._ValueItemsAll = (shouldSort ? inputData.sort(OLSKCatalogSortFunction) : inputData), shouldSort);
	},

	_ValueArchiveCount: 0,
	_ValueArchiveIsVisible: false,
	ValueArchiveCount (inputData) {
		if (!_OLSKCatalogArchiveField) {
			return;
		}

		mod._ValueArchiveCount = inputData.filter(function (e) {
			return e[_OLSKCatalogArchiveField];
		}).length;
	},
	
	_ValueItemsVisible: [],
	ValueItemsVisible (inputData, shouldSort = true) {
		const items = inputData.filter(function (e) {
			if (!mod._ValueArchiveIsVisible && _OLSKCatalogArchiveField && e[_OLSKCatalogArchiveField]) {
				return false;
			}

			return !mod._ValueFilterText || OLSKCatalogIsMatch(e, mod._ValueFilterText);
		});

		mod._ValueItemsVisible = shouldSort ? items.sort(OLSKCatalogSortFunction) : items;
	},

	_ValueItemSelected: null,
	ValueItemSelected (inputData) {
		mod._ValueItemSelected = inputData;

		if (!inputData) {
			mod.OLSKMobileViewInactive = false;	
		}
	},

	_ValueFilterText: '',

	_ValueStashEnabled: false,

	// DATA

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// INTERFACE

	InterfaceStashDoneButtonDidClick () {
		OLSKCatalogDispatchStash && OLSKCatalogDispatchStash(modPublic._OLSKNarrow.modPublic._OLSKCollection.modPublic._OLSKCollectionStashItems);

		modPublic.OLSKCatalogStashEnabled(false);
	},

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) { // #spec
			return;
		}

		const handlerFunctions = {

			Escape () {
				if (!mod._ValueFilterText && !mod._ValueItemSelected) {
					OLSKCatalogDispatchEscapeOnEmpty && OLSKCatalogDispatchEscapeOnEmpty();
				}

				mod.ControlDeselect();
			},

			Tab () {
				if (document.activeElement === document.querySelector('.OLSKNarrowFilterField') && mod._ValueItemSelected) {
					return event.preventDefault(OLSKCatalogDispatchDetailActivate && OLSKCatalogDispatchDetailActivate());
				}

				if (event.shiftKey && document.activeElement !== document.querySelector('.OLSKNarrowFilterField') && OLSKCatalogDispatchMasterShouldActivate && OLSKCatalogDispatchMasterShouldActivate()) {
					return event.preventDefault(mod.ControlFocusMaster());
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
	},

	ControlFilterWithThrottle (inputData) {
		mod._ValueFilterText = inputData;

		OLSKThrottle.OLSKThrottleMappedTimeout(mod, '_ValueFilterThrottle', {
			OLSKThrottleDuration: 200,
			OLSKThrottleCallback: (function () {
				return mod.ControlFilterWithNoThrottle(mod._ValueFilterText);
			}),
		});

		if (OLSK_SPEC_UI()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueFilterThrottle);
		}
	},

	ControlFilterWithNoThrottle (inputData) {
		if (mod._ValueArchiveCount) {
			(mod._ValueArchiveIsVisible = !!inputData) ? OLSKCatalogDispatchArchivedShow() : OLSKCatalogDispatchArchivedHide();
		}

		mod.ValueItemsVisible(mod._ValueItemsAll);

		if (!inputData) {
			return mod.ControlSelect(null);
		}

		if (!mod._ValueItemsVisible.length) {
			return mod.ControlSelect(null);
		}

		OLSKCatalogExactSortFunction && mod.ValueItemSelected(mod._ValueItemsVisible.slice().sort(function (a, b) {
			return OLSKCatalogExactSortFunction(inputData, a, b);
		}).shift());
	},

	ControlFocusMaster () {
		mod.OLSKMobileViewInactive = false;
		
		if (mod.DataIsMobile()) {
			return;
		}

		document.querySelector('.OLSKNarrowFilterField').focus();
	},

	ControlFocusDetail () {
		mod.OLSKMobileViewInactive = true;

		setTimeout(mod.ControlFocusDetail);
	},

	ControlDeselect () {
		mod.ValueArchiveCount(mod._ValueItemsAll);

		mod._ValueItemsAll.sort(OLSKCatalogSortFunction);

		mod.ControlFilterWithNoThrottle(mod._ValueFilterText = '');

		if (typeof OLSK_SPEC_UI !== 'undefined' && !OLSK_SPEC_UI()) {
			document.querySelector('.OLSKNarrowBody').scrollTo(0, 0);
		}
	},

	// MESSAGE

	OLSKNarrowDispatchFilter (inputData) {
		mod.ControlFilterWithThrottle(inputData);
	},

	OLSKNarrowDispatchSubmit () {
		mod._ValueFilterText && OLSKCatalogDispatchFilterSubmit && OLSKCatalogDispatchFilterSubmit(mod._ValueFilterText)
	},

	OLSKCollectionDispatchStash (inputData) {
		mod._ValueStashCount = inputData.length;

		OLSKCollectionDispatchStash && OLSKCollectionDispatchStash(inputData);
	},

	// SETUP

	SetupEverything() {
		mod.SetupFocus();

		mod.SetupItems();
	},

	SetupFocus() {
		setTimeout(mod.ControlFocusMaster);
	},

	SetupItems () {
		mod.ValueItemsAll(OLSKCatalogItems);
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

	LifecycleDetailDidCreate () {
		if (!mod._ValueShouldActivate) {
			return;
		}

		delete mod._ValueShouldActivate;
		OLSKCatalogDispatchDetailActivate && OLSKCatalogDispatchDetailActivate();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKNarrow from 'OLSKNarrow';
import OLSKPlaceholder from 'OLSKPlaceholder';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="OLSKCatalog">

<OLSKNarrow
	bind:this={ modPublic._OLSKNarrow }
	OLSKCollectionSortFunction={ OLSKCatalogSortFunction }
	_OLSKCollectionDispatchKey={ _OLSKCatalogDispatchKey }
	OLSKCollectionChunkFunction={ OLSKCollectionChunkFunction }
	OLSKCollectionItemClass={ OLSKCollectionItemClass }
	
	OLSKCollectionItems={ mod._ValueItemsVisible }
	OLSKCollectionItemsLocus={ mod._ValueItemSelected }

	OLSKNarrowFilterText={ mod._ValueFilterText }
	OLSKNarrowFilterFieldPlaceholderText={ OLSKNarrowFilterFieldPlaceholderText }

	OLSKCollectionDispatchClick={ OLSKCollectionDispatchClick }
	OLSKCollectionDispatchArrow={ OLSKCollectionDispatchArrow }
	OLSKCollectionDispatchStash={ mod.OLSKCollectionDispatchStash }
	OLSKNarrowDispatchFilter={ mod.OLSKNarrowDispatchFilter }
	OLSKNarrowDispatchSubmit={ mod.OLSKNarrowDispatchSubmit }

	let:OLSKCollectionItem={ e }

	OLSKCollectionItemAccessibilitySummaryFunction={ OLSKCollectionItemAccessibilitySummaryFunction }	

	OLSKMobileViewInactive={ mod.OLSKMobileViewInactive }
	>
	<div slot="OLSKNarrowToolbarHead">
		{#if $$slots.OLSKNarrowToolbarHead}
			<slot name="OLSKNarrowToolbarHead"></slot>	
		{/if}
	</div>

	<div slot="OLSKNarrowToolbarTail">
		{#if mod._ValueStashEnabled }
			<div class="OLSKToolbarElementGroup">
				<button class="OLSKCatalogStashDoneButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" on:click={ mod.InterfaceStashDoneButtonDidClick }>OK</button>
			</div>
		{:else if $$slots.OLSKNarrowToolbarTail}
			<slot name="OLSKNarrowToolbarTail"></slot>	
		{/if}
	</div>

	<slot></slot>

	<div slot="OLSKCollectionItem">
		{#if $$slots.OLSKCollectionItem}
			<slot name="OLSKCollectionItem" OLSKCollectionItem={ e }></slot>	
		{/if}
	</div>

	<div slot="OLSKCollectionEmpty">
		<OLSKPlaceholder OLSKPlaceholderHTML={ OLSKLocalized('OLSKCatalogMasterPlaceholderText') } />
	</div>

	<div slot="OLSKNarrowBodyTail">
		{#if $$slots.OLSKNarrowBodyTail}
			<slot name="OLSKNarrowBodyTail"></slot>	
		{/if}
	</div>
</OLSKNarrow>

<div class="OLSKCatalogDetail OLSKViewportDetail" class:OLSKMobileViewInactive={ !mod.OLSKMobileViewInactive } aria-hidden={ mod.OLSKMobileViewInactive ? true : null }>
	{#if !mod._ValueItemSelected }
		<OLSKPlaceholder OLSKPlaceholderHTML={ !mod._ValueStashEnabled ? '' : OLSKFormatted(OLSKLocalized('OLSKCatalogStashPlaceholderTextFormat'), mod._ValueStashCount) } />
	{/if}

	{#if mod._ValueItemSelected }
		{#if $$slots.OLSKCatalogDetailContent }
			<div style="display: none;" use:mod.LifecycleDetailDidCreate bind:this={ mod._OLSKCatalogDetail }></div>
			<slot name="OLSKCatalogDetailContent" OLSKCatalogItemSelected={ mod._ValueItemSelected }></slot>	
		{/if}
	{/if}
</div>

</div>

<style>
.OLSKCatalog {
	width: 100%;
	display: flex;

	background: var(--OLSKCommonBackground);
}

.OLSKCatalog :global(.OLSKNarrowBody, .OLSKCollection, .OLSKCollectionEmpty, .OLSKCollectionEmpty *) {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

@media screen and (max-width: 760px) {

.OLSKCatalogDetail, :global(.OLSKNarrow) {
	border: none;
	
	flex-grow: 1;
}

}

.OLSKCatalog :global(.OLSKCollectionItem) {
	max-width: var(--OLSKViewportMasterWidth);
	overflow: hidden;
	text-overflow: ellipsis;
}

@media screen and (max-width: 760px) {

	.OLSKCatalog :global(.OLSKCollectionItem) {
		max-width: 99vw;
	}

}

.OLSKCatalogDetail {
	/* OLSKCatalogDetail:Parent */
	display: flex;
	flex-direction: column;
}

@media screen and (min-width: 760px) {

.OLSKCatalogDetail > :global(.OLSKPlaceholder) {
	/* OLSKCatalogDetail:Child */
	flex-grow: 1;
}

}

.OLSKCatalogStashDoneButton {
	color: var(--OLSKCommonForeground);
	font-weight: bold;
}
</style>
