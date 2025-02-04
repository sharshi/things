import { useState, useRef, useEffect } from 'react';
import { diffWords } from 'diff';

export const DiffViewer = () => {
    const [leftText, setLeftText] = useState('');
    const [rightText, setRightText] = useState('');
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        handleDiff();
    }, [leftText, rightText]);

    const handleDiff = () => {
        const diff = diffWords(leftText, rightText);
        applyDiff(leftRef.current, diff, 'left');
        applyDiff(rightRef.current, diff, 'right');
    };

    const applyDiff = (element: HTMLDivElement | null, diff: any[], side: 'left' | 'right') => {
        if (!element) return;
        element.innerHTML = '';
        diff.forEach((part) => {
            const span = document.createElement('span');
            span.textContent = part.value;
            if (part.added && side === 'right') {
                span.style.backgroundColor = 'lightgreen';
            } else if (part.removed && side === 'left') {
                span.style.backgroundColor = 'salmon';
                span.style.textDecoration = 'line-through';
            }
            element.appendChild(span);
        });
    };

    return (
        <div>
            <div>
                <div
                    ref={leftRef}
                    contentEditable
                    onInput={(e) => setLeftText(e.currentTarget.textContent || '')}
                    style={{ border: '1px solid black', padding: '5px', minHeight: '150px', width: '300px' }}
                />
                <div
                    ref={rightRef}
                    contentEditable
                    onInput={(e) => setRightText(e.currentTarget.textContent || '')}
                    style={{ border: '1px solid black', padding: '5px', minHeight: '150px', width: '300px' }}
                />
            </div>
        </div>
    );
};

export default DiffViewer;

