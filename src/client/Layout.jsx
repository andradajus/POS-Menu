import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] h-screen bg-white">
            <Navbar />
                <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
