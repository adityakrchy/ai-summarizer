
import { icons } from '../assets/index'

const Hero = () => {
    return (
        <header className='w-full flex justify-center items-center flex-col'>
            <nav className="flex items-center justify-between  w-full mb-10 pt-3">
                <img src={icons.logo} alt="Logo" className='w-28 object-contain' />
                <button className='rounded-2xl px-4 py-1 bg-black text-white' type='button' onClick={() => window.open('https://github.com/adityakrchy')}>Github</button>
            </nav>

            <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center'>Summarize Articles with <br className='max-md:hidden' /> <span className='bg-slate-500;'>OpenAI GPT-4</span></h1>
            <h2 className='mt-5 text-lg text-gray-600 sm:text-xl text-center max-w-2xl'>Simplify your readings with Summize, an open-source article summarizer that transforms lenthy articles into clear and concise summaries.</h2>
        </header>
    )
}

export default Hero