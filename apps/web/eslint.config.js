import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import ts from 'typescript-eslint'
import svelteConfig from './svelte.config.js'

export default [
	{
		ignores: [
			'.DS_Store',
			'node_modules/**',
			'build/**',
			'.svelte-kit/**',
			'.vercel/**',
			'playwright-report/**',
			'test-results/**',
			'package/**',
			'.env',
			'.env.*',
			'!**/.env.example',
			'**/*.d.ts',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock',
		],
	},
	{
		...js.configs.recommended,
		files: ['**/*.{js,mjs,cjs}'],
	},
	{
		files: ['**/*.ts'],
		ignores: ['**/*.d.ts', '**/*.svelte.ts'],
		languageOptions: {
			parser: ts.parser,
		},
		rules: {
			...js.configs.recommended.rules,
		},
	},
	...svelte.configs['flat/base'],
	prettier,
	{
		files: ['**/*.{js,mjs,cjs,ts,svelte,svelte.ts}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			'no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
				svelteConfig,
			},
		},
	},
	{
		files: ['**/*.svelte.ts'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},
]
