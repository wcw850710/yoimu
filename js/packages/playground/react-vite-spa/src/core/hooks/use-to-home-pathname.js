import { useAuth } from '@/core/hooks/use-auth'
import { useMemo } from 'react'
import { homePathnameWithPermission } from '@/core/lib/home-pathname-with-permission'
import { ERoleType } from '@/enums/e-role-type'

export const useToHomePathname = () => {
	const checkPermission = useAuth(e => e.checkPermission)

	return useMemo(
		() =>
			checkPermission(ERoleType.SUPER_USER)
				? homePathnameWithPermission[ERoleType.SUPER_USER]
				: homePathnameWithPermission[ERoleType.NORMAL_USER],
		[checkPermission],
	)
}
