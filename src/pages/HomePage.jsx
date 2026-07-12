
import NavBar from '../components/layout/Navbar'
import Cards from '../components/ui/Cards'
import ChatField from '../features/private/components/ui/ChatField'
import ChatBubble from '../features/private/components/ui/ChatBubble'
import useUser from '../context/auth/AuthContext'

function HomePage() {
  return (
    <>
    <header>
      <h1 className='flex items-center justify-center text-4xl tracking-tight bg-linear-to-r from-white to-cyan-400 bg-clip-text text-transparent p-10 font-grotesk font-semibold mt-6 '><span className="text-7xl font-kranky font-bold">WISKA </span> - A Dual Identity Chat Application</h1>
    </header>
      <NavBar/>
    <main>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(480px,1fr))] w-full max-w-screen-2xl mx-auto mt-20 gap-20 '>
        <div>
        <div>
        <p className='text-9xl font-extrabold text-cyan-400 font-grotesk animate-pulse @keyframes_pulse_{0%,100%{opacity:1}50%{opacity:0.25}'>TWO SIDES,</p>
        <p className='text-9xl font-extrabold text-white font-grotesk'>ONE YOU.</p>
        </div>

        <p className='text-zinc-600 font-mono text-2xl tracking-tighter pt-10 px-2 font-stretch-extra-condensed'>Connect securely with friends using your real, verified profile, or slip on the anonymous mask to speak your mind freely without any limits. Two unique sides, one amazing you.</p>
        </div>
        <div></div>

      </div>
          <hr className="my-6 border-t border-slate-300 w-full max-w-screen-2xl mx-auto mt-30" />

        <div className='grid grid-cols-[repeat(auto-fit,minmax(480px,1fr))] w-full max-w-screen-2xl mx-auto mt-30 m-40 gap-20'>
          <Cards heading='Verfied Profile'
          className='hover:-translate-y-8 shrink-0 '
           pClassName='py-10 px-16 text-center text-[1.25rem] mb-12 tracking-tighter'
           btnClassName='text-lg py-4 font-semibold bg-white hover:bg-white text-black rounded-none w-3/4 capitalize'
           btnText='[ ENTER VERIFIED PROFILE ]'
           content='Connect safely using your real identity. Build genuine friendships and enjoy authentic, trusted conversations in a welcoming, comfortable space where you can chat openly with the people you know best.'
           url="/verified-profile"

          />
          <Cards heading='Anonymous Mode' 
          className='hover:-translate-y-8 mx-6'
           hClassName=' text-cyan-400'
           pClassName='py-10 px-16 text-center text-[1.25rem] mb-12 tracking-tighter '
           btnClassName='text-lg py-4 font-semibold bg-cyan-400 text-black hover:bg-cyan-400 rounded-none w-3/4 capitalize'
           btnText='[ EQUIP MASK ]'
           content='Slip on the mask and share your true thoughts without holding back. Enjoy totally untraceable, judgment-free conversations where you can speak freely and connect deeply without ever revealing your identity.'
           url="/anonymous-mode"

          />

        </div>
        <div className=" border-l-4 border-zinc-800 max-w-screen-2xl mx-auto px-6 my-20 space-y-6">
            
            <p className="text-zinc-400 text-base md:text-lg tracking-wide">
               Welcome to <span className="text-white font-black tracking-widest uppercase">Wiska</span>, the dual-identity protocol engineered for the modern web. We have constructed a single, highly secure environment that grants you absolute control over your digital footprint.
               </p>
            <p>
              On one side, deploy your <span className="text-white font-bold border-b border-white pb-0.5">Verified Profile</span> to cultivate genuine relationships and communicate authentically under your true identity with your trusted network. 
            </p>
            <p>
              On the other, equip the <span className="text-cyan-500 font-bold border-b border-cyan-500 pb-0.5">Anonymous Mask</span> to broadcast your unfiltered thoughts into the void—completely untraceable, devoid of judgment, and free from limits. 
            </p>
            <p>
              Whether you are forging real-world connections or speaking your mind from the shadows, Wiska ensures your public face and private thoughts remain flawlessly decoupled.
            </p>
        
    </div>
    </main>
    </>

  )
}

export default HomePage