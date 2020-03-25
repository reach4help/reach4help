import { toast } from 'react-toastify';

// configure toast component
toast.configure();

export enum NOTIFICATION_TYPE {
  DEFAULT,
  SUCCESS,
  ERROR,
  WARN,
  INFO,
}

export const showNotification = (notificationType: NOTIFICATION_TYPE, message: string ) => {
  switch (notificationType) {
    case NOTIFICATION_TYPE.SUCCESS:
      toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });
      break;
    case NOTIFICATION_TYPE.ERROR:
      toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
      break;
    case NOTIFICATION_TYPE.WARN:
      toast.warn(message, { position: toast.POSITION.BOTTOM_CENTER });
      break;
    case NOTIFICATION_TYPE.INFO:
      toast.info(message, { position: toast.POSITION.BOTTOM_CENTER });
      break;
    default:
      toast(message, { position: toast.POSITION.BOTTOM_CENTER });
      break;
  }
};
