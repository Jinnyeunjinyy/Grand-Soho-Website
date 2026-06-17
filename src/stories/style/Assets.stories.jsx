import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { DocumentTitle, PageContainer, SectionTitle } from '../../components/storybookDocumentation';

const ASSET_GROUPS = [
  {
    group: 'Hero',
    description: 'HeroSection 우측 패널 이미지. 현재 lounge-front.jpeg 사용 중.',
    assets: [
      { name: 'lounge-front.jpeg', path: '/images/lounge-front.jpeg', usage: 'HeroSection 우측 패널 (기본값)', note: '세로형 권장' },
      { name: 'exterior.jpeg',     path: '/images/exterior.jpeg',     usage: '외관 전경', note: '' },
      { name: 'office-sign.jpeg',  path: '/images/office-sign.jpeg',  usage: '오피스 표지판', note: '' },
    ],
  },
  {
    group: 'Gallery (벤토 그리드)',
    description: '홈 Gallery 벤토 그리드 이미지 4장. 순서대로 배치 위치가 결정됩니다.',
    assets: [
      { name: 'lounge-01.jpeg',       path: '/images/lounge-01.jpeg',       usage: 'images[0] — 중앙 상단',   note: '가로형 권장' },
      { name: 'office-101-01.jpeg',   path: '/images/office-101-01.jpeg',   usage: 'images[1] — 우측 tall',   note: '세로형 권장' },
      { name: 'meeting-ut-01.jpeg',   path: '/images/meeting-ut-01.jpeg',   usage: 'images[2] — 좌측 하단',   note: '' },
      { name: 'lounge-02.jpeg',       path: '/images/lounge-02.jpeg',       usage: 'images[3] — 중앙 하단',   note: '가로형 권장' },
    ],
  },
  {
    group: 'Spaces — 개인실',
    description: '/spaces 페이지 개인실 카드 썸네일.',
    assets: [
      { name: 'office-105-01.jpeg', path: '/images/office-105-01.jpeg', usage: '2~3인실 카드', note: '' },
      { name: 'office-105-02.jpeg', path: '/images/office-105-02.jpeg', usage: '105호 추가 뷰', note: '' },
      { name: 'office-105-03.jpeg', path: '/images/office-105-03.jpeg', usage: '105호 추가 뷰', note: '' },
      { name: 'office-101-01.jpeg', path: '/images/office-101-01.jpeg', usage: '4인실 카드', note: '' },
      { name: 'office-101-02.jpeg', path: '/images/office-101-02.jpeg', usage: '101호 추가 뷰', note: '' },
    ],
  },
  {
    group: 'Spaces — 미팅룸',
    description: '/spaces 페이지 회의실 카드 썸네일.',
    assets: [
      { name: 'meeting-ut-00.jpeg',   path: '/images/meeting-ut-00.jpeg',   usage: 'UT Room 전경', note: '' },
      { name: 'meeting-ut-01.jpeg',   path: '/images/meeting-ut-01.jpeg',   usage: 'UT Room (카드 기본)', note: '' },
      { name: 'meeting-ut-02.jpeg',   path: '/images/meeting-ut-02.jpeg',   usage: 'UT Room 추가 뷰', note: '' },
      { name: 'meeting-ut-03.jpeg',   path: '/images/meeting-ut-03.jpeg',   usage: 'UT Room 추가 뷰', note: '' },
      { name: 'meeting-ut-04.jpeg',   path: '/images/meeting-ut-04.jpeg',   usage: 'UT Room 추가 뷰', note: '' },
      { name: 'meeting-01-00.jpeg',   path: '/images/meeting-01-00.jpeg',   usage: '미팅룸 1', note: '' },
      { name: 'meeting-01-01.jpeg',   path: '/images/meeting-01-01.jpeg',   usage: '미팅룸 1', note: '' },
      { name: 'meeting-01-02.jpeg',   path: '/images/meeting-01-02.jpeg',   usage: '미팅룸 1', note: '' },
      { name: 'meeting-02.jpeg',      path: '/images/meeting-02.jpeg',      usage: '미팅룸 2', note: '' },
      { name: 'meeting-overview.jpeg',path: '/images/meeting-overview.jpeg',usage: '미팅룸 전경', note: '' },
    ],
  },
  {
    group: 'Spaces — 라운지',
    description: '/spaces 페이지 라운지 카드 썸네일 및 갤러리 추가 이미지.',
    assets: [
      { name: 'lounge-01.jpeg', path: '/images/lounge-01.jpeg', usage: '라운지 (갤러리 + 카드)', note: '' },
      { name: 'lounge-02.jpeg', path: '/images/lounge-02.jpeg', usage: '라운지 (갤러리)', note: '' },
      { name: 'lounge-03.jpeg', path: '/images/lounge-03.jpeg', usage: '라운지 추가', note: '' },
      { name: 'lounge-04.jpeg', path: '/images/lounge-04.jpeg', usage: '라운지 추가', note: '' },
      { name: 'lounge-05.jpeg', path: '/images/lounge-05.jpeg', usage: '라운지 추가', note: '' },
      { name: 'lounge-06.jpeg', path: '/images/lounge-06.jpeg', usage: '라운지 추가', note: '' },
      { name: 'lounge-07.jpeg', path: '/images/lounge-07.jpeg', usage: '라운지 추가', note: '' },
      { name: 'lounge-08.jpeg', path: '/images/lounge-08.jpeg', usage: '라운지 추가', note: '' },
    ],
  },
  {
    group: '기타',
    description: '복도, 외관 등 공간 분위기 이미지.',
    assets: [
      { name: 'hallway-01.jpeg', path: '/images/hallway-01.jpeg', usage: '복도', note: '' },
      { name: 'hallway-02.jpeg', path: '/images/hallway-02.jpeg', usage: '복도', note: '' },
    ],
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <Tooltip title={copied ? '복사됨!' : '경로 복사'}>
      <IconButton size="small" onClick={handleCopy} sx={{ ml: 0.5, flexShrink: 0 }}>
        {copied
          ? <CheckIcon sx={{ fontSize: 14, color: 'success.main' }} />
          : <ContentCopyIcon sx={{ fontSize: 14 }} />}
      </IconButton>
    </Tooltip>
  );
}

function AssetCard({ asset }) {
  const [status, setStatus] = useState('loading');

  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'background.paper' }}>
      {/* 썸네일 */}
      <Box sx={{ position: 'relative', height: 160, backgroundColor: 'background.subtle', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          component="img"
          src={asset.path}
          alt={asset.name}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('missing')}
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: status === 'loaded' ? 'block' : 'none' }}
        />
        {status !== 'loaded' && (
          <Box sx={{ textAlign: 'center' }}>
            <BrokenImageIcon sx={{ fontSize: 28, color: 'text.disabled', mb: 0.5 }} />
            <Typography variant="caption" color="text.disabled" display="block">
              {status === 'loading' ? '확인 중...' : '파일 없음'}
            </Typography>
          </Box>
        )}
        <Chip
          label={status === 'loaded' ? '등록됨' : '미등록'}
          size="small"
          color={status === 'loaded' ? 'success' : 'default'}
          sx={{ position: 'absolute', top: 8, right: 8, fontSize: 10, height: 20 }}
        />
      </Box>

      {/* 정보 */}
      <Box sx={{ p: 1.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 1, wordBreak: 'break-all' }}>
          {asset.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography
            variant="caption"
            sx={{ fontFamily: 'monospace', backgroundColor: 'background.subtle', px: 0.75, py: 0.25, borderRadius: '4px', color: 'text.secondary', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11 }}
          >
            {asset.path}
          </Typography>
          <CopyButton text={asset.path} />
        </Box>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="caption" color="text.secondary">{asset.usage}</Typography>
        {asset.note && (
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.25 }}>
            {asset.note}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default {
  title: 'Style/Assets',
  parameters: { layout: 'padded' },
};

export const Doc = {
  render: () => (
    <>
      <DocumentTitle
        title="Assets"
        status="Available"
        note="이미지 에셋 등록 현황 및 경로 관리 — 28장"
        brandName="Grand Ventures"
        systemName="Grand Soho"
        version="1.0"
      />
      <PageContainer>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>이미지 에셋 관리</Typography>
        <Alert severity="info" sx={{ mb: 2, borderRadius: '12px' }}>
          이미지 파일은 <strong>public/images/</strong> 폴더에 위치합니다. 파일명을 변경하면 아래 슬롯과 데이터 파일 경로도 함께 수정해야 합니다.
        </Alert>
        <Alert severity="success" sx={{ mb: 5, borderRadius: '12px' }}>
          Hero, Gallery, Spaces 이미지가 연결됐습니다. 각 카드의 경로를 복사해 컴포넌트에서 바로 사용하세요.
        </Alert>

        <SectionTitle title="현재 연결된 이미지" />
        <Box sx={{ fontFamily: 'monospace', fontSize: 13, backgroundColor: 'secondary.main', color: 'secondary.contrastText', p: 3, borderRadius: '12px', lineHeight: 2.2, mb: 6 }}>
          <Typography component="div" sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: 'accent.main', mb: 0.5 }}>{'// HomePage.jsx'}</Typography>
          {'Hero    →  /images/lounge-front.jpeg'}<br />
          {'Gallery →  lounge-01, office-101-01, meeting-ut-01, lounge-02'}<br /><br />
          <Typography component="div" sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: 'accent.main', mb: 0.5 }}>{'// data/spaces.js'}</Typography>
          {'2~3인실  →  /images/office-105-01.jpeg'}<br />
          {'4인실   →  /images/office-101-01.jpeg'}<br />
          {'미팅룸  →  /images/meeting-ut-01.jpeg'}<br />
          {'라운지  →  /images/lounge-01.jpeg'}
        </Box>

        {ASSET_GROUPS.map((group) => (
          <Box key={group.group} sx={{ mb: 7 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{group.group}</Typography>
              <Chip label={`${group.assets.length}장`} size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              {group.description}
            </Typography>
            <Grid container spacing={2}>
              {group.assets.map((asset) => (
                <Grid key={asset.name} size={{ xs: 12, sm: 6, md: 4 }}>
                  <AssetCard asset={asset} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

      </PageContainer>
    </>
  ),
};
