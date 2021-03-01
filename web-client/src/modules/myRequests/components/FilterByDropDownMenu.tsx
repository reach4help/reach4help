import { Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const { Option } = Select;

const LinkTo = ({ path, option }) => (
  <Link to={path} style={{ width: '100%', display: 'block', color: '#5F5F5F' }}>
    {option}
  </Link>
);

const FilterByDropDownMenu: React.FC<FilterByDropDownMenuProps> = ({
  type,
  allPath,
  openPath,
  onGoingPath,
  closedPath,
}): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <Select defaultValue="" style={{ width: '90%', margin: 'auto' }}>
      <Option value="" selected disabled>
        {t('modules.requests.containers.TabbedPostPage.filterBy')}
      </Option>
      <Option value="all">
        <LinkTo
          path={allPath}
          option={t(`modules.requests.containers.AllRequestsContainer.${type}`)}
        />
      </Option>
      <Option value="open">
        <LinkTo
          path={openPath}
          option={t('modules.requests.containers.OpenRequestContainer.open')}
        />
      </Option>
      <Option value="ongoing">
        <LinkTo
          path={onGoingPath}
          option={t(
            'modules.requests.containers.OngoingRequestContainer.ongoing',
          )}
        />
      </Option>
      <Option value="closed">
        <LinkTo
          path={closedPath}
          option={t(
            'modules.requests.containers.ClosedRequestsContainer.closed',
          )}
        />
      </Option>
    </Select>
  );
};

interface FilterByDropDownMenuProps {
  type: string;
  allPath: string;
  openPath: string;
  onGoingPath: string;
  closedPath: string;
}

export default FilterByDropDownMenu;
