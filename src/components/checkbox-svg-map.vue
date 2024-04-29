<template>
	<svg-map
		v-bind="$attrs"
		role="group"
		location-role="checkbox"
		location-tabindex="0"
		:is-location-selected="isLocationSelected"
		@select="toggleLocation"
	>
		<template
			v-for="(_, slotName) of $slots"
			#[slotName]="scope"
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
			if (target.attributes['aria-checked']?.value === 'true') {
				// Delete location
				this.$emit('remove', target.id)
				return this.$emit('change', this.value.filter(location => location !== target.id))
			}
			// Add location
			this.$emit('add', target.id)
			return this.$emit('change', this.value.concat([target.id]))
		},
	},
}
</script>
