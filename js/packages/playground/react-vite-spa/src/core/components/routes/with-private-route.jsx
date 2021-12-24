import { AuthComponent } from '@/core/components/routes/component/auth-component'

export const withPrivateRoute =
	(routeComponent, /* permissionLevel, 基礎身分權限用*/ ...withFuncs) =>
	() => {
		withFuncs.forEach(e => e())

		return (
			<AuthComponent
				component={
					routeComponent
				} /*permissionLevel={permissionLevel}基礎身分權限用*/
			/>
		)
	}
