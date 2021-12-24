import { Dispatch, MutableRefObject, ReactElement, SetStateAction } from 'react'

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...0[]]

type Join<K, P> = K extends string | number
	? P extends string | number
		? `${K}${'' extends P ? '' : '.'}${P}`
		: never
	: never

type Paths<T, D extends number = 10> = [D] extends [never]
	? never
	: T extends object
	? {
			[K in keyof T]-?: K extends string | number
				? `${K}` | (Paths<T[K], Prev[D]> extends infer R ? Join<K, R> : never)
				: never
	  }[keyof T]
	: ''

type ServiceProvider = (prop: { children: ReactElement }) => ReactElement
type ServiceInject<T> = <V>(getter: (e: T) => V) => V

export function createI18n<
	T extends object,
	K extends keyof T,
	KS extends Join<Paths<T, 5>, ''>,
	i18nT extends (nestedKey: KS, replaceArrayStr?: string[]) => string,
>(options: {
	locale: K
	messages: T
}): {
	t: i18nT
	Provider: ServiceProvider
	inject: ServiceInject<{
		locale: string
		changeLocale: Dispatch<SetStateAction<string>>
		t: i18nT
	}>
}

type CreateLangTranslate = <T = string>(text: T, replaceArgs: any[]) => T
export function createLang<
	T extends object,
	Lang = T & { $t: CreateLangTranslate },
>(options: {
	defaultLocale: string
	languages: object
	typeBindObj: T
}): {
	langRef: { current: Lang }
	Provider: ServiceProvider
	inject: ServiceInject<{
		lang: Lang
		locale: string
		changeLocale: (locale: string) => void
	}>
}

export function createMitt(): {
	useMitt: () => {
		emit: (type: any, event: any) => void
		on: (type: any, handler: Function) => void
	}
}

export function createProvider<T>(providerService: () => T): {
	Provider: ServiceProvider
	inject: ServiceInject<T>
}

export function useCacheState<T>(
	symbol: Symbol,
	initialValue: T,
): [T, (arg: T | ((arg: T) => T)) => void]

export function useDebounce<T>(callback: T, deps: any[], delay?: number): void

// TODO type 沒意外是錯的
export function useDebounceFunc(
	callback: Function[],
	delay?: number,
): [(...args: any) => void, () => void]

// TODO 該類型應該是錯的，這 hook 沒啥用，先寫著放著
export function useMethods<
	T,
	U extends { [funName: string]: (state: T, ...args: any) => T },
>(initialValue: T, methods: U): { [key in keyof T]: (...args: any) => T }

export function useSafeState<T>(
	initialState: T | (() => T),
): [T, Dispatch<SetStateAction<T>>]

export function useInitialRef<T>(
	initialValue: T | (() => T),
): MutableRefObject<T>

export function useToggle<T>(
	initialState: T | (() => T),
): [T, () => void, Dispatch<SetStateAction<T>>]

export function useEditorList<T extends object, K extends keyof T>(
	initialValueFunc: () => T,
	init?: boolean,
): [
	T[],
	Dispatch<SetStateAction<T[]>>,
	{
		create: () => void
		editByIndex: (index: number, value: T) => void
		editKeyValueByIndex: (index: number, key: K, value: T[K]) => void
		removeByIndex: (index: number, removeNum?: number) => void
		removeByKeyValue: (key: K, value: T[K]) => void
	},
]

export function useCheckInjectReturn<T extends object, K extends keyof T>(
	returnValue: T,
	checkKeys: K[],
): [
	T,
	{
		current: {
			[P in K]: boolean
		}
	},
]
