'use client';

import React, { useState } from 'react';
import OrderTable from '../components/OrderTable';
import SearchBar from '../components/SearchBar';
import StatusFilters from '../components/StatusFilters';

const OrdersManagement: React.FC = () => {
    const [filter, setFilter] = useState('All');

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <SearchBar />
            </div>
            <div className="mb-4">
                <StatusFilters onFilterChange={handleFilterChange} />
            </div>
            <div>
                <OrderTable filter={filter} />
            </div>
        </div>
    );
};

export default OrdersManagement;
