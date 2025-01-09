import React from 'react';

interface Props {
    onFilterChange: (filter: string) => void;
}

const StatusFilters: React.FC<Props> = ({ onFilterChange }) => {
    const statuses = ['All', 'Await payment', 'Confirmed', 'Processing', 'In transit', 'Delivered', 'Cancelled'];

    return (
        <div className="flex space-x-2 overflow-auto">
            {statuses.map(status => (
                <button
                    key={status}
                    onClick={() => onFilterChange(status)}
                    className="px-3 py-1 rounded-full bg-blue-500 text-white focus:outline-none hover:bg-blue-600"
                >
                    {status}
                </button>
            ))}
        </div>
    );
};

export default StatusFilters;
