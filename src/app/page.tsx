import ConnectionIntro from "@/components/sections/ConnectionIntro";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Solutions from "@/components/sections/Solutions";
import HubTeaser from "@/components/sections/HubTeaser";

export default function Home() {
  return (
    <>
      <ConnectionIntro />
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <HubTeaser />
      </main>
      <Footer />
    </>
  );
}
