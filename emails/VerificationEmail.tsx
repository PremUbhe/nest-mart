import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    otp: string;
}

export const VerificatioEmail: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName, otp
}) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
        <h4>{otp}</h4>
    </div>
);
