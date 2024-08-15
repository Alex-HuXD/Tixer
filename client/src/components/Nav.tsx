import Link from 'next/link'

type Props = {
    currentUser: any
}

const Nav = async ({ currentUser }: Props) => {
    return (
        <nav className="text-stone-100 flex justify-between items-center bg-bg-red h-16">
            <Link href={'/'} className="bg-inherit text-3xl mx-3">
                Tixer
            </Link>

            <div className="flex justify-center items-center bg-bg-red mx-3 h-full">
                {currentUser ? (
                    <Link
                        href={'/signout'}
                        className="bg-bg-red px-3 h-full flex items-center hover:bg-cyan-600">
                        Sign Out
                    </Link>
                ) : (
                    <>
                        <Link
                            href={'/signin'}
                            className="bg-bg-red px-3 h-full flex items-center hover:bg-cyan-600">
                            Sign In
                        </Link>

                        <Link
                            href={'/signup'}
                            className="bg-bg-red px-3 h-full flex items-center hover:bg-cyan-600">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
