import { useState, useRef, useEffect } from 'react';
import { diffWords } from 'diff';

export const DiffViewer = () => {
    const [leftText, setLeftText] = useState('');
    const [rightText, setRightText] = useState('');
    const [isSplitView, setIsSplitView] = useState(true);
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                <textarea
                    placeholder="Left text"
                    value={leftText}
                    onChange={(e) => setLeftText(e.target.value)}
                    style={{ border: '1px solid black', padding: '10px', minHeight: '150px', width: '48%', boxSizing: 'border-box' }}
                />
                <textarea
                    placeholder="Right text"
                    value={rightText}
                    onChange={(e) => setRightText(e.target.value)}
                    style={{ border: '1px solid black', padding: '10px', minHeight: '150px', width: '48%', boxSizing: 'border-box' }}
                />
            </div>
            <button onClick={() => setIsSplitView(!isSplitView)} style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '20px' }}>
                Toggle Split View
            </button>
            {isSplitView ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div
                        ref={leftRef}
                        style={{ border: '1px solid black', padding: '10px', minHeight: '150px', width: '48%', boxSizing: 'border-box', whiteSpace: 'pre-wrap' }}
                    />
                    <div
                        ref={rightRef}
                        style={{ border: '1px solid black', padding: '10px', minHeight: '150px', width: '48%', boxSizing: 'border-box', whiteSpace: 'pre-wrap' }}
                    />
                </div>
            ) : (
                <div style={{ border: '1px solid black', padding: '10px', minHeight: '150px', width: '100%', boxSizing: 'border-box', whiteSpace: 'pre-wrap' }}>
                    <div ref={leftRef} />
                    <div ref={rightRef} />
                </div>
            )}
        </div>
    );
};

export default DiffViewer;
