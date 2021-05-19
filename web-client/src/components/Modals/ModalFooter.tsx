import { MailOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { COLORS } from 'src/theme/colors';

const ModalFooter = () => {
  const { t } = useTranslation();
  return (
    <div>
      <a href="mailto:support@reach4help.org">
        <em
          style={{
            color: COLORS.lightBlue,
          }}
        >
          {t('information_modal.footer')}
        </em>
        &nbsp;&nbsp;&nbsp;
        <MailOutlined
          style={{
            color: COLORS.lightBlue,
          }}
        />
      </a>
    </div>
  );
};

export default ModalFooter;
