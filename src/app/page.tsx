import Image from "next/image";
import { Typewriter } from "nextjs-simple-typewriter";

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono md:flex">
                <h1 className="font-bold text-3xl">
                    Open Recruitments {' '}
                    <span className="text-blue-500 dark:text-cyan-400">
                        {/* Style will be inherited from the parent element */}
                        <Typewriter
                            words={['Robotiik', 'Quadcopter', 'Humanoid', 'Submarine']}
                            loop={0}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span>
                </h1>
            </div>
        </main>
    );
}
