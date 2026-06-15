import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import SiteShell from '../SiteShell';

export default {
  title: 'Page/Home',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <SiteShell>
          <Story />
        </SiteShell>
      </MemoryRouter>
    ),
  ],
};

export const Default = {
  render: () => <HomePage />,
};
