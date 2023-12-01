import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin'

export const FccTheme: CustomThemeConfig = {
	name: 'fcc-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #0ea5e9
		'--color-primary-50': '219 242 252', // #dbf2fc
		'--color-primary-100': '207 237 251', // #cfedfb
		'--color-primary-200': '195 233 250', // #c3e9fa
		'--color-primary-300': '159 219 246', // #9fdbf6
		'--color-primary-400': '86 192 240', // #56c0f0
		'--color-primary-500': '14 165 233', // #0ea5e9
		'--color-primary-600': '13 149 210', // #0d95d2
		'--color-primary-700': '11 124 175', // #0b7caf
		'--color-primary-800': '8 99 140', // #08638c
		'--color-primary-900': '7 81 114', // #075172
		// secondary | #7cac6c
		'--color-secondary-50': '235 243 233', // #ebf3e9
		'--color-secondary-100': '229 238 226', // #e5eee2
		'--color-secondary-200': '222 234 218', // #deeada
		'--color-secondary-300': '203 222 196', // #cbdec4
		'--color-secondary-400': '163 197 152', // #a3c598
		'--color-secondary-500': '124 172 108', // #7cac6c
		'--color-secondary-600': '112 155 97', // #709b61
		'--color-secondary-700': '93 129 81', // #5d8151
		'--color-secondary-800': '74 103 65', // #4a6741
		'--color-secondary-900': '61 84 53', // #3d5435
		// tertiary | #1f4c49
		'--color-tertiary-50': '221 228 228', // #dde4e4
		'--color-tertiary-100': '210 219 219', // #d2dbdb
		'--color-tertiary-200': '199 210 210', // #c7d2d2
		'--color-tertiary-300': '165 183 182', // #a5b7b6
		'--color-tertiary-400': '98 130 128', // #628280
		'--color-tertiary-500': '31 76 73', // #1f4c49
		'--color-tertiary-600': '28 68 66', // #1c4442
		'--color-tertiary-700': '23 57 55', // #173937
		'--color-tertiary-800': '19 46 44', // #132e2c
		'--color-tertiary-900': '15 37 36', // #0f2524
		// success | #05c21b
		'--color-success-50': '218 246 221', // #daf6dd
		'--color-success-100': '205 243 209', // #cdf3d1
		'--color-success-200': '193 240 198', // #c1f0c6
		'--color-success-300': '155 231 164', // #9be7a4
		'--color-success-400': '80 212 95', // #50d45f
		'--color-success-500': '5 194 27', // #05c21b
		'--color-success-600': '5 175 24', // #05af18
		'--color-success-700': '4 146 20', // #049214
		'--color-success-800': '3 116 16', // #037410
		'--color-success-900': '2 95 13', // #025f0d
		// warning | #e7c208
		'--color-warning-50': '251 246 218', // #fbf6da
		'--color-warning-100': '250 243 206', // #faf3ce
		'--color-warning-200': '249 240 193', // #f9f0c1
		'--color-warning-300': '245 231 156', // #f5e79c
		'--color-warning-400': '238 212 82', // #eed452
		'--color-warning-500': '231 194 8', // #e7c208
		'--color-warning-600': '208 175 7', // #d0af07
		'--color-warning-700': '173 146 6', // #ad9206
		'--color-warning-800': '139 116 5', // #8b7405
		'--color-warning-900': '113 95 4', // #715f04
		// error | #e11414
		'--color-error-50': '251 220 220', // #fbdcdc
		'--color-error-100': '249 208 208', // #f9d0d0
		'--color-error-200': '248 196 196', // #f8c4c4
		'--color-error-300': '243 161 161', // #f3a1a1
		'--color-error-400': '234 91 91', // #ea5b5b
		'--color-error-500': '225 20 20', // #e11414
		'--color-error-600': '203 18 18', // #cb1212
		'--color-error-700': '169 15 15', // #a90f0f
		'--color-error-800': '135 12 12', // #870c0c
		'--color-error-900': '110 10 10', // #6e0a0a
		// surface | #1a454d
		'--color-surface-50': '221 227 228', // #dde3e4
		'--color-surface-100': '209 218 219', // #d1dadb
		'--color-surface-200': '198 209 211', // #c6d1d3
		'--color-surface-300': '163 181 184', // #a3b5b8
		'--color-surface-400': '95 125 130', // #5f7d82
		'--color-surface-500': '26 69 77', // #1a454d
		'--color-surface-600': '23 62 69', // #173e45
		'--color-surface-700': '20 52 58', // #14343a
		'--color-surface-800': '16 41 46', // #10292e
		'--color-surface-900': '13 34 38', // #0d2226
	},
}
