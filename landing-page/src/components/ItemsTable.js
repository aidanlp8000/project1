import React from 'react';

const ItemsTable = () => {
  const items = [
    {
      name: "Samsung Smart TV",
      model: "QN65Q80B",
      price: 997.99,
      source: "Best Buy"
    },
    {
      name: "KitchenAid Stand Mixer",
      model: "KSM150PSER",
      price: 429.99,
      source: "Amazon"
    },
    {
      name: "Dyson Vacuum",
      model: "V15 Detect",
      price: 749.99,
      source: "Dyson"
    },
    {
      name: "Apple MacBook Pro",
      model: "MVVJ2LL/A",
      price: 1299.00,
      source: "Apple Store"
    },
    {
      name: "Pottery Barn Sofa",
      model: "PB Comfort Roll Arm",
      price: 2199.00,
      source: "Pottery Barn"
    }
  ];

  return (
    <div className="w-full rounded-lg border bg-white shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Contents Claim Items</h2>
      </div>
      <div className="p-4">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-semibold text-gray-900">Name</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-900">Model</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-900">Price</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-900">Source</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr 
                  key={index}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4 font-mono text-sm">{item.model}</td>
                  <td className="py-3 px-4 text-right">
                    ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4">{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500 px-4">
            <div>Showing {items.length} items</div>
            <div className="font-medium">
              Total: ${items.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;