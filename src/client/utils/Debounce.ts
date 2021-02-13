import { useState, useEffect } from 'react';

// give it an any value because it could return an array
// delay is how long we will debounce this for. standard is .5 second
export default function useDebounce<T = any>(value: T, delay: number) {

    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        // out setTimeout will run for however long our delay is 

        // the cleanup function runs whenever whatever is in the escape array change
        // write the cleanup function here in case someone navigates away before the debounce finishes 
        // probably overkill here, but good to know
        return () => clearTimeout(handler);

    }, [value]) // we want to rerun this every time our value changes

    return debouncedValue;
}