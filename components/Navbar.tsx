import React from 'react'
import gsap from 'gsap'
import { navLinks } from '../constants'
import { useGSAP } from '@gsap/react'
const Navbar = () => {
     useGSAP(()=>{
        const navTween = gsap.timeline({
            scrollTrigger:{
                trigger:'nav',
                start:'bottom top'
            }
        });
        navTween.fromTo('nav',{backgroundColor:'transparent'},{
            backgroundColor:'#00000050',
            backgroundFilter:'blur(30px)',
            duration:1,
            ease:'power1.inOut'
        })
     });

  return (
   
 <nav>
    <div>
        <a href="#home" className='flex items-center gap-2'>
            <img src="/images/logo.png" alt="" />
            <p>CodeFest</p>
        </a>

        <ul>
            {navLinks.map((item, index)=>(
                <li key={item.id}>
                    <a href={item.id}>{item.title}</a>
                </li>
            ))}
        </ul>
    </div>
 </nav>
  )
}

export default Navbar