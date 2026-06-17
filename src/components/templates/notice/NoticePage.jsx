import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import PushPinIcon from '@mui/icons-material/PushPin';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CategoryTab } from '../../in-page-navigation/CategoryTab';
import { notices, noticeCategories } from '../../../data/notices';

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
 * NoticePage 컴포넌트
 *
 * /notice 페이지. 카테고리 탭 + 공지 목록.
 *
 * Props:
 * @param {function} onNoticeClick - 공지 클릭 핸들러 (notice) => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <NoticePage onNoticeClick={(n) => navigate(`/notice/${n.id}`)} />
 */
function NoticePage({ onNoticeClick, sx }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? notices
    : notices.filter((n) => n.category === activeCategory);

  const pinned = filtered.filter((n) => n.isPinned);
  const regular = filtered.filter((n) => !n.isPinned);
  const sorted = [...pinned, ...regular];

  return (
    <Box sx={{ ...sx }}>
      {/* 페이지 헤더 */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 3, sm: 5, md: 10, lg: 14 },
          backgroundColor: 'background.default',
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'accent.main', letterSpacing: '0.14em', display: 'block', mb: 1 }}
        >
          Notice
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          공지사항
        </Typography>
      </Box>

      {/* 목록 */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, sm: 5, md: 10, lg: 14 } }}>
        <CategoryTab
          categories={noticeCategories}
          selected={activeCategory}
          onChange={setActiveCategory}
          sx={{ mb: 2 }}
        />

        {sorted.length === 0 ? (
          <Box sx={{ py: 12, textAlign: 'center' }}>
            <Typography variant="body2" color="text.disabled">
              등록된 공지사항이 없습니다.
            </Typography>
          </Box>
        ) : (
          <Stack divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />}>
            {sorted.map((notice) => (
              <Box
                key={notice.id}
                component="button"
                onClick={() => onNoticeClick?.(notice)}
                sx={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  backgroundColor: notice.isPinned ? 'background.subtle' : 'transparent',
                  textAlign: 'left',
                  cursor: onNoticeClick ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: { sm: 'center' },
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1.5,
                  py: 3,
                  px: 0,
                  transition: 'background-color 150ms',
                  '&:hover': onNoticeClick ? { backgroundColor: 'action.hover' } : {},
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1, minWidth: 0 }}>
                  {notice.isPinned && (
                    <PushPinIcon
                      sx={{ fontSize: 16, color: 'primary.main', mt: '3px', flexShrink: 0 }}
                    />
                  )}
                  <Box sx={{ minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                      <Chip
                        label={CATEGORY_LABEL[notice.category] ?? notice.category}
                        size="small"
                        color={CATEGORY_COLOR[notice.category] ?? 'default'}
                        sx={{ fontSize: '0.6875rem', height: 20 }}
                      />
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: notice.isPinned ? 700 : 500,
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {notice.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {notice.summary}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexShrink: 0,
                    pl: { xs: notice.isPinned ? 4 : 0, sm: 2 },
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {notice.date}
                  </Typography>
                  {onNoticeClick && (
                    <ChevronRightIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default NoticePage;
