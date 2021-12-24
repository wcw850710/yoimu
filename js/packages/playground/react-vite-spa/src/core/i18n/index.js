import zh_TW from '@/core/i18n/zh_TW.json'
import zh_CN from '@/core/i18n/zh_CN.json'
import { ELocale } from '@/enums/e-locale'
import { createI18n } from '@yoimu/react-common-lib'

const storageKey = `${import.meta.env.VITE_PROJECT_NAME}_language`
const storageLocale = localStorage.getItem(storageKey)

export const {
	t,
	Provider: I18nProvider,
	inject: useI18n,
} = createI18n({
	locale: storageLocale ? JSON.parse(storageLocale) : ELocale.zh_TW,
	messages: {
		[ELocale.zh_TW]: zh_TW,
		[ELocale.zh_CN]: zh_CN,
	},
})
