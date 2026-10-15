import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Tapes from './sections/Tapes';
import Problem from './sections/Problem';
import Services from './sections/Services';
import Demo from './sections/Demo';
import About from './sections/About';
import Work from './sections/Work';
import Why from './sections/Why';
import Process from './sections/Process';
import Faq from './sections/Faq';
import Contact from './sections/Contact';
import Footer, { MobileCta } from './sections/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Tapes />
        <Problem />
        <Services />
        <Demo />
        <About />
        <Work />
        <Why />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
