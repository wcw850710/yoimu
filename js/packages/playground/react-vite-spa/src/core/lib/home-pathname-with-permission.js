import { ERoleType } from '@/enums/e-role-type'

export const homePathnameWithPermission = {
	[ERoleType.SUPER_USER]: '/good',
	[ERoleType.NORMAL_USER]: '/bad',
}
