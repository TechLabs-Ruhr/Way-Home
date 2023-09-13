// if the user trying to make a request to the login page than the middleware checks if the user is already logged in 
// if this is the case than  the user will be redirected to a different route 
// the request to the login page gets intersected  
import { getToken } from 'next-auth/jwt'
import {withAuth} from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    async function middleware(req) {
        const pathname = req.nextUrl.pathname // determine the path the user is on 

        //Manage route protection
        const isAuth = await getToken({req})
        const isLoginPage = pathname.startsWith('/signin')

        const sesnsitiveRoutes = ['/dashboard']
        const isAccessingSensitiveRoutes = sesnsitiveRoutes.some((route) => pathname.startsWith(route))

        if(isLoginPage) {
            if(isAuth) {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }

            return NextResponse.next()
        }

        if(!isAuth && isAccessingSensitiveRoutes) {
            return NextResponse.redirect(new URL('/signin', req.url))
        }

        if(pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }
    }, {
        callbacks: {
            async authorized() {
                return true
            }
        }
    }
)

export const config = { // determine in which routes the middleware will be run 
    matcher: ['/', '/signin', '/dashboard/:path*' ]
}