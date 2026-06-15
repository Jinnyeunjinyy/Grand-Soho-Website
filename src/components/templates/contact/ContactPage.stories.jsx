import { MemoryRouter } from 'react-router-dom';
import ContactPage from './ContactPage';
import SiteShell from '../SiteShell';

export default {
  title: 'Page/Contact',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/contact']}>
        <SiteShell>
          <Story />
        </SiteShell>
      </MemoryRouter>
    ),
  ],
};

export const Default = {
  name: 'Contact',
  render: () => (
    <ContactPage
      onSubmit={async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        console.log('form data:', data);
      }}
    />
  ),
};

export const SubmitError = {
  name: 'Contact (Submit Error)',
  render: () => (
    <ContactPage
      onSubmit={async () => {
        await new Promise((r) => setTimeout(r, 800));
        throw new Error('EmailJS error');
      }}
    />
  ),
};
