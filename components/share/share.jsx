import React, { useState, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import styled from '@emotion/styled';
import { FileSelector } from "../files/modules";

import { FileSharedViewer, PeerCard } from './views';
import { Topbar, Footer } from "../common";

const ShareWindowContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 15vmin 0;
    background-color: #0D47A1;
    .row {
      max-width: 900px;
    }
`;

export default ({
    myCode, peerCode, currentFile,
    filesReceived: filesReceivedProps, filesSent: filesSentProps,
    onSend, onDisconnect
}) => {

    const [filesQueued, setFilesQueued] = useState([]);
    const [filesReceived, setFilesReceived] = useState(filesReceivedProps ? filesReceivedProps : []);
    const [filesSent, setFilesSent] = useState(filesSentProps ? filesSentProps : []);

    useBeforeunload(event => event.preventDefault());

    const handleOnSelect = (files) => {
        setFilesQueued(filesQueued.length > 0 ? [...filesSent, ...files] : [...files])
    };

    useEffect(() => {
        if(filesQueued && filesQueued.length > 0)
        {
            if(currentFile === null)
            {
                onSend(filesQueued[0]);
                setFilesQueued(filesQueued.splice(1))
            }
        }
    }, [filesQueued]);

    useEffect( () => {
        if(currentFile === null && filesQueued.length > 0)
        {
            onSend(filesQueued[0]);
            setFilesQueued(filesQueued.splice(1))
        }
    }, [currentFile]);

    useEffect(() => {
        if(filesReceivedProps && filesReceivedProps.length !== filesReceived.length)
            setFilesReceived(filesReceivedProps);
    }, [filesReceivedProps]);

    useEffect(() => {
        console.log('update');
        if(filesSentProps && filesSentProps.length !== filesSent.length)
            setFilesSent(filesSentProps);
    }, [filesSentProps]);

    const getActiveQueue = () => {
        let q = [];
        if(filesQueued.length > 0 && currentFile)
            q = [currentFile, ...filesQueued];
        else if(currentFile)
            q = [currentFile];
        else if(filesQueued.length > 0)
            q = [...filesQueued];
        return q;
    };

    return <React.Fragment>
        <Topbar />
        <ShareWindowContainer>
            <div className="row mx-0 w-100">
                <div className="col-12 p-2">
                    <PeerCard code={peerCode} onDisconnect={onDisconnect} />
                </div>
                <div className="col p-2">
                    <FileSelector
                        onSelect={handleOnSelect}
                        queue={getActiveQueue()}
                    />
                </div>
                <div className="col-md-6 p-2">
                    <FileSharedViewer
                        filesReceived={filesReceived}
                        filesSent={filesSent}
                    />
                </div>
            </div>
        </ShareWindowContainer>
        <Footer hideInfoList />
    </React.Fragment>

}