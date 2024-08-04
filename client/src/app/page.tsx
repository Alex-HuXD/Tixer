import { getCurrentUser } from '@/utils/api'

const LandingPage = async () => {
    const currentUser = await getCurrentUser()
    console.log('current user', currentUser)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white bg-slate-900">
            {currentUser ? 'you are signed in' : 'you need to sign in'}
        </main>
    )
}

export default LandingPage
