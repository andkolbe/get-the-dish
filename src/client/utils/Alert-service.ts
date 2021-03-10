// The alert service acts as the bridge between any component in an React application and the alert component that actually displays 
// the bootstrap alert notifications. It contains methods for sending, clearing and subscribing to alert messages

// The service uses the RxJS Observable and Subject classes to enable communication with other React components
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

const alertSubject = new Subject(); // the Subject method is used to send messages to an observable which are then sent to all React components that are subscribers (observers) of that observable
const defaultId = 'default-alert';

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear
};

export const AlertType = { // defines the types of alerts allowed in the app
    Success: 'Success',
    Error: 'Error',
    Info: 'Info',
    Warning: 'Warning'
}

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
    return alertSubject.asObservable().pipe(filter((x: any) => x && x.id === id));
}

// convenience methods
function success(message: any, options: any) {
    alert({ ...options, type: AlertType.Success, message });
}

function error(message: string, options: any) {
    alert({ ...options, type: AlertType.Error, message });
}

function info(message: string, options: any) {
    alert({ ...options, type: AlertType.Info, message });
}

function warn(message: string, options: any) {
    alert({ ...options, type: AlertType.Warning, message });
}

// core alert method
function alert(alert: any) {
    alert.id = alert.id || defaultId;
    alertSubject.next(alert);
}

// clear alerts
function clear(id = defaultId) {
    alertSubject.next({ id });
}