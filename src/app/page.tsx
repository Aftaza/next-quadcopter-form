import FormInput from "@/components/FormInput";
import Image from "next/image";
import { Typewriter } from "nextjs-simple-typewriter";

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-20">
            <div className="z-10 max-w-5xl w-full items-start justify-center font-mono flex flex-col gap-4">
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
                <div className="relative flex items-center justify-center place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                    <h3 className="text-xl">Goodluck For you!</h3>
                </div>
                <div className="flex justify-center items-center w-full">
                    <FormInput />
                    <div className="relative flex items-center justify-center place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-purple-700 before:dark:opacity-10 after:dark:from-purple-900 after:dark:via-[#c019bc] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                    </div>
                </div>
                
            </div>
        </main>
    );
}
