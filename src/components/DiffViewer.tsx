import { useState, useRef, useEffect } from 'react';
import { diffWords } from 'diff';
import '../styles.css';

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
                span.className = 'added';
            } else if (part.removed && side === 'left') {
                span.className = 'removed';
            }
            element.appendChild(span);
        });
    };

    return (
        <div className="diff-viewer-container">
            <div className="diff-viewer-textarea-container">
                <textarea
                    placeholder="Left text"
                    value={leftText}
                    onChange={(e) => setLeftText(e.target.value)}
                    className="diff-viewer-textarea"
                />
                <textarea
                    placeholder="Right text"
                    value={rightText}
                    onChange={(e) => setRightText(e.target.value)}
                    className="diff-viewer-textarea"
                />
            </div>
            <button onClick={() => setIsSplitView(!isSplitView)} className="diff-viewer-button">
                Toggle Split View
            </button>
            {isSplitView ? (
                <div className="diff-viewer-result-container">
                    <div ref={leftRef} className="diff-viewer-result" />
                    <div ref={rightRef} className="diff-viewer-result" />
                </div>
            ) : (
                <div className="diff-viewer-result-single">
                    <div ref={leftRef} />
                    <div ref={rightRef} />
                </div>
            )}
        </div>
    );
};

export default DiffViewer;
