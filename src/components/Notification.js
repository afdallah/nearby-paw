import React from 'react';
import Notification from 'rc-notification';
import {
  AiFillExclamationCircle,
  AiFillCloseCircle,
  AiFillCheckCircle,
} from 'react-icons/ai';

let notification = null;
let notificationApi = {};

const options = {
  error: {
    icon: <AiFillCloseCircle />,
    className: 'error',
  },
  info: {
    icon: <AiFillExclamationCircle />,
    className: 'info',
  },
  success: {
    icon: <AiFillCheckCircle />,
    className: 'success',
  },
  warning: {
    icon: <AiFillExclamationCircle />,
    className: 'warning',
  },
};

Notification.newInstance(
  {
    className: 'notification',
  },
  (n) => (notification = n)
);

const notify = ({ message, title, type, ...rest }) => {
  const { icon, className } = options[type] || {};

  notification.notice({
    content: (
      <div className={className}>
        {title && (
          <div
            className="notification-header"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {icon}
            {title && <h4 style={{ margin: 0 }}>{title}</h4>}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!title && icon}
          {message}
        </div>
      </div>
    ),
    ...rest,
  });
};

Object.keys(options).forEach((type) => {
  notificationApi[type] = (args) => {
    notify({
      ...args,
      type,
    });
  };
});

export default notificationApi;
