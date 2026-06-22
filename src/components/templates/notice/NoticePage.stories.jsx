import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import NoticePage from './NoticePage';
import NoticeDetailPage from './NoticeDetailPage';
import SiteShell from '../SiteShell';
import { notices } from '../../../data';

export default {
  title: 'Page/Notice',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/notice']}>
        <SiteShell>
          <Story />
        </SiteShell>
      </MemoryRouter>
    ),
  ],
};

export const List = {
  name: 'Notice List',
  render: () => <NoticePage />,
};

export const WithNavigation = {
  name: 'Notice List + Detail (interactive)',
  render: () => {
    const [selected, setSelected] = useState(null);

    if (selected) {
      return (
        <NoticeDetailPage
          notice={selected}
          onBack={() => setSelected(null)}
          onNavigate={(n) => setSelected(n)}
        />
      );
    }

    return <NoticePage onNoticeClick={(n) => setSelected(n)} />;
  },
};

export const Detail = {
  name: 'Notice Detail',
  render: () => (
    <NoticeDetailPage
      notice={notices[0]}
      onBack={() => {}}
      onNavigate={() => {}}
    />
  ),
};
