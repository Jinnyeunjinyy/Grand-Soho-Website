import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

/**
 * GallerySection 컴포넌트
 *
 * 홈 페이지 공간 사진 벤토 그리드 갤러리 섹션.
 * 4장 이상 이미지 제공 시 벤토 그리드, 미제공 시 placeholder 표시.
 * 이미지 클릭 시 Lightbox(Dialog)로 확대 표시.
 *
 * 벤토 레이아웃 (데스크탑 3열 2행):
 *   [title card] [img0]   [img1 tall ↕]
 *   [img2]       [img3]   [img1 tall ↕]
 *
 * Props:
 * @param {Array} images - 이미지 배열 [{ src, alt }] [Optional, 최소 4장 권장]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <GallerySection images={[{ src: '/img/space1.jpg', alt: '라운지' }, ...]} />
 */
function GallerySection({ images = [], sx }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const isOpen = lightboxIndex !== null;
  const currentImage = isOpen ? images[lightboxIndex] : null;

  const handleClose = () => setLightboxIndex(null);
  const handlePrev = () => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () => setLightboxIndex((prev) => (prev + 1) % images.length);
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') handleClose();
  };

  const renderImage = (img, idx) => (
    <Box
      key={idx}
      onClick={() => setLightboxIndex(idx)}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: '20px',
        backgroundColor: 'secondary.light',
        '&:hover img': { transform: 'scale(1.05)' },
        '& img': { transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' },
      }}
    >
      <Box
        component="img"
        src={img.src}
        alt={img.alt}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </Box>
  );

  const hasBento = images.length >= 4;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        px: { xs: 4, sm: 6, md: 10, lg: 14 },
        backgroundColor: 'background.default',
        ...sx,
      }}
    >
      {hasBento ? (
        /* ── 벤토 그리드 ── */
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr 1fr',
              md: '1fr 1.3fr 1fr',
            },
            gridTemplateRows: {
              xs: 'auto',
              md: '280px 280px',
            },
            gap: '4px',
          }}
        >
          {/* 타이틀 카드 — col1 row1 */}
          <Box
            sx={{
              gridColumn: { xs: '1 / 3', md: '1' },
              gridRow: { xs: 'auto', md: '1' },
              borderRadius: '20px',
              backgroundColor: 'secondary.dark',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: { xs: 3, md: 4 },
              minHeight: { xs: 160, md: 'unset' },
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: 'accent.main', letterSpacing: '0.14em', display: 'block', mb: 1.5 }}
            >
              갤러리
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'secondary.contrastText', lineHeight: 1.2 }}>
              공간을
              <br />
              직접 보세요
            </Typography>
          </Box>

          {/* img[0] — col2 row1 (desktop) */}
          <Box
            sx={{
              gridColumn: { xs: '1', md: '2' },
              gridRow: { xs: 'auto', md: '1' },
              minHeight: { xs: 200, md: 'unset' },
            }}
          >
            {renderImage(images[0], 0)}
          </Box>

          {/* img[1] — col3 row1-2 (tall, desktop) */}
          <Box
            sx={{
              gridColumn: { xs: '2', md: '3' },
              gridRow: { xs: 'span 2', md: '1 / 3' },
              minHeight: { xs: 280, md: 'unset' },
            }}
          >
            {renderImage(images[1], 1)}
          </Box>

          {/* img[2] — col1 row2 (desktop) */}
          <Box
            sx={{
              gridColumn: { xs: '1', md: '1' },
              gridRow: { xs: 'auto', md: '2' },
              minHeight: { xs: 200, md: 'unset' },
            }}
          >
            {renderImage(images[2], 2)}
          </Box>

          {/* img[3] — col2 row2 (desktop) */}
          <Box
            sx={{
              gridColumn: { xs: '2', md: '2' },
              gridRow: { xs: 'auto', md: '2' },
              minHeight: { xs: 200, md: 'unset' },
            }}
          >
            {renderImage(images[3], 3)}
          </Box>
        </Box>
      ) : (
        /* ── Placeholder (이미지 없거나 4장 미만) ── */
        <>
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{ color: 'accent.main', letterSpacing: '0.14em', display: 'block', mb: 1 }}
            >
              갤러리
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              공간을 직접 보세요
            </Typography>
          </Box>
          <Box
            sx={{
              height: 320,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" color="text.disabled">
              공간 사진이 준비 중입니다.
            </Typography>
          </Box>
        </>
      )}

      {/* Lightbox */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth={false}
        onKeyDown={handleKeyDown}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible',
            borderRadius: 0,
          },
        }}
        sx={{
          '& .MuiBackdrop-root': { backgroundColor: 'rgba(0,0,0,0.92)' },
          '& .MuiDialog-container': { alignItems: 'center' },
        }}
      >
        {currentImage && (
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'fixed',
                top: 16,
                right: 16,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.4)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
              }}
            >
              <CloseIcon />
            </IconButton>

            {images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: 'absolute',
                    left: -56,
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: 'absolute',
                    right: -56,
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </>
            )}

            <Box
              component="img"
              src={currentImage.src}
              alt={currentImage.alt}
              sx={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                display: 'block',
                borderRadius: '8px',
              }}
            />
          </Box>
        )}
      </Dialog>
    </Box>
  );
}

export default GallerySection;
