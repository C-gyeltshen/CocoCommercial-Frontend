import React from 'react';

const SearchBar: React.FC = () => {
    return (
        <input
            type="text"
            placeholder="Search in Coco Commercial"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
    );
};

export default SearchBar;
