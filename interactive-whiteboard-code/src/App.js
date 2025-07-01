import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import io from 'socket.io-client';
import Whiteboard from './components/Whiteboard';
import CodeEditor from './components/CodeEditor';
import CodeOutput from './components/CodeOutput';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
    const [whiteboardData, setWhiteboardData] = useState([]);
    const [code, setCode] = useState({
        html: '<h1>Hello Whiteboard!</h1>',
        css: 'h1 { color: blue; font-family: sans-serif; }',
        javascript: 'console.log("Welcome to live coding!");'
    });

    useEffect(() => {
        socket.on('initialWhiteboardState', setWhiteboardData);
        socket.on('initialCodeState', setCode);
        socket.on('draw', (drawingData) => {
            setWhiteboardData((prevData) => [...prevData, drawingData]);
        });
        socket.on('clearWhiteboard', () => {
            setWhiteboardData([]);
        });
        socket.on('codeChange', (newCodeState) => {
            setCode((prevCode) => ({ ...prevCode, ...newCodeState }));
        });

        return () => {
            socket.off('initialWhiteboardState');
            socket.off('initialCodeState');
            socket.off('draw');
            socket.off('clearWhiteboard');
            socket.off('codeChange');
        };
    }, []);

    const handleDraw = useCallback((drawingData) => {
        setWhiteboardData((prevData) => [...prevData, drawingData]);
        socket.emit('draw', drawingData);
    }, []);

    const handleClearWhiteboard = useCallback(() => {
        setWhiteboardData([]);
        socket.emit('clearWhiteboard');
    }, []);

    const handleCodeChange = useCallback((language, value) => {
        setCode((prevCode) => ({ ...prevCode, [language]: value }));
        socket.emit('codeChange', { [language]: value });
    }, []);

    return (
        <Container fluid className="App vh-100 d-flex flex-column">
            <h1 className="text-center my-3 text-primary">Collaborative Whiteboard & Code</h1>
            <Row className="flex-grow-1">
                <Col md={7} className="d-flex flex-column">
                    <Card className="flex-grow-1 mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                            <h5 className="mb-0">Whiteboard</h5>
                            <Button variant="outline-danger" size="sm" onClick={handleClearWhiteboard}>Clear Board</Button>
                        </Card.Header>
                        <Card.Body className="p-0 d-flex flex-column">
                            <Whiteboard
                                whiteboardData={whiteboardData}
                                onDraw={handleDraw}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={5} className="d-flex flex-column">
                    <Card className="flex-grow-1">
                        <Card.Header className="bg-light">
                            <h5 className="mb-0">Live Code Editor</h5>
                        </Card.Header>
                        <Card.Body className="d-flex flex-column p-2">
                            <CodeEditor
                                code={code}
                                onCodeChange={handleCodeChange}
                            />
                            <h5 className="mt-3">Output</h5>
                            <CodeOutput
                                html={code.html}
                                css={code.css}
                                js={code.javascript}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <footer className="text-center py-2 mt-auto text-muted small">
              Asad
            </footer>
        </Container>
    );
}

export default App;