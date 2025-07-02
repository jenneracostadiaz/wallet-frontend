import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

interface ErrorMessageProps {
    title: string;
    message: string;
}

export const ErrorMessage = ({ title, message }: ErrorMessageProps) => {
    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
};
