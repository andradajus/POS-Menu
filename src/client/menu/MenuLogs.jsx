import { getTransactions } from "../../lib/firebaseutils"
import { useEffect, useState } from "react"
import { format } from 'date-fns'

const MenuLogs = () => {
    const [transactions, setTransactions] = useState([])

    const fetchTransactionData = async () => {
        try {
        const response = await getTransactions()
        setTransactions(response)
        } catch (error) {
        console.error("Error fetching transactions:", error)
        }
    }

    useEffect(() => {
        fetchTransactionData()
    }, [])

    console.log("transactionssssss", transactions)
    return (
    <>
        <div className="overflow-x-auto">
            <span className="flex justify-center text-2xl m-1 font-bold">Transaction Logs</span>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {transactions && transactions.map((transaction, index) => {
                    const dateObject = transaction.date.toDate();

                    return (
                        <tr key={transaction.id}>
                            <th>{index + 1}</th>
                            <td>{dateObject ? format(dateObject, 'MMMM dd, yyyy hh:mm:ss a') : ""}</td>
                            <td>{transaction.description}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    </>
    )
}

export default MenuLogs
