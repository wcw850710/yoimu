import { Suspense } from 'react'
import { AuthComponent } from '@/core/components/routes/component/auth-component'

export const withSuspensePrivateRoute =
	(
		routeComponent,
		Fallback,
		/* permissionLevel, 基礎身分權限用*/ ...withFuncs
	) =>
	() => {
		withFuncs.forEach(e => e())

		return (
			<Suspense fallback={<Fallback />}>
				<AuthComponent
					component={
						routeComponent
					} /*permissionLevel={permissionLevel}基礎身分權限用*/
				/>
			</Suspense>
		)
	}
