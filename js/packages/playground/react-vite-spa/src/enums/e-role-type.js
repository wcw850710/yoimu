import { createEnum } from '@yoimu/common-lib'

const SUPER_USER = 'SUPER_USER'
const NORMAL_USER = 'NORMAL_USER'

export const ERoleType = createEnum({
	[SUPER_USER]: [SUPER_USER, '超級使用者'],
	[NORMAL_USER]: [NORMAL_USER, '一般使用者'],
})

export const ERoleLevel = createEnum({
	[SUPER_USER]: 1000,
	[NORMAL_USER]: 500,
})
