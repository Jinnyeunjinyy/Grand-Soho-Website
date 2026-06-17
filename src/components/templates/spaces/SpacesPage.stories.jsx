import { MemoryRouter } from 'react-router-dom';
import SpacesCardPage from './SpacesCardPage';
import SiteShell from '../SiteShell';

export default {
  title: 'Page/Spaces',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/spaces']}>
        <SiteShell>
          <Story />
        </SiteShell>
      </MemoryRouter>
    ),
  ],
};

export const Default = {
  render: () => <SpacesCardPage />,
};
