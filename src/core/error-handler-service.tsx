import {NotificationManager} from 'react-notifications';

export const ErrorHandlerService = (error: string) => {
  NotificationManager.error(error);
};
