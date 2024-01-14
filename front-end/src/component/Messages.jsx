/* eslint-disable react/prop-types */
import { Alert } from 'react-bootstrap';

const Messages = ({variant, children}) => {
    return (
      <Alert variant={variant}>
        {children}
      </Alert>
    );
};

export default Messages;