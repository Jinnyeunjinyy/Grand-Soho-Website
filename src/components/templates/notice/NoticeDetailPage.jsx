import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { notices } from '../../../data';

const CATEGORY_LABEL = {
  press: '언론 보도',
  operation: '운영 안내',
  event: '이벤트',
  vacancy: '공실 안내',
};

const CATEGORY_COLOR = {
  press: 'secondary',
  operation: 'default',
  event: 'primary',
  vacancy: 'success',
};

/**
 * NoticeDetailPage 컴포넌트
 *
 * /notice/:id 상세 페이지. 본문 + 이전/다음 글 이동.
 *
 * Props:
 * @param {object} notice - 표시할 공지 데이터 [Required]
 * @param {function} onBack - 목록으로 돌아가기 핸들러 [Optional]
 * @param {function} onNavigate - 이전/다음 이동 핸들러 (notice) => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <NoticeDetailPage notice={notices[0]} onBack={() => navigate('/notice')} />
 */
function NoticeDetailPage({ notice, onBack, onNavigate, sx }) {
  if (!notice) {
    return (
      <Box sx={{ py: 16, textAlign: 'center' }}>
        <Typography variant="body2" color="text.disabled">
          공지사항을 찾을 수 없습니다.
        </Typography>
        {onBack && (
          <Button onClick={onBack} sx={{ mt: 2 }}>
            목록으로
          </Button>
        )}
      </Box>
    );
  }

  const currentIndex = notices.findIndex((n) => n.id === notice.id);
  const prevNotice = currentIndex > 0 ? notices[currentIndex - 1] : null;
  const nextNotice = currentIndex < notices.length - 1 ? notices[currentIndex + 1] : null;

  return (
    <Box sx={{ ...sx }}>
      {/* 페이지 헤더 */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          px: { xs: 3, sm: 5, md: 10, lg: 14 },
          backgroundColor: 'background.default',
        }}
      >
        {onBack && (
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            sx={{
              color: 'text.secondary',
              mb: 3,
              px: 0,
              '&:hover': { color: 'primary.main', backgroundColor: 'transparent' },
            }}
          >
            목록으로
          </Button>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Chip
            label={CATEGORY_LABEL[notice.category] ?? notice.category}
            size="small"
            color={CATEGORY_COLOR[notice.category] ?? 'default'}
            sx={{ fontSize: '0.6875rem', height: 20 }}
          />
          <Typography variant="caption" color="text.secondary">
            {notice.date}
          </Typography>
        </Box>

        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {notice.title}
        </Typography>
      </Box>

      {/* 본문 */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 3, sm: 5, md: 10, lg: 14 },
          maxWidth: 800,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-line',
            lineHeight: 2,
            color: 'text.primary',
          }}
        >
          {notice.content}
        </Typography>

        {notice.link && (
          <Box sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              href={notice.link.url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
            >
              {notice.link.label}
            </Button>
          </Box>
        )}

        <Divider sx={{ my: 6 }} />

        {/* 이전/다음 */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
        >
          {prevNotice ? (
            <Button
              startIcon={<ChevronLeftIcon />}
              onClick={() => onNavigate?.(prevNotice)}
              variant="outlined"
              sx={{ justifyContent: 'flex-start', flex: 1, maxWidth: { sm: '46%' } }}
            >
              <Box sx={{ textAlign: 'left', minWidth: 0 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  이전 글
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {prevNotice.title}
                </Typography>
              </Box>
            </Button>
          ) : (
            <Box sx={{ flex: 1 }} />
          )}

          {nextNotice ? (
            <Button
              endIcon={<ChevronRightIcon />}
              onClick={() => onNavigate?.(nextNotice)}
              variant="outlined"
              sx={{ justifyContent: 'flex-end', flex: 1, maxWidth: { sm: '46%' } }}
            >
              <Box sx={{ textAlign: 'right', minWidth: 0 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  다음 글
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {nextNotice.title}
                </Typography>
              </Box>
            </Button>
          ) : (
            <Box sx={{ flex: 1 }} />
          )}
        </Stack>
      </Box>
    </Box>
  );
}

export default NoticeDetailPage;
