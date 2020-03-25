import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// configure toast component
toast.configure({
  position: 'bottom-center',
  autoClose: 1000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  closeButton: false,
  draggable: true,
});

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
      toast.success(message);
      break;
    case NOTIFICATION_TYPE.ERROR:
      toast.error(message);
      break;
    case NOTIFICATION_TYPE.WARN:
      toast.warn(message);
      break;
    case NOTIFICATION_TYPE.INFO:
      toast.info(message);
      break;
    default:
      toast(message);
      break;
  }
};
