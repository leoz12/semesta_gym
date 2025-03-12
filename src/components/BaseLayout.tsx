import { Container } from "react-bootstrap";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <Container fluid className="px-0">
        {children}
      </Container>
      <Footer/>
    </div>
  )
}