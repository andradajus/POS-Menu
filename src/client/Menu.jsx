import MenuTable from "./menu/MenuTable"
import MenuLogs from "./menu/MenuLogs"
import {useState} from "react"
const Menu = () => {
    const [transactionFlag, setTransactionFlag] = useState(false)

    return (
        <>
            <div className="grid lg:grid-cols-6 lg:grid-rows-10 lg:gap-4 md:grid-cols-6 md:grid-rows-10 md:gap-4 sm:grid-cols-4 sm:grid-rows-12">
                <div className="col-span-4 lg:row-span-10 md:row-span-10 sm:row-span-8 ">
                    <MenuTable setTransactionFlag={setTransactionFlag} />
                </div>
                <div className="col-span-2 lg:row-span-10 md:row-span-10 lg:col-start-5 md:col-start-5 sm:row-span-8 ">
                    <MenuLogs setTransactionFlag={setTransactionFlag} transactionFlag={transactionFlag}/>
                </div>
            </div>
        </>
    )
}

export default Menu
