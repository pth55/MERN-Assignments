import React, { useState, useCallback } from 'react';
import { useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [, forceRender] = useState(0);

    // this problem can be simply solved by taking another counter state vaiable, but it causes extra re render to update it, everytime force chnages, REMEMBER RULE OF THUMB IN REACT!

    // you may take a simple counter variable to staore the count, let say x = 0 and increment it by 1 but the problem is since it is declared in the component(locally) whenever state changes it re initializes to 0

    // so optimal solution is using useRef()
    const count = useRef(0);

    const handleReRender = () => {
        count.current += 1;
        forceRender(Math.random());
    };

    return (
        <div>
            <p>This component has rendered {count.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};