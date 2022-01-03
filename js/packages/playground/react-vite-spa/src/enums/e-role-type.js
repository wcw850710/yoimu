import { declareEnum } from '@yoimu/common-lib'

const SUPER_USER = 'SUPER_USER'
const NORMAL_USER = 'NORMAL_USER'

export const ERoleType = declareEnum(
	{
		[SUPER_USER]: [SUPER_USER, '超級使用者', 1000],
		[NORMAL_USER]: [NORMAL_USER, '一般使用者', 500],
	},
	'',
)
