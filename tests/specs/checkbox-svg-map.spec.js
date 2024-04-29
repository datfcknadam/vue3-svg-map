import { mount } from '@vue/test-utils'
import map from '../mocks/fake-map'
import SvgMap from '@/components/svg-map.vue'
import CheckboxSvgMap from '@/components/checkbox-svg-map.vue'

describe('CheckboxSvgMap component', () => {
	const VALUES = {
		first: 'id0',
		second: 'id1',
		third: 'id2',
	}

	let wrapper
	let svgMap
	let locations

	beforeEach(() => {
		wrapper = mount(CheckboxSvgMap, {
			propsData: { map, value: [VALUES.first] },
		})
		svgMap = wrapper.findComponent(SvgMap)
		locations = svgMap.findAll('path')
	})

	it('selects locations of initial value property', () => {
		expect(locations.at(0).attributes('aria-checked')).toBeTruthy()
		expect(locations.at(1).attributes('aria-checked')).toBe('false')
		expect(locations.at(2).attributes('aria-checked')).toBe('false')
	})

	it('selects locations of new value property', async () => {
		wrapper.setProps({ value: [VALUES.first, VALUES.second] })
		expect(locations.at(0).attributes('aria-checked')).toBeTruthy()
		expect(locations.at(1).attributes('aria-checked')).toBeTruthy()
		expect(locations.at(2).attributes('aria-checked')).toBe('false')
	})

	it('emits new selected locations when clicking on location', () => {
		locations.at(2).trigger('click')

		expect(wrapper.emitted().change[0][0]).toEqual([VALUES.first, VALUES.third])
	})

	it('emits new selected location when clicking on location', () => {
		locations.at(2).trigger('click')

		expect(wrapper.emitted().add[0][0]).toEqual(VALUES.third)
	})

	it('emits unselected location', () => {
		wrapper.setProps({ value: [VALUES.first] })
		locations.at(0).trigger('click')
		expect(wrapper.emitted().remove[0][0]).toEqual(VALUES.first)
	})

	it('emits new selected locations when pressing spacebar on location', () => {
		locations.at(2).trigger('keydown.space')

		expect(wrapper.emitted().change[0][0]).toEqual([VALUES.first, VALUES.third])
	})

	it('emits empty array when unselecting all locations', () => {
		locations.at(0).trigger('click')

		expect(wrapper.emitted().change[0][0]).toEqual([])
	})

	it('renders map with checkbox attributes', () => {
		expect(wrapper.element).toMatchSnapshot()
	})
})
