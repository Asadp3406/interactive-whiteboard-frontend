import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Tab, Tabs } from 'react-bootstrap';

const CodeEditor = ({ code, onCodeChange }) => {
    const [key, setKey] = useState('html');

    const handleEditorChange = useCallback((value, language) => {
        onCodeChange(language, value);
    }, [onCodeChange]);

    return (
        <div className="flex-grow-1 d-flex flex-column">
            <Tabs
                id="code-editor-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-2"
            >
                <Tab eventKey="html" title="HTML">
                    <Editor
                        height="40vh"
                        language="html"
                        theme="vs-dark"
                        value={code.html}
                        onChange={(value) => handleEditorChange(value, 'html')}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            wordWrap: 'on'
                        }}
                    />
                </Tab>
                <Tab eventKey="css" title="CSS">
                    <Editor
                        height="40vh"
                        language="css"
                        theme="vs-dark"
                        value={code.css}
                        onChange={(value) => handleEditorChange(value, 'css')}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            wordWrap: 'on'
                        }}
                    />
                </Tab>
                <Tab eventKey="javascript" title="JavaScript">
                    <Editor
                        height="40vh"
                        language="javascript"
                        theme="vs-dark"
                        value={code.javascript}
                        onChange={(value) => handleEditorChange(value, 'javascript')}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            wordWrap: 'on'
                        }}
                    />
                </Tab>
            </Tabs>
        </div>
    );
};

export default CodeEditor;