import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { defaultTheme as theme } from './styles/themes';
import SiteShell from './components/templates/SiteShell';
import HomePage from './components/templates/home/HomePage';
import SpacesPage from './components/templates/spaces/SpacesPage';
import ContactPage from './components/templates/contact/ContactPage';
import NoticePage from './components/templates/notice/NoticePage';
import NoticeDetailPage from './components/templates/notice/NoticeDetailPage';
import { notices } from './data/notices';
import { navCta } from './data/navigation';

function NoticeListRoute() {
  const navigate = useNavigate();
  return <NoticePage onNoticeClick={(n) => navigate(`/notice/${n.id}`)} />;
}

function NoticeDetailRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const notice = notices.find((n) => n.id === Number(id));
  return (
    <NoticeDetailPage
      notice={notice}
      onBack={() => navigate('/notice')}
      onNavigate={(n) => navigate(`/notice/${n.id}`)}
    />
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <SiteShell>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/spaces" element={<SpacesPage reservationUrl={navCta.path} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/notice" element={<NoticeListRoute />} />
            <Route path="/notice/:id" element={<NoticeDetailRoute />} />
          </Routes>
        </SiteShell>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
