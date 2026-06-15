import { MemoryRouter } from 'react-router-dom';
import SpacesPage from './SpacesPage';
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
  render: () => <SpacesPage />,
};
