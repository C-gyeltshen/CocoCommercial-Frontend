import React, { useState } from 'react';

const orders = [
  { id: 1, imageUrl: 'https://via.placeholder.com/100', product: 'Product 1', price: 4000, quantity: 3, total: 12000, status: 'Await payment', paymentUrl: 'https://via.placeholder.com/100' },
  { id: 2, imageUrl: 'https://via.placeholder.com/100', product: 'Product 2', price: 15000, quantity: 2, total: 30000, status: 'Await payment', paymentUrl: 'https://via.placeholder.com/100' }
];

const OrderTable: React.FC = () => {
  const [orderData, setOrderData] = useState(orders);

  const updateStatus = (id: number) => {
    const updatedOrders = orderData.map(order => {
      if (order.id === id) {
        return { ...order, status: 'Confirmed' };
      }
      return order;
    });
    setOrderData(updatedOrders);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orderData.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={order.imageUrl} alt="Product" className="w-10 h-10 rounded-full" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={order.paymentUrl} alt="Payment" className="w-10 h-10 rounded-full" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => updateStatus(order.id)} className="text-indigo-600 hover:text-indigo-900">
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
