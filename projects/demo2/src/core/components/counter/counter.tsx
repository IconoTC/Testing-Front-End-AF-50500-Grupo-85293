import React, { useState } from 'react';
import { Card } from '../card/card';

export const Counter: React.FC = () => {

        const [count, setCount] = useState(0);
    return (
        <Card>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <p>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </Card>
    );
};
