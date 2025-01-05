import { SignUp } from '@clerk/nextjs'

const SignedUpPage = () => {
    return (
        <main className='w-full h-screen flex justify-center items-center bg-dark-1'>
            <SignUp />
        </main>
    )
}

export default SignedUpPage