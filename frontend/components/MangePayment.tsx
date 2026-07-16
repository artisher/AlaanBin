'use client';
export const MangePayment = () => {
    const payments = [
        { id: 101, user: 'علی رضایی', amount: '50,000 تومان', date: '1402/08/01', status: 'موفق' },
        { id: 102, user: 'سارا محمدی', amount: '120,000 تومان', date: '1402/08/02', status: 'ناموفق' },
    ];
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">تراکنش‌های مالی</h2>
            <div className="bg-card rounded-lg shadow overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-gray-800 text-gray-400">
                        <tr>
                            <th className="p-4">کاربر</th>
                            <th className="p-4">مبلغ</th>
                            <th className="p-4">تاریخ</th>
                            <th className="p-4">وضعیت</th>t
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((pay) => (
                            <tr key={pay.id} className="border-b border-gray-700 hover:bg-gray-800">
                                <td className="p-4 text-white">{pay.user}</td>
                                <td className="p-4 text-gray-300">{pay.amount}</td>
                                <td className="p-4 text-gray-400">{pay.date}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${pay.status === 'موفق' ? 'bg-primary text-dark' : 'bg-red-500 text-white'
                                        }`}>
                                        {pay.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
