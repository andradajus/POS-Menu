const MenuTable = () => {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                            <label>
                                1
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Product Name</div>
                                    <div className="text-sm opacity-50">Description</div>
                                </div>
                            </div>
                            </td>
                            <td>Category</td>
                            <td>Price</td>
                            <th>Stock</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MenuTable
