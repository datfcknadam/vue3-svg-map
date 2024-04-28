<template>
	<svg-map
		v-bind="$attrs"
		role="group"
		location-role="checkbox"
		location-tabindex="0"
		:is-location-selected="isLocationSelected"
		@select="toggleLocation"
	>
		<!-- Pass down slots to SvgMap: https://stackoverflow.com/a/50892881/9826498 -->
		<template
			v-for="(_, slotName) of $slots"
			v-slot:[slotName]="scope"
		>
			<slot
				v-bind="scope"
				:name="slotName"
			/>
		</template>
	</svg-map>
</template>

<script>
import SvgMap from './svg-map.vue'

export default {
	name: 'CheckboxSvgMap',
	components: {
		SvgMap,
	},
	model: {
		event: 'change',
	},
	props: {
		// Ids of selected locations (used for v-model)
		value: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		/**
	 	 * Indicate whether a location is selected
	 	 *
	 	 * @param {Object} location - Location DOM object
	 	 * @returns {boolean} True if the location is selected
		 */
		isLocationSelected(location) {
			return this.value.some(selectedLocation => selectedLocation === location.id)
		},

		/**
		 * Select/deselect a location
	 	 *
	 	 * @param {Event.AT_TARGET} target - Triggered event
	 	 */
		toggleLocation(target) {
			if (target.attributes['aria-checked'] && target.attributes['aria-checked'].value === 'true') {
				// Delete location
				return this.$emit('change', this.value.filter(location => location !== target.id))
			}
			// Add location
			return this.$emit('change', this.value.concat([target.id]))
		},
	},
}
</script>
