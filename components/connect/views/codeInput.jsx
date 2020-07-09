import React,  { useState } from 'react';
import styled from '@emotion/styled';

const FormWrapper = styled.form`
  border-radius: 1rem;
  padding: 1rem;
  input {
    max-width: 100%;
    width: 250px;
    font-size: 1.5rem;
  }
`;

const FormBottomBar = styled.div`
  padding: 0.5rem;
  button {
    font-size: 1.3rem;
    width: 100%;
    padding: 1rem;
    margin: 0;
    font-weight: bold;
    border-radius: 1rem;
    &:disabled {
      background: #333;
      color: #eee;
      border: none;
      opacity: 0.8;
    }
  }
`;

export default ({ onConnect }) => {

    const [peerCode, setPeerCode] = useState('');

    return <FormWrapper onSubmit={() => onConnect(peerCode.toLowerCase())}>
        <div className="p-3">
            <label className="d-none text-left font-weight-bold pb-1">Enter Peer Code: </label>
            <input
                aria-label="Enter Peer Code"
                className="form-control"
                type="text"
                title="Enter Peer Code"
                required
                aria-required="true"
                onChange={(e) => setPeerCode(e.target.value)}
                placeholder="Enter peer code..."
            />
        </div>
        <FormBottomBar>
            <button
                aria-label="Connect to Peer"
                disabled={peerCode.length < 4}
                className="btn btn-warning shadow"
                type="submit"
            >
                Connect to Peer
            </button>
        </FormBottomBar>
    </FormWrapper>

}