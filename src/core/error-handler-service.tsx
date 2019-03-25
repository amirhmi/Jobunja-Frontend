import {NotificationManager} from 'react-notifications';

export const ErrorHandlerService = (error: string) => {
  NotificationManager.error(error);
};

export const WarningHandlerService = (warning: string) => {
  NotificationManager.warning(warning);
};

export const SuccessHandlerService = (success: string) => {
  NotificationManager.success(success);
};
