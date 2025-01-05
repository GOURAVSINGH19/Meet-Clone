import { SignIn } from '@clerk/nextjs';

const SiginInPage =async () => {
    
    return (
        <main className="flex h-screen w-full items-center justify-center">
            <SignIn />
        </main>
    );
}

export default SiginInPage;