import React, { useEffect, useRef, useMemo } from 'react';

const CodeOutput = ({ html, css, js }) => {
    const iframeRef = useRef(null);

    const getIframeContent = useMemo(() => {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Code Output</title>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script type="text/javascript">
                    try {
                        ${js}
                    } catch (error) {
                        console.error('Error in JavaScript execution:', error);
                        const errorDiv = document.createElement('div');
                        errorDiv.style.color = 'red';
                        errorDiv.innerText = 'JS Error: ' + error.message;
                        document.body.prepend(errorDiv);
                    }
                </script>
            </body>
            </html>
        `;
    }, [html, css, js]);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(getIframeContent);
            iframe.contentWindow.document.close();
        }
    }, [getIframeContent]);

    return (
        <div className="flex-grow-1 border rounded p-1 mt-3" style={{ overflow: 'hidden' }}>
            <iframe
                ref={iframeRef}
                title="Code Output"
                sandbox="allow-scripts allow-modals allow-forms allow-popups allow-pointer-lock allow-same-origin"
                frameBorder="0"
                className="w-100 h-100 bg-white"
            ></iframe>
        </div>
    );
};

export default CodeOutput;